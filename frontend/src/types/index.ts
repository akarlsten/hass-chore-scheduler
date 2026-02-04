// Home Assistant types
export interface HomeAssistant {
  states: { [entityId: string]: HassEntity }
  services: { [domain: string]: { [service: string]: object } }
  language: string
  user: {
    id: string
    name: string
    is_admin: boolean
  }
  connection: {
    sendMessagePromise<T>(message: { type: string; [key: string]: unknown }): Promise<T>
  }
  callService(
    domain: string,
    service: string,
    serviceData?: object,
    target?: { entity_id?: string | string[] }
  ): Promise<void>
  callApi<T>(method: string, path: string, data?: object): Promise<T>
}

export interface HassEntity {
  entity_id: string
  state: string
  attributes: { [key: string]: unknown }
  last_changed: string
  last_updated: string
}

export interface LovelaceCardConfig {
  type: string
  [key: string]: unknown
}

// Card mode
export type CardMode = "display" | "manage"

// Chore Scheduler types
export interface ChoreSchedulerCardConfig extends LovelaceCardConfig {
  title?: string
  show_disabled?: boolean
  show_next_due?: boolean
  default_mode?: CardMode
  show_completed?: boolean
  enable_animations?: boolean
}

export type ScheduleType = "once" | "daily" | "weekly" | "monthly" | "custom"

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export interface ChoreSchedule {
  type: ScheduleType
  days?: Weekday[]
  time: string
  interval?: number
  day_of_month?: number
  date?: string
}

export type AssignmentMode = "unassigned" | "fixed" | "rotating"

export interface ChoreAssignment {
  mode: AssignmentMode
  assignees: string[]
  current_index: number
}

export interface ChoreNotifications {
  enabled: boolean
  remind_before: number
  notify_targets: string[]
}

export interface Chore {
  id: string
  name: string
  description: string
  schedule: ChoreSchedule
  assignment: ChoreAssignment
  notifications: ChoreNotifications
  enabled: boolean
  last_triggered: string | null
}

export interface CompletionStats {
  last_completed: string | null
  streak: number
  total_completions: number
}

export interface TodoItem {
  uid: string
  summary: string
  status: "needs_action" | "completed"
  description?: string
  due?: string
  chore_id: string
  created_at: string
  completed_at?: string
  chore_name?: string
  schedule_type?: string
  assignment?: ChoreAssignment
  completion_stats?: CompletionStats
}

export interface ListChoresResponse {
  chores: Chore[]
}

export interface ListTodosResponse {
  items: TodoItem[]
}
