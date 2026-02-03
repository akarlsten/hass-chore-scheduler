export interface HomeAssistant {
    states: {
        [entityId: string]: HassEntity;
    };
    services: {
        [domain: string]: {
            [service: string]: object;
        };
    };
    language: string;
    user: {
        id: string;
        name: string;
        is_admin: boolean;
    };
    callService(domain: string, service: string, serviceData?: object, target?: {
        entity_id?: string | string[];
    }): Promise<void>;
    callApi<T>(method: string, path: string, data?: object): Promise<T>;
}
export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: {
        [key: string]: unknown;
    };
    last_changed: string;
    last_updated: string;
}
export interface LovelaceCard extends HTMLElement {
    hass?: HomeAssistant;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize?(): number;
}
export interface LovelaceCardConfig {
    type: string;
    [key: string]: unknown;
}
export interface ChoreSchedulerCardConfig extends LovelaceCardConfig {
    title?: string;
    show_disabled?: boolean;
    show_next_due?: boolean;
    default_todo_list?: string;
}
export type ScheduleType = "once" | "daily" | "weekly" | "monthly" | "custom";
export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export interface ChoreSchedule {
    type: ScheduleType;
    days?: Weekday[];
    time: string;
    interval?: number;
    day_of_month?: number;
    date?: string;
}
export type AssignmentMode = "unassigned" | "fixed" | "rotating";
export interface ChoreAssignment {
    mode: AssignmentMode;
    assignees: string[];
    current_index: number;
}
export interface ChoreNotifications {
    enabled: boolean;
    remind_before: number;
    notify_targets: string[];
}
export interface Chore {
    id: string;
    name: string;
    description: string;
    schedule: ChoreSchedule;
    assignment: ChoreAssignment;
    target_todo_list: string | null;
    notifications: ChoreNotifications;
    enabled: boolean;
    last_triggered: string | null;
}
export interface ListChoresResponse {
    chores: Chore[];
}
export interface ChoreSaveEvent extends CustomEvent {
    detail: {
        chore: Partial<Chore>;
        isNew: boolean;
    };
}
export interface ChoreDeleteEvent extends CustomEvent {
    detail: {
        choreId: string;
    };
}
//# sourceMappingURL=types.d.ts.map