import { LitElement, html, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  Chore,
  ChoreSchedulerCardConfig,
  LovelaceCardConfig,
} from "./types";
import { cardStyles } from "./styles";
import { localize, localizeWeekday } from "./localize";
import "./chore-editor";
import "./chore-scheduler-card-editor";

const DOMAIN = "chore_scheduler";

// Extend HomeAssistant type to include connection
interface HomeAssistantExtended extends HomeAssistant {
  connection: {
    sendMessagePromise<T>(message: { type: string }): Promise<T>;
  };
}

@customElement("chore-scheduler-card")
export class ChoreSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistantExtended;

  @state() private _config?: ChoreSchedulerCardConfig;
  @state() private _chores: Chore[] = [];
  @state() private _loading = true;
  @state() private _editingChore: Chore | null = null;
  @state() private _showEditor = false;

  static styles = cardStyles;

  public setConfig(config: LovelaceCardConfig): void {
    this._config = {
      ...config,
      title: config.title as string | undefined ?? "Chore Scheduler",
      show_disabled: config.show_disabled as boolean | undefined ?? true,
      show_next_due: config.show_next_due as boolean | undefined ?? true,
    };
  }

  public getCardSize(): number {
    return Math.max(3, this._chores.length + 1);
  }

  protected firstUpdated(_changedProps: PropertyValues): void {
    super.firstUpdated(_changedProps);
    this._loadChores();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has("hass") && this.hass) {
      // Refresh chores periodically when hass updates
      const oldHass = changedProps.get("hass") as HomeAssistantExtended | undefined;
      if (!oldHass) {
        this._loadChores();
      }
    }
  }

  private async _loadChores(): Promise<void> {
    if (!this.hass) return;

    this._loading = true;
    try {
      // Try WebSocket API first
      const response = await this.hass.connection.sendMessagePromise<{
        chores: Chore[];
      }>({
        type: "chore_scheduler/list",
      });
      this._chores = response?.chores ?? [];
    } catch {
      // Fallback: Get from sensor attributes
      try {
        const sensor = this.hass.states["sensor.chore_scheduler_next_chore"];
        if (sensor?.attributes?.chores) {
          this._chores = sensor.attributes.chores as Chore[];
        } else {
          this._chores = [];
        }
      } catch {
        this._chores = [];
      }
    } finally {
      this._loading = false;
    }
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const filteredChores = this._config.show_disabled
      ? this._chores
      : this._chores.filter((c) => c.enabled);

    return html`
      <ha-card>
        <div class="card-header">
          <h1>${this._config.title}</h1>
          <ha-icon-button
            class="add-button"
            @click=${this._addChore}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>

        ${this._loading
          ? html`
              <div class="loading">
                <ha-circular-progress indeterminate></ha-circular-progress>
              </div>
            `
          : filteredChores.length === 0
            ? html`
                <div class="empty-state">
                  <ha-icon icon="mdi:broom"></ha-icon>
                  <p>${localize("card.empty_title", this.hass)}</p>
                  <p>${localize("card.empty_subtitle", this.hass)}</p>
                </div>
              `
            : html`
                <div class="chore-list">
                  ${filteredChores.map((chore) => this._renderChoreItem(chore))}
                </div>
              `}
      </ha-card>

      ${this._showEditor
        ? html`
            <chore-editor
              .hass=${this.hass}
              .chore=${this._editingChore}
              @chore-save=${this._handleChoreSave}
              @chore-delete=${this._handleChoreDelete}
              @editor-close=${this._closeEditor}
            ></chore-editor>
          `
        : nothing}
    `;
  }

  private _renderChoreItem(chore: Chore) {
    const scheduleText = this._formatSchedule(chore.schedule);
    const assigneeText = this._formatAssignment(chore.assignment);

    return html`
      <div
        class="chore-item ${chore.enabled ? "" : "disabled"}"
        @click=${() => this._editChore(chore)}
      >
        <ha-icon class="chore-icon" icon="mdi:checkbox-marked-circle-outline"></ha-icon>
        <div class="chore-info">
          <div class="chore-name">${chore.name}</div>
          <div class="chore-schedule">${scheduleText}</div>
          ${assigneeText
            ? html`<div class="chore-assignee">${assigneeText}</div>`
            : nothing}
        </div>
        <div class="chore-actions">
          <ha-icon-button
            @click=${(e: Event) => this._triggerChore(e, chore)}
          >
            <ha-icon icon="mdi:play"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
    `;
  }

  private _formatSchedule(schedule: Chore["schedule"]): string {
    const time = schedule.time || "10:00";
    switch (schedule.type) {
      case "once": {
        const date = schedule.date;
        if (date) {
          const dateObj = new Date(date + "T00:00:00");
          const formatted = dateObj.toLocaleDateString(this.hass?.language || "en", {
            month: "short",
            day: "numeric",
          });
          return `${formatted} ${time}`;
        }
        return localize("display.at_time", this.hass, { time });
      }
      case "daily":
        return localize("display.daily_at", this.hass, { time });
      case "weekly": {
        const days = schedule.days || ["sunday"];
        const dayNames = days
          .map((d) => localizeWeekday(d, this.hass))
          .join(", ");
        return `${dayNames} ${time}`;
      }
      case "monthly":
        return localize("display.monthly_at", this.hass, {
          day: schedule.day_of_month || 1,
          time,
        });
      default:
        return localize("display.at_time", this.hass, { time });
    }
  }

  private _formatAssignment(assignment: Chore["assignment"]): string {
    if (assignment.mode === "unassigned" || !assignment.assignees?.length) {
      return "";
    }

    const names = assignment.assignees.map((a) =>
      a.split(".").pop()?.replace(/_/g, " ") || a
    );

    if (assignment.mode === "rotating") {
      const currentIndex = assignment.current_index || 0;
      const currentName = names[currentIndex] || names[0];
      return localize("assignment.rotating_current", this.hass, {
        name: currentName,
      });
    }

    return localize("assignment.assigned_to", this.hass, {
      names: names.join(", "),
    });
  }

  private _addChore(): void {
    this._editingChore = null;
    this._showEditor = true;
  }

  private _editChore(chore: Chore): void {
    this._editingChore = chore;
    this._showEditor = true;
  }

  private _closeEditor(): void {
    this._showEditor = false;
    this._editingChore = null;
  }

  private async _triggerChore(e: Event, chore: Chore): Promise<void> {
    e.stopPropagation();

    try {
      await this.hass.callService(DOMAIN, "trigger_chore", {
        chore_id: chore.id,
      });
    } catch (error) {
      console.error("Error triggering chore:", error);
    }
  }

  private async _handleChoreSave(e: CustomEvent): Promise<void> {
    const { chore, isNew } = e.detail;

    try {
      if (isNew) {
        await this.hass.callService(DOMAIN, "add_chore", chore);
      } else {
        await this.hass.callService(DOMAIN, "update_chore", {
          chore_id: chore.id,
          ...chore,
        });
      }

      this._closeEditor();
      // Reload chores after save
      await this._loadChores();
    } catch (error) {
      console.error("Error saving chore:", error);
      // Show error to user
      alert(`Failed to save chore: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async _handleChoreDelete(e: CustomEvent): Promise<void> {
    const { choreId } = e.detail;

    try {
      await this.hass.callService(DOMAIN, "delete_chore", {
        chore_id: choreId,
      });

      this._closeEditor();
      setTimeout(() => this._loadChores(), 500);
    } catch (error) {
      console.error("Error deleting chore:", error);
    }
  }

  // Static configuration for the card editor
  static getConfigElement() {
    return document.createElement("chore-scheduler-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Chore Scheduler",
      show_disabled: true,
      show_next_due: true,
    };
  }
}

// Register the card with Home Assistant
declare global {
  interface HTMLElementTagNameMap {
    "chore-scheduler-card": ChoreSchedulerCard;
  }
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

// Card registration for HACS/HA picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: "chore-scheduler-card",
  name: "Chore Scheduler Card",
  description: "A card for managing household chore schedules",
  preview: true,
});
