import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  Chore,
  ChoreSchedule,
  ChoreAssignment,
  ChoreNotifications,
  ScheduleType,
  Weekday,
  HassEntity,
} from "./types";
import { localize, localizeWeekday } from "./localize";

const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

@customElement("chore-editor")
export class ChoreEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public chore: Chore | null = null;

  @state() private _name = "";
  @state() private _description = "";
  @state() private _scheduleType: ScheduleType = "weekly";
  @state() private _scheduleDays: Weekday[] = ["sunday"];
  @state() private _scheduleTime = "10:00";
  @state() private _scheduleDayOfMonth = 1;
  @state() private _scheduleDate = ""; // For "once" schedule type
  @state() private _selectedAssignee: string | null = null;
  // target_todo_list removed - integration now manages its own todo entity
  @state() private _notificationsEnabled = false;
  @state() private _notifyTargets: string[] = [];
  @state() private _persistentNotification = false;

  static styles = css`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 12px;
      box-sizing: border-box;
    }

    .dialog {
      background: var(--card-background-color, white);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
      max-height: calc(100vh - 24px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .dialog-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid var(--divider-color);
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    .form-label {
      display: block;
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .form-label.required::after {
      content: " *";
      color: var(--error-color, #db4437);
    }

    ha-textfield, ha-textarea, ha-select {
      display: block;
      width: 100%;
    }


    /* Person selector - 5 per row grid */
    .person-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
    }

    .person-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 6px 2px;
      border-radius: 10px;
      border: 2px solid var(--divider-color);
      background: var(--card-background-color);
      cursor: pointer;
      transition: all 0.15s ease;
      box-sizing: border-box;
      min-width: 0;
    }

    .person-option:hover {
      border-color: var(--primary-color);
    }

    .person-option.selected {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    }

    .person-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .person-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .person-avatar ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }

    .person-name {
      font-size: 0.65rem;
      color: var(--primary-text-color);
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .person-option.selected .person-name {
      font-weight: 500;
      color: var(--primary-color);
    }

    /* Schedule type chips - 4 columns */
    .schedule-type-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }

    .schedule-type-chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 12px 8px;
      border-radius: 12px;
      border: 2px solid var(--divider-color);
      background: var(--card-background-color);
      cursor: pointer;
      transition: all 0.15s ease;
      box-sizing: border-box;
    }

    .schedule-type-chip:hover {
      border-color: var(--primary-color);
    }

    .schedule-type-chip.selected {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    }

    .schedule-type-chip ha-icon {
      --mdc-icon-size: 24px;
      color: var(--secondary-text-color);
    }

    .schedule-type-chip.selected ha-icon {
      color: var(--primary-color);
    }

    .schedule-type-chip span {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .schedule-type-chip.selected span {
      color: var(--primary-color);
    }

    /* Time input section */
    .time-section {
      margin-top: 12px;
    }

    .time-section ha-textfield {
      width: 110px;
    }

    /* Day selector */
    .day-grid {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .day-chip {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 2px solid var(--divider-color);
      background: var(--card-background-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      color: var(--primary-text-color);
    }

    .day-chip:hover {
      border-color: var(--primary-color);
    }

    .day-chip.selected {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }

    /* Schedule extra options */
    .schedule-extra {
      margin-top: 12px;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--divider-color);
      margin: 20px 0;
    }

    /* Optional section */
    .optional-section {
      background: var(--secondary-background-color);
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 12px;
    }

    .optional-section:last-child {
      margin-bottom: 0;
    }

    .optional-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .optional-title {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .optional-desc {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .notify-options {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .notify-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: var(--card-background-color);
      border-radius: 8px;
      cursor: pointer;
    }

    .notify-option ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }

    .notify-option.selected ha-icon {
      color: var(--primary-color);
    }

    .notify-option-info {
      flex: 1;
    }

    .notify-option-title {
      font-size: 0.8rem;
      color: var(--primary-text-color);
    }

    .notify-option-desc {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }

    .notify-targets {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Actions */
    .dialog-actions {
      display: flex;
      gap: 8px;
      padding: 12px 20px 16px;
      border-top: 1px solid var(--divider-color);
      justify-content: flex-end;
    }

    .delete-btn {
      margin-right: auto;
    }

    /* Custom button styling */
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
    }

    .btn-text {
      background: transparent;
      color: var(--primary-text-color);
    }

    .btn-text:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
    }

    .btn-danger {
      background: transparent;
      color: var(--error-color, #db4437);
    }

    .btn-danger:hover {
      background: rgba(219, 68, 55, 0.1);
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      filter: brightness(1.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  protected firstUpdated(_changedProps: PropertyValues): void {
    super.firstUpdated(_changedProps);
    this._initializeFromChore();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has("chore")) {
      this._initializeFromChore();
    }
  }

  private _initializeFromChore(): void {
    if (this.chore) {
      this._name = this.chore.name;
      this._description = this.chore.description || "";
      this._scheduleType = this.chore.schedule.type;
      this._scheduleDays = this.chore.schedule.days || ["sunday"];
      this._scheduleTime = this.chore.schedule.time || "10:00";
      this._scheduleDayOfMonth = this.chore.schedule.day_of_month || 1;
      this._scheduleDate = this.chore.schedule.date || this._getTodayDate();

      const assignment = this.chore.assignment;
      if (assignment.mode === "unassigned" || !assignment.assignees?.length) {
        this._selectedAssignee = null;
      } else {
        this._selectedAssignee = assignment.assignees[0];
      }

      this._notificationsEnabled = this.chore.notifications.enabled;
      this._notifyTargets = [...(this.chore.notifications.notify_targets || [])];
      this._persistentNotification = this._notifyTargets.includes("persistent_notification");
      this._notifyTargets = this._notifyTargets.filter(t => t !== "persistent_notification");
    } else {
      this._resetForm();
    }
  }

  private _resetForm(): void {
    this._name = "";
    this._description = "";
    this._scheduleType = "weekly";
    this._scheduleDays = ["sunday"];
    this._scheduleTime = "10:00";
    this._scheduleDayOfMonth = 1;
    this._scheduleDate = this._getTodayDate();
    this._selectedAssignee = null;
    this._notificationsEnabled = false;
    this._notifyTargets = [];
    this._persistentNotification = false;
  }

  private _getTodayDate(): string {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }

  protected render() {
    const isNew = !this.chore;
    const persons = this._getPersonEntities();
    const mobileDevices = this._getMobileDevices();

    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-header">
            <h2>${isNew ? localize("editor.add_title", this.hass) : localize("editor.edit_title", this.hass)}</h2>
          </div>

          <div class="dialog-content">
            <!-- Name -->
            <div class="form-group">
              <label class="form-label required">${localize("editor.name", this.hass)}</label>
              <ha-textfield
                .value=${this._name}
                @input=${(e: InputEvent) => (this._name = (e.target as HTMLInputElement).value)}
                placeholder="e.g. Vacuum the floors"
              ></ha-textfield>
            </div>

            <!-- Who -->
            <div class="form-group">
              <label class="form-label">${localize("assignment.title", this.hass)}</label>
              <div class="person-grid">
                <div
                  class="person-option ${this._selectedAssignee === null ? 'selected' : ''}"
                  @click=${() => (this._selectedAssignee = null)}
                >
                  <div class="person-avatar">
                    <ha-icon icon="mdi:account-group"></ha-icon>
                  </div>
                  <span class="person-name">Anyone</span>
                </div>
                ${persons.map(person => this._renderPersonOption(person))}
              </div>
            </div>

            <!-- When -->
            <div class="form-group">
              <label class="form-label">${localize("schedule.title", this.hass)}</label>

              <!-- Schedule type chips -->
              <div class="schedule-type-grid">
                <div
                  class="schedule-type-chip ${this._scheduleType === 'once' ? 'selected' : ''}"
                  @click=${() => this._setScheduleType('once')}
                >
                  <ha-icon icon="mdi:numeric-1-circle"></ha-icon>
                  <span>${localize("schedule.once", this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${this._scheduleType === 'daily' ? 'selected' : ''}"
                  @click=${() => this._setScheduleType('daily')}
                >
                  <ha-icon icon="mdi:calendar-today"></ha-icon>
                  <span>${localize("schedule.daily", this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${this._scheduleType === 'weekly' ? 'selected' : ''}"
                  @click=${() => this._setScheduleType('weekly')}
                >
                  <ha-icon icon="mdi:calendar-week"></ha-icon>
                  <span>${localize("schedule.weekly", this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${this._scheduleType === 'monthly' ? 'selected' : ''}"
                  @click=${() => this._setScheduleType('monthly')}
                >
                  <ha-icon icon="mdi:calendar-month"></ha-icon>
                  <span>${localize("schedule.monthly", this.hass)}</span>
                </div>
              </div>

              <!-- Time input -->
              <div class="time-section">
                <label class="form-label">${localize("schedule.time", this.hass)}</label>
                <ha-textfield
                  type="time"
                  .value=${this._scheduleTime}
                  @input=${(e: InputEvent) => (this._scheduleTime = (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>

              <!-- Schedule type specific options -->
              ${this._renderScheduleExtra()}
            </div>

            <div class="divider"></div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label">${localize("editor.description", this.hass)}</label>
              <ha-textfield
                .value=${this._description}
                @input=${(e: InputEvent) => (this._description = (e.target as HTMLInputElement).value)}
                placeholder="Notes or instructions..."
              ></ha-textfield>
            </div>

            <!-- Notifications -->
            <div class="optional-section">
              <div class="optional-header" @click=${() => (this._notificationsEnabled = !this._notificationsEnabled)}>
                <div>
                  <div class="optional-title">${localize("notifications.title", this.hass)}</div>
                  <div class="optional-desc">Get reminded when due</div>
                </div>
                <ha-switch
                  .checked=${this._notificationsEnabled}
                  @change=${(e: Event) => {
                    e.stopPropagation();
                    this._notificationsEnabled = (e.target as HTMLInputElement).checked;
                  }}
                ></ha-switch>
              </div>

              ${this._notificationsEnabled ? html`
                <div class="notify-options">
                  <div
                    class="notify-option ${this._persistentNotification ? 'selected' : ''}"
                    @click=${() => (this._persistentNotification = !this._persistentNotification)}
                  >
                    <ha-icon icon="mdi:bell-badge"></ha-icon>
                    <div class="notify-option-info">
                      <div class="notify-option-title">Persistent notification</div>
                      <div class="notify-option-desc">Shows in HA sidebar until dismissed</div>
                    </div>
                    <ha-checkbox
                      .checked=${this._persistentNotification}
                      @change=${(e: Event) => {
                        e.stopPropagation();
                        this._persistentNotification = (e.target as HTMLInputElement).checked;
                      }}
                    ></ha-checkbox>
                  </div>

                  ${mobileDevices.length > 0 ? html`
                    <div class="notify-targets">
                      <label class="form-label" style="margin-bottom: 6px;">Mobile devices</label>
                      ${mobileDevices.map(device => html`
                        <div
                          class="notify-option ${this._notifyTargets.includes(device.service) ? 'selected' : ''}"
                          @click=${() => this._toggleNotifyTarget(device.service)}
                        >
                          <ha-icon icon="mdi:cellphone"></ha-icon>
                          <div class="notify-option-info">
                            <div class="notify-option-title">${device.name}</div>
                          </div>
                          <ha-checkbox
                            .checked=${this._notifyTargets.includes(device.service)}
                            @change=${(e: Event) => {
                              e.stopPropagation();
                              this._toggleNotifyTarget(device.service);
                            }}
                          ></ha-checkbox>
                        </div>
                      `)}
                    </div>
                  ` : nothing}
                </div>
              ` : nothing}
            </div>
          </div>

          <div class="dialog-actions">
            ${!isNew ? html`
              <button class="btn btn-danger delete-btn" @click=${this._handleDelete}>
                ${localize("editor.delete", this.hass)}
              </button>
            ` : nothing}
            <button class="btn btn-text" @click=${this._handleCancel}>
              ${localize("editor.cancel", this.hass)}
            </button>
            <button
              class="btn btn-primary"
              @click=${this._handleSave}
              ?disabled=${!this._name.trim()}
            >
              ${isNew ? localize("editor.add", this.hass) : localize("editor.save", this.hass)}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _setScheduleType(type: ScheduleType): void {
    this._scheduleType = type;
  }

  private _renderScheduleExtra() {
    if (this._scheduleType === "once") {
      return html`
        <div class="schedule-extra">
          <label class="form-label">On date</label>
          <ha-textfield
            type="date"
            .value=${this._scheduleDate}
            @input=${(e: InputEvent) => (this._scheduleDate = (e.target as HTMLInputElement).value)}
          ></ha-textfield>
        </div>
      `;
    }

    if (this._scheduleType === "weekly") {
      return html`
        <div class="schedule-extra">
          <label class="form-label">On days</label>
          <div class="day-grid">
            ${WEEKDAYS.map(day => html`
              <div
                class="day-chip ${this._scheduleDays.includes(day) ? 'selected' : ''}"
                @click=${() => this._toggleDay(day)}
              >
                ${localizeWeekday(day, this.hass)}
              </div>
            `)}
          </div>
        </div>
      `;
    }

    if (this._scheduleType === "monthly") {
      return html`
        <div class="schedule-extra">
          <ha-select
            .value=${String(this._scheduleDayOfMonth)}
            @selected=${this._handleDayOfMonthChange}
            @closed=${(e: Event) => e.stopPropagation()}
            label="On day"
            fixedMenuPosition
          >
            ${Array.from({ length: 31 }, (_, i) => i + 1).map(day => html`
              <ha-list-item .value=${String(day)}>${this._formatOrdinal(day)}</ha-list-item>
            `)}
          </ha-select>
        </div>
      `;
    }

    // Daily - no extra options needed
    return nothing;
  }

  private _formatOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  private _handleDayOfMonthChange(e: CustomEvent): void {
    if (e.detail?.value) {
      this._scheduleDayOfMonth = parseInt(e.detail.value) || 1;
    }
  }

  private _renderPersonOption(person: HassEntity) {
    const entityId = person.entity_id;
    const fullName = (person.attributes.friendly_name as string) || entityId.split('.')[1].replace(/_/g, ' ');
    const firstName = fullName.split(' ')[0];
    const picture = person.attributes.entity_picture as string | undefined;
    const isSelected = this._selectedAssignee === entityId;

    return html`
      <div
        class="person-option ${isSelected ? 'selected' : ''}"
        @click=${() => (this._selectedAssignee = entityId)}
      >
        <div class="person-avatar">
          ${picture
            ? html`<img src="${picture}" alt="${firstName}" />`
            : html`<ha-icon icon="mdi:account"></ha-icon>`
          }
        </div>
        <span class="person-name">${firstName}</span>
      </div>
    `;
  }

  private _getPersonEntities(): HassEntity[] {
    return Object.values(this.hass.states).filter((entity) =>
      entity.entity_id.startsWith("person.")
    );
  }

  private _getMobileDevices(): { service: string; name: string }[] {
    const notifyDomain = this.hass.services.notify;
    if (!notifyDomain) return [];
    return Object.keys(notifyDomain)
      .filter((s) => s.startsWith("mobile_app_"))
      .map((s) => ({
        service: `notify.${s}`,
        name: s.replace("mobile_app_", "").replace(/_/g, " "),
      }));
  }

  private _toggleDay(day: Weekday): void {
    if (this._scheduleDays.includes(day)) {
      if (this._scheduleDays.length > 1) {
        this._scheduleDays = [...this._scheduleDays.filter((d) => d !== day)];
      }
    } else {
      this._scheduleDays = [...this._scheduleDays, day];
    }
  }

  private _toggleNotifyTarget(service: string): void {
    if (this._notifyTargets.includes(service)) {
      this._notifyTargets = [...this._notifyTargets.filter(t => t !== service)];
    } else {
      this._notifyTargets = [...this._notifyTargets, service];
    }
  }

  private _handleOverlayClick(): void {
    this._handleCancel();
  }

  private _handleCancel(): void {
    this.dispatchEvent(new CustomEvent("editor-close", { bubbles: true, composed: true }));
  }

  private _handleSave(): void {
    const schedule: ChoreSchedule = {
      type: this._scheduleType,
      time: this._scheduleTime,
      interval: 1,
    };

    if (this._scheduleType === "once") {
      schedule.date = this._scheduleDate;
    } else if (this._scheduleType === "weekly") {
      schedule.days = this._scheduleDays;
    } else if (this._scheduleType === "monthly") {
      schedule.day_of_month = this._scheduleDayOfMonth;
    }

    const assignment: ChoreAssignment = {
      mode: this._selectedAssignee ? "fixed" : "unassigned",
      assignees: this._selectedAssignee ? [this._selectedAssignee] : [],
      current_index: 0,
    };

    const allNotifyTargets = [...this._notifyTargets];
    if (this._persistentNotification) {
      allNotifyTargets.push("persistent_notification");
    }

    const notifications: ChoreNotifications = {
      enabled: this._notificationsEnabled,
      remind_before: 60,
      notify_targets: allNotifyTargets,
    };

    const choreData: Partial<Chore> = {
      name: this._name.trim(),
      description: this._description.trim(),
      enabled: true,
      schedule,
      assignment,
      notifications,
    };

    if (this.chore) {
      choreData.id = this.chore.id;
    }

    this.dispatchEvent(
      new CustomEvent("chore-save", {
        detail: {
          chore: choreData,
          isNew: !this.chore,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleDelete(): void {
    if (this.chore && confirm(localize("editor.delete_confirm", this.hass))) {
      this.dispatchEvent(
        new CustomEvent("chore-delete", {
          detail: { choreId: this.chore.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "chore-editor": ChoreEditor;
  }
}
