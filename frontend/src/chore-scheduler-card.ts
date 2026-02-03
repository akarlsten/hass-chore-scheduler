import { LitElement, html, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  Chore,
  TodoItem,
  ChoreSchedulerCardConfig,
  CardMode,
  LovelaceCardConfig,
} from "./types";
import { cardStyles } from "./styles";
import { localize, localizeWeekday } from "./localize";
import { getChoreIcon } from "./chore-icons";
import { playCheckmarkPop, triggerHaptic } from "./animations";
import "./chore-editor";
import "./chore-scheduler-card-editor";

const DOMAIN = "chore_scheduler";

// Extend HomeAssistant type to include connection
interface HomeAssistantExtended extends HomeAssistant {
  connection: {
    sendMessagePromise<T>(message: { type: string; [key: string]: unknown }): Promise<T>;
  };
}

@customElement("chore-scheduler-card")
export class ChoreSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistantExtended;

  @state() private _config?: ChoreSchedulerCardConfig;
  @state() private _chores: Chore[] = [];
  @state() private _todoItems: TodoItem[] = [];
  @state() private _loading = true;
  @state() private _editingChore: Chore | null = null;
  @state() private _showEditor = false;
  @state() private _mode: CardMode = "display";
  @state() private _showAllDone = false;

  static styles = cardStyles;

  public setConfig(config: LovelaceCardConfig): void {
    this._config = {
      ...config,
      title: config.title as string | undefined ?? "Chore Scheduler",
      show_disabled: config.show_disabled as boolean | undefined ?? true,
      show_next_due: config.show_next_due as boolean | undefined ?? true,
      default_mode: (config.default_mode as CardMode | undefined) ?? "display",
      show_completed: config.show_completed as boolean | undefined ?? false,
      enable_animations: config.enable_animations as boolean | undefined ?? true,
    };
    this._mode = this._config.default_mode || "display";
  }

  public getCardSize(): number {
    return Math.max(3, (this._mode === "display" ? this._todoItems.length : this._chores.length) + 1);
  }

  protected firstUpdated(_changedProps: PropertyValues): void {
    super.firstUpdated(_changedProps);
    this._loadData();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has("hass") && this.hass) {
      const oldHass = changedProps.get("hass") as HomeAssistantExtended | undefined;
      if (!oldHass) {
        this._loadData();
      }
    }
  }

  private async _loadData(): Promise<void> {
    if (!this.hass) return;
    this._loading = true;
    try {
      const [choresResp, todosResp] = await Promise.all([
        this.hass.connection.sendMessagePromise<{ chores: Chore[] }>({
          type: "chore_scheduler/list",
        }),
        this.hass.connection.sendMessagePromise<{ items: TodoItem[] }>({
          type: "chore_scheduler/todos",
        }),
      ]);
      this._chores = choresResp?.chores ?? [];
      this._todoItems = todosResp?.items ?? [];
    } catch (err) {
      console.warn("[ChoreScheduler] Failed to load data:", err);
      this._chores = [];
      this._todoItems = [];
    } finally {
      this._loading = false;
    }
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    return html`
      <ha-card>
        <div class="card-header">
          <h1>${this._config.title}</h1>
          <div class="header-actions">
            <ha-icon-button
              class="mode-toggle"
              @click=${this._toggleMode}
              title=${this._mode === "display"
                ? localize("mode.manage", this.hass)
                : localize("mode.display", this.hass)}
            >
              <ha-icon icon=${this._mode === "display" ? "mdi:pencil" : "mdi:eye"}></ha-icon>
            </ha-icon-button>
            ${this._mode === "manage"
              ? html`
                  <ha-icon-button class="add-button" @click=${this._addChore}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </ha-icon-button>
                `
              : nothing}
          </div>
        </div>

        ${this._loading
          ? html`
              <div class="loading">
                <ha-circular-progress indeterminate></ha-circular-progress>
              </div>
            `
          : this._mode === "display"
            ? this._renderDisplayMode()
            : this._renderManageMode()}
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

  // ── Display Mode ──────────────────────────────────────────────────

  private _renderDisplayMode() {
    const pending = this._todoItems.filter((i) => i.status === "needs_action");
    const completed = this._todoItems.filter((i) => i.status === "completed");

    if (pending.length === 0 && completed.length === 0) {
      return html`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <p>${localize("display.empty_todos", this.hass)}</p>
        </div>
      `;
    }

    const today = new Date().toISOString().split("T")[0];
    const overdue = pending.filter((i) => i.due && i.due < today);
    const todayItems = pending.filter((i) => !i.due || i.due === today);
    const upcoming = pending.filter((i) => i.due && i.due > today);

    // Show all-done celebration
    if (this._showAllDone) {
      return html`
        <div class="all-done">
          <ha-icon icon="mdi:party-popper"></ha-icon>
          <p>${localize("display.all_done", this.hass)}</p>
        </div>
      `;
    }

    if (pending.length === 0 && completed.length > 0) {
      return html`
        <div class="all-done">
          <ha-icon icon="mdi:check-circle"></ha-icon>
          <p>${localize("display.all_done", this.hass)}</p>
        </div>
        ${this._config?.show_completed
          ? this._renderSection(localize("display.done", this.hass), completed, "completed")
          : nothing}
      `;
    }

    return html`
      ${overdue.length
        ? this._renderSection(localize("display.overdue", this.hass), overdue, "overdue")
        : nothing}
      ${todayItems.length
        ? this._renderSection(localize("display.today", this.hass), todayItems, "today")
        : nothing}
      ${upcoming.length
        ? this._renderSection(localize("display.upcoming", this.hass), upcoming, "upcoming")
        : nothing}
      ${this._config?.show_completed && completed.length
        ? this._renderSection(localize("display.done", this.hass), completed, "completed")
        : nothing}
    `;
  }

  private _renderSection(title: string, items: TodoItem[], sectionClass: string) {
    return html`
      <div class="todo-section ${sectionClass}">
        <div class="section-header">${title}</div>
        <div class="todo-list">
          ${items.map((item) => this._renderTodoItem(item, sectionClass))}
        </div>
      </div>
    `;
  }

  private _renderTodoItem(item: TodoItem, sectionClass: string) {
    const chore = this._chores.find((c) => c.id === item.chore_id);
    const icon = chore ? getChoreIcon(chore.name) : getChoreIcon(item.summary);
    const isCompleted = item.status === "completed";
    const assigneeName = this._extractAssignee(item.summary);
    const stats = item.completion_stats;

    return html`
      <div
        class="todo-item ${isCompleted ? "completed" : ""} ${sectionClass}"
        id="todo-${item.uid}"
      >
        <ha-icon
          class="todo-checkbox"
          icon=${isCompleted
            ? "mdi:checkbox-marked-circle"
            : "mdi:checkbox-blank-circle-outline"}
          @click=${() => !isCompleted && this._handleComplete(item)}
        ></ha-icon>
        <ha-icon class="todo-icon" icon=${icon}></ha-icon>
        <div class="todo-info">
          <span class="todo-summary">${item.summary}</span>
        </div>
        ${stats && stats.streak > 1
          ? html`<span class="streak-badge" title=${localize("display.streak", this.hass, { count: stats.streak })}>
              <ha-icon icon="mdi:fire"></ha-icon>${stats.streak}
            </span>`
          : nothing}
        ${assigneeName ? this._renderAvatar(assigneeName) : nothing}
      </div>
    `;
  }

  private _extractAssignee(summary: string): string | null {
    const match = summary.match(/\(([^)]+)\)$/);
    return match ? match[1] : null;
  }

  private _renderAvatar(name: string) {
    // Try to find person entity
    const entityId = `person.${name.toLowerCase().replace(/\s+/g, "_")}`;
    const personState = this.hass?.states[entityId];
    const picture = personState?.attributes?.entity_picture as string | undefined;
    const initial = name.charAt(0).toUpperCase();

    return html`
      <div class="assignee-avatar" title=${name}>
        ${picture
          ? html`<img src=${picture} alt=${name} />`
          : html`<span>${initial}</span>`}
      </div>
    `;
  }

  private async _handleComplete(item: TodoItem): Promise<void> {
    // Optimistic update
    this._todoItems = this._todoItems.map((i) =>
      i.uid === item.uid ? { ...i, status: "completed" as const, completed_at: new Date().toISOString() } : i
    );

    // Animations
    if (this._config?.enable_animations !== false) {
      const el = this.shadowRoot?.querySelector(`#todo-${item.uid} .todo-checkbox`) as HTMLElement;
      if (el) playCheckmarkPop(el);
      triggerHaptic();
    }

    // Send to backend
    try {
      await this.hass.connection.sendMessagePromise({
        type: "chore_scheduler/complete_todo",
        uid: item.uid,
      });
    } catch (err) {
      console.error("[ChoreScheduler] Failed to complete todo:", err);
      // Revert optimistic update
      await this._loadData();
      return;
    }

    // Check if all today's items are done
    const today = new Date().toISOString().split("T")[0];
    const pendingToday = this._todoItems.filter(
      (i) => i.status === "needs_action" && (!i.due || i.due <= today)
    );
    if (pendingToday.length === 0) {
      this._showAllDone = true;
      setTimeout(() => {
        this._showAllDone = false;
      }, 3000);
    }

    // Reload to get updated stats
    setTimeout(() => this._loadData(), 500);
  }

  // ── Manage Mode ───────────────────────────────────────────────────

  private _renderManageMode() {
    const filteredChores = this._config?.show_disabled
      ? this._chores
      : this._chores.filter((c) => c.enabled);

    if (filteredChores.length === 0) {
      return html`
        <div class="empty-state">
          <ha-icon icon="mdi:broom"></ha-icon>
          <p>${localize("card.empty_title", this.hass)}</p>
          <p>${localize("card.empty_subtitle", this.hass)}</p>
        </div>
      `;
    }

    return html`
      <div class="chore-list">
        ${filteredChores.map((chore) => this._renderChoreItem(chore))}
      </div>
    `;
  }

  private _renderChoreItem(chore: Chore) {
    const scheduleText = this._formatSchedule(chore.schedule);
    const icon = getChoreIcon(chore.name);
    const assigneeNames = this._getAssigneeNames(chore);
    const stats = this._getChoreStats(chore.id);

    return html`
      <div
        class="chore-item ${chore.enabled ? "" : "disabled"}"
        @click=${() => this._editChore(chore)}
      >
        <ha-icon class="chore-icon" icon=${icon}></ha-icon>
        <div class="chore-info">
          <div class="chore-name">${chore.name}</div>
          <div class="chore-meta">
            <span class="schedule-pill ${chore.schedule.type}">${scheduleText}</span>
            ${assigneeNames.length
              ? assigneeNames.map(
                  (name) => html`${this._renderAvatar(name)}`
                )
              : nothing}
            ${stats && stats.streak > 1
              ? html`<span class="streak-badge">
                  <ha-icon icon="mdi:fire"></ha-icon>${stats.streak}
                </span>`
              : nothing}
          </div>
        </div>
        <div class="chore-actions">
          <ha-icon-button @click=${(e: Event) => this._triggerChore(e, chore)}>
            <ha-icon icon="mdi:play"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
    `;
  }

  private _getAssigneeNames(chore: Chore): string[] {
    if (chore.assignment.mode === "unassigned" || !chore.assignment.assignees?.length) {
      return [];
    }
    return chore.assignment.assignees
      .filter((a): a is string => a != null)
      .map((a) => a.split(".").pop()?.replace(/_/g, " ") || a);
  }

  private _getChoreStats(choreId: string) {
    // Find from todo items (they carry enriched stats)
    const item = this._todoItems.find((i) => i.chore_id === choreId);
    return item?.completion_stats;
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
        const dayNames = days.map((d) => localizeWeekday(d, this.hass)).join(", ");
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

  // ── Actions ───────────────────────────────────────────────────────

  private _toggleMode(): void {
    this._mode = this._mode === "display" ? "manage" : "display";
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
      setTimeout(() => this._loadData(), 500);
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
      await this._loadData();
    } catch (error) {
      console.error("[ChoreScheduler] Error saving chore:", error);
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
      setTimeout(() => this._loadData(), 500);
    } catch (error) {
      console.error("Error deleting chore:", error);
    }
  }

  static getConfigElement() {
    return document.createElement("chore-scheduler-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Chore Scheduler",
      show_disabled: true,
      show_next_due: true,
      default_mode: "display",
      show_completed: false,
      enable_animations: true,
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

window.customCards = window.customCards || [];
window.customCards.push({
  type: "chore-scheduler-card",
  name: "Chore Scheduler Card",
  description: "A card for managing household chore schedules",
  preview: true,
});
