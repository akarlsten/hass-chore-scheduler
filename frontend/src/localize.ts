import { HomeAssistant } from "./types";

const translations: Record<string, Record<string, string>> = {
  en: {
    // Card
    "card.title": "Chore scheduler",
    "card.empty_title": "No chores configured yet.",
    "card.empty_subtitle": "Click the + button to add your first chore.",

    // Editor
    "editor.add_title": "Add chore",
    "editor.edit_title": "Edit chore",
    "editor.name": "Name",
    "editor.description": "Description (optional)",
    "editor.enabled": "Enabled",
    "editor.save": "Save",
    "editor.add": "Add",
    "editor.cancel": "Cancel",
    "editor.delete": "Delete",
    "editor.delete_confirm": "Are you sure you want to delete this chore?",

    // Schedule
    "schedule.title": "Schedule",
    "schedule.frequency": "Frequency",
    "schedule.once": "Once",
    "schedule.daily": "Daily",
    "schedule.weekly": "Weekly",
    "schedule.monthly": "Monthly",
    "schedule.days": "Days",
    "schedule.day_of_month": "Day of month",
    "schedule.time": "Time",

    // Weekdays
    "weekday.monday": "Mon",
    "weekday.tuesday": "Tue",
    "weekday.wednesday": "Wed",
    "weekday.thursday": "Thu",
    "weekday.friday": "Fri",
    "weekday.saturday": "Sat",
    "weekday.sunday": "Sun",

    // Assignment
    "assignment.title": "Assignment",
    "assignment.mode": "Mode",
    "assignment.unassigned": "Unassigned",
    "assignment.fixed": "Fixed",
    "assignment.rotating": "Rotating",
    "assignment.assignees": "Assignees",
    "assignment.add_assignee": "Add assignee",
    "assignment.rotating_current": "Rotating (current: {name})",
    "assignment.assigned_to": "Assigned to: {names}",

    // Target
    "target.title": "Target",
    "target.todo_list": "Todo list",
    "target.default": "Default",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.send": "Send notifications",
    "notifications.targets": "Notify targets",
    "notifications.add_target": "Add target",

    // Schedule display
    "display.daily_at": "Daily at {time}",
    "display.monthly_at": "Monthly on day {day} at {time}",
    "display.at_time": "At {time}",

    // Display mode
    "mode.display": "View",
    "mode.manage": "Manage",
    "display.overdue": "Overdue",
    "display.today": "Today",
    "display.upcoming": "Upcoming",
    "display.done": "Done",
    "display.all_done": "All chores done!",
    "display.no_pending": "No pending chores",
    "display.empty_todos": "No chores scheduled yet.",
    "display.streak": "{count} day streak",
  },
  sv: {
    // Card
    "card.title": "Sysslor",
    "card.empty_title": "Inga sysslor konfigurerade ännu.",
    "card.empty_subtitle": "Klicka på + för att lägga till din första syssla.",

    // Editor
    "editor.add_title": "Lägg till syssla",
    "editor.edit_title": "Redigera syssla",
    "editor.name": "Namn",
    "editor.description": "Beskrivning (valfritt)",
    "editor.enabled": "Aktiverad",
    "editor.save": "Spara",
    "editor.add": "Lägg till",
    "editor.cancel": "Avbryt",
    "editor.delete": "Ta bort",
    "editor.delete_confirm": "Är du säker på att du vill ta bort denna syssla?",

    // Schedule
    "schedule.title": "Schema",
    "schedule.frequency": "Frekvens",
    "schedule.once": "En gång",
    "schedule.daily": "Dagligen",
    "schedule.weekly": "Veckovis",
    "schedule.monthly": "Månadsvis",
    "schedule.days": "Dagar",
    "schedule.day_of_month": "Dag i månaden",
    "schedule.time": "Tid",

    // Weekdays
    "weekday.monday": "Mån",
    "weekday.tuesday": "Tis",
    "weekday.wednesday": "Ons",
    "weekday.thursday": "Tor",
    "weekday.friday": "Fre",
    "weekday.saturday": "Lör",
    "weekday.sunday": "Sön",

    // Assignment
    "assignment.title": "Tilldelning",
    "assignment.mode": "Läge",
    "assignment.unassigned": "Ej tilldelad",
    "assignment.fixed": "Fast",
    "assignment.rotating": "Roterande",
    "assignment.assignees": "Tilldelade",
    "assignment.add_assignee": "Lägg till person",
    "assignment.rotating_current": "Roterande (nuvarande: {name})",
    "assignment.assigned_to": "Tilldelad: {names}",

    // Target
    "target.title": "Mål",
    "target.todo_list": "Att-göra-lista",
    "target.default": "Standard",

    // Notifications
    "notifications.title": "Notifieringar",
    "notifications.send": "Skicka notifieringar",
    "notifications.targets": "Notifieringsmål",
    "notifications.add_target": "Lägg till mål",

    // Schedule display
    "display.daily_at": "Dagligen kl {time}",
    "display.monthly_at": "Månadsvis dag {day} kl {time}",
    "display.at_time": "Kl {time}",

    // Display mode
    "mode.display": "Visa",
    "mode.manage": "Hantera",
    "display.overdue": "Försenade",
    "display.today": "Idag",
    "display.upcoming": "Kommande",
    "display.done": "Klart",
    "display.all_done": "Alla sysslor klara!",
    "display.no_pending": "Inga väntande sysslor",
    "display.empty_todos": "Inga sysslor schemalagda ännu.",
    "display.streak": "{count} dagars svit",
  },
};

export function localize(
  key: string,
  hass?: HomeAssistant,
  params?: Record<string, string | number>
): string {
  const lang = hass?.language || "en";
  const langTranslations = translations[lang] || translations.en;
  let text = langTranslations[key] || translations.en[key] || key;

  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }

  return text;
}

// Helper to get weekday translation
export function localizeWeekday(day: string, hass?: HomeAssistant): string {
  return localize(`weekday.${day}`, hass);
}
