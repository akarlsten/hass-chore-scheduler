import { LitElement } from "lit";
import { HomeAssistant, ChoreSchedulerCardConfig } from "./types";
export declare class ChoreSchedulerCardEditor extends LitElement {
    hass: HomeAssistant;
    private _config?;
    static styles: import("lit").CSSResult;
    setConfig(config: ChoreSchedulerCardConfig): void;
    protected render(): import("lit-html").TemplateResult<1>;
    private _getTodoEntities;
    private _titleChanged;
    private _todoListChanged;
    private _showDisabledChanged;
    private _showNextDueChanged;
    private _updateConfig;
    private _fireConfigChanged;
}
declare global {
    interface HTMLElementTagNameMap {
        "chore-scheduler-card-editor": ChoreSchedulerCardEditor;
    }
}
//# sourceMappingURL=chore-scheduler-card-editor.d.ts.map