import { LitElement, nothing, PropertyValues } from "lit";
import { HomeAssistant, LovelaceCardConfig } from "./types";
import "./chore-editor";
import "./chore-scheduler-card-editor";
interface HomeAssistantExtended extends HomeAssistant {
    connection: {
        sendMessagePromise<T>(message: {
            type: string;
        }): Promise<T>;
    };
}
export declare class ChoreSchedulerCard extends LitElement {
    hass: HomeAssistantExtended;
    private _config?;
    private _chores;
    private _loading;
    private _editingChore;
    private _showEditor;
    static styles: import("lit").CSSResult;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize(): number;
    protected firstUpdated(_changedProps: PropertyValues): void;
    protected updated(changedProps: PropertyValues): void;
    private _loadChores;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private _renderChoreItem;
    private _formatSchedule;
    private _formatAssignment;
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