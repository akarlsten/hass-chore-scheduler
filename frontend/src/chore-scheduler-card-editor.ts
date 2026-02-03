import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, ChoreSchedulerCardConfig } from "./types";

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
          label="Default mode"
          .value=${this._config.default_mode || "display"}
          @selected=${this._defaultModeChanged}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          <ha-list-item value="display">Display (view todos)</ha-list-item>
          <ha-list-item value="manage">Manage (edit chores)</ha-list-item>
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
          <span class="switch-label">Show completed todos</span>
          <ha-switch
            .checked=${this._config.show_completed === true}
            @change=${this._showCompletedChanged}
          ></ha-switch>
        </div>

        <div class="switch-row">
          <span class="switch-label">Enable animations</span>
          <ha-switch
            .checked=${this._config.enable_animations !== false}
            @change=${this._enableAnimationsChanged}
          ></ha-switch>
        </div>
      </div>
    `;
  }

  private _titleChanged(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ title: target.value });
  }

  private _defaultModeChanged(e: CustomEvent): void {
    const value = e.detail.value;
    if (value) {
      this._updateConfig({ default_mode: value });
    }
  }

  private _showDisabledChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ show_disabled: target.checked });
  }

  private _showCompletedChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ show_completed: target.checked });
  }

  private _enableAnimationsChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._updateConfig({ enable_animations: target.checked });
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
