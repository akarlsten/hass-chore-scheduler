import { LitElement, nothing, PropertyValues } from "lit";
import { HomeAssistant, LovelaceCardConfig } from "./types";
import "./chore-editor";
import "./chore-scheduler-card-editor";
interface HomeAssistantExtended extends HomeAssistant {
    connection: {
        sendMessagePromise<T>(message: {
            type: string;
            [key: string]: unknown;
        }): Promise<T>;
    };
}
export declare class ChoreSchedulerCard extends LitElement {
    hass: HomeAssistantExtended;
    private _config?;
    private _chores;
    private _todoItems;
    private _loading;
    private _editingChore;
    private _showEditor;
    private _mode;
    static styles: import("lit").CSSResult;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize(): number;
    protected firstUpdated(_changedProps: PropertyValues): void;
    protected updated(changedProps: PropertyValues): void;
    private _loadData;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private _renderDisplayMode;
    private _renderSection;
    private _renderTodoItem;
    private _extractAssignee;
    private _renderAvatar;
    private _handleComplete;
    private _renderManageMode;
    private _renderChoreItem;
    private _getAssigneeNames;
    private _getChoreStats;
    private _formatSchedule;
    private _toggleMode;
    private _addChore;
    private _editChore;
    private _closeEditor;
    private _triggerChore;
    private _handleChoreSave;
    private _handleChoreDelete;
    static getConfigElement(): import("./chore-scheduler-card-editor").ChoreSchedulerCardEditor;
    static getStubConfig(): {
        title: string;
        show_disabled: boolean;
        show_next_due: boolean;
        default_mode: string;
        show_completed: boolean;
        enable_animations: boolean;
    };
}
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
export {};
//# sourceMappingURL=chore-scheduler-card.d.ts.map