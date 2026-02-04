import { LitElement, PropertyValues } from "lit";
import { HomeAssistant, Chore } from "./types";
export declare class ChoreEditor extends LitElement {
    hass: HomeAssistant;
    chore: Chore | null;
    private _name;
    private _description;
    private _scheduleType;
    private _scheduleDays;
    private _scheduleTime;
    private _scheduleDayOfMonth;
    private _scheduleDate;
    private _selectedAssignee;
    private _notificationsEnabled;
    private _notifyTargets;
    private _persistentNotification;
    static styles: import("lit").CSSResult;
    protected firstUpdated(_changedProps: PropertyValues): void;
    protected updated(changedProps: PropertyValues): void;
    private _initializeFromChore;
    private _resetForm;
    private _getTodayDate;
    protected render(): import("lit-html").TemplateResult<1>;
    private _setScheduleType;
    private _renderScheduleExtra;
    private _formatOrdinal;
    private _handleDayOfMonthChange;
    private _renderPersonOption;
    private _getPersonEntities;
    private _getMobileDevices;
    private _toggleDay;
    private _toggleNotifyTarget;
    private _handleOverlayClick;
    private _handleCancel;
    private _closing;
    private _animateClose;
    private _handleSave;
    private _handleDelete;
}
declare global {
    interface HTMLElementTagNameMap {
        "chore-editor": ChoreEditor;
    }
}
//# sourceMappingURL=chore-editor.d.ts.map