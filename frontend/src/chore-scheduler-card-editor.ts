import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, ChoreSchedulerCardConfig, HassEntity } from "./types";

@customElement("chore-scheduler-card-editor")
export class ChoreSchedulerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: ChoreSchedulerCardConfig;

  static styles = css`
    .form-group {
      margin-bottom: 16px;
    }

    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    .switches {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .switch-label {
      font-size: 0.875rem;
      color: var(--primary-text-color);
    }
  `;

  public setConfig(config: ChoreSchedulerCardConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const todoEntities = this._getTodoEntities();

    return html`
      <div class="form-group">
        <ha-textfield
          label="Title"
          .value=${this._config.title || "Chore Scheduler"}
          @input=${this._titleChanged}
        ></ha-textfield>
      </div>

      <div class="form-group">
        <ha-select
          label="Default todo list"
          .value=${this._config.default_todo_list || ""}
          @selected=${this._todoListChanged}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          <ha-list-item value="">Use integration default</ha-list-item>
          ${todoEntities.map(
            (entity) => html`
              <ha-list-item .value=${entity.entity_id}>
                ${entity.attributes.friendly_name || entity.entity_id}
              </ha-list-item>
            `
          )}
        </ha-select>
      </div>

      <div class="switches">
        <div class="switch-row">
          <span class="switch-label">Show disabled chores</span>
          <ha-switch
            .checked=${this._config.show_disabled !== false}
            @change=${this._showDisabledChanged}
          ></ha-switch>
        </div>

        <div class="switch-row">
          <span class="switch-label">Show next due date</span>
          <ha-switch
            .checked=${this._config.show_next_due !== false}
            @change=${this._showNextDueChanged}
          ></ha-switch>
        </div>
      </div>
    `;
  }

  private _getTodoEntities(): HassEntity[] {
    return Object.values(this.hass.states).filter((entity) =>
      entity.entity_id.startsWith("todo.")
    );
  }

  private _titleChanged(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ title: target.value });
  }

  private _todoListChanged(e: CustomEvent): void {
    const value = e.detail.value;
    if (value) {
      this._updateConfig({ default_todo_list: value });
    } else {
      // Remove the key if empty
      const newConfig = { ...this._config };
      delete newConfig.default_todo_list;
      this._config = newConfig as ChoreSchedulerCardConfig;
      this._fireConfigChanged();
    }
  }

  private _showDisabledChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ show_disabled: target.checked });
  }

  private _showNextDueChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ show_next_due: target.checked });
  }

  private _updateConfig(updates: Partial<ChoreSchedulerCardConfig>): void {
    this._config = { ...this._config, ...updates } as ChoreSchedulerCardConfig;
    this._fireConfigChanged();
  }

  private _fireConfigChanged(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chore-scheduler-card-editor": ChoreSchedulerCardEditor;
  }
}
