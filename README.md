# Chore Scheduler for Home Assistant

A Home Assistant custom integration for managing household chores with scheduled reminders, rotating assignments, completion tracking, and a polished Lovelace card.

## Features

- **Scheduled chores** - Daily, weekly, monthly, or one-time tasks
- **Person assignment** - Assign chores to household members with optional rotation
- **Built-in todo list** - The integration manages its own `todo.chore_scheduler_chores` entity -- no external todo list needed
- **Display mode** - Dashboard view with pending chores grouped by Overdue / Today / Upcoming, with check-off support
- **Completion tracking** - Streak counting and completion history per chore
- **Notifications** - Optional reminders via any HA notify service or persistent notifications
- **Auto icons** - Chore icons auto-detected from name keywords (English and Swedish, with fuzzy matching)
- **Completion animations** - Checkmark pop animation and haptic feedback when checking off chores
- **Bilingual** - Full English and Swedish UI translations
- **Lovelace card** - Custom card with manage and display modes

## Installation

### HACS (recommended)

1. Add this repository as a custom repository in HACS
2. Search for "Chore Scheduler" and install
3. Restart Home Assistant

### Manual installation

1. Copy the `custom_components/chore_scheduler` folder to your Home Assistant `custom_components` directory
2. Restart Home Assistant

## Configuration

1. Go to **Settings** > **Devices & Services** > **Add Integration**
2. Search for "Chore Scheduler"
3. Confirm setup

The integration automatically creates a `todo.chore_scheduler_chores` entity that manages all chore todo items internally.

## Lovelace card

Add the card to your dashboard:

```yaml
type: custom:chore-scheduler-card
title: Household chores
```

### Card options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `"Chore Scheduler"` | Card title |
| `show_disabled` | boolean | `true` | Show disabled chores in manage mode |
| `show_next_due` | boolean | `true` | Show next due date in manage mode |
| `default_mode` | string | `"display"` | Default card mode: `"display"` or `"manage"` |
| `show_completed` | boolean | `false` | Show completed items in display mode |
| `enable_animations` | boolean | `true` | Enable completion animations and haptics |

### Card modes

- **Display mode** - Shows pending todo items grouped by urgency (Overdue, Today, Upcoming). Tap a checkbox to mark a chore as done. Shows a celebration message when all chores are complete.
- **Manage mode** - Create, edit, delete, enable/disable chores. Shows schedule pills, assignee avatars, and streak badges.

Toggle between modes using the button in the card header.

## Services

### `chore_scheduler.add_chore`

Create a new chore.

```yaml
service: chore_scheduler.add_chore
data:
  name: "Vacuum living room"
  description: "Vacuum and mop the living room floor"
  schedule:
    type: weekly
    days:
      - monday
      - thursday
    time: "10:00"
  assignment:
    mode: rotating
    assignees:
      - person.alice
      - person.bob
  notifications:
    enabled: true
    notify_targets:
      - notify.mobile_app_phone
```

### `chore_scheduler.update_chore`

Update an existing chore.

```yaml
service: chore_scheduler.update_chore
data:
  chore_id: "abc123"
  name: "Updated name"
  enabled: false
```

### `chore_scheduler.delete_chore`

Delete a chore.

```yaml
service: chore_scheduler.delete_chore
data:
  chore_id: "abc123"
```

### `chore_scheduler.trigger_chore`

Manually trigger a chore (creates a todo item immediately).

```yaml
service: chore_scheduler.trigger_chore
data:
  chore_id: "abc123"
```

### `chore_scheduler.list_chores`

Returns all configured chores.

## Schedule types

### Once

```yaml
schedule:
  type: once
  date: "2026-03-15"
  time: "09:00"
```

### Daily

```yaml
schedule:
  type: daily
  time: "09:00"
```

### Weekly

```yaml
schedule:
  type: weekly
  days:
    - monday
    - wednesday
    - friday
  time: "10:00"
```

### Monthly

```yaml
schedule:
  type: monthly
  day_of_month: 15
  time: "10:00"
```

## Assignment modes

- **Unassigned** - No specific person assigned
- **Fixed** - Always assigned to the same person(s)
- **Rotating** - Cycles through assignees each time the chore triggers

## Todo entity

The integration creates and manages its own todo list entity (`todo.chore_scheduler_chores`). This entity:

- Appears in Home Assistant's built-in todo UI and companion apps
- Supports create, update, delete, due dates, and descriptions
- Tracks completions -- when you check off an item (from the card, companion app, or automations), the integration records the completion and updates streak counters
- Can be used in automations like any other todo entity

## Auto icons

Chore icons are automatically detected from the chore name using keyword matching. Both English and Swedish keywords are supported with fuzzy matching (Swedish diacritics like a/a/o are normalized).

Examples:
- "Vacuum the floors" or "Dammsug golven" -> `mdi:robot-vacuum`
- "Do the dishes" or "Diska" -> `mdi:dishwasher`
- "Walk the dog" or "Promenad med hunden" -> `mdi:walk`
- "Take out trash" or "Kasta soporna" -> `mdi:trash-can`

If no keyword matches, a default checkmark icon is used.

## Development

### Prerequisites

- Node.js 18+
- npm

### Frontend development

```bash
cd frontend
npm install
npm run build
cp dist/chore-scheduler-card.js ../custom_components/chore_scheduler/www/
```

### Deploying to a local HA instance

```bash
scp -r custom_components/chore_scheduler user@homeassistant:/config/custom_components/
```

After deploying, do a hard refresh (Ctrl+Shift+R) in your browser to clear cached JavaScript.

### Project structure

```
hass-chore-scheduler/
├── custom_components/
│   └── chore_scheduler/
│       ├── __init__.py          # Integration setup
│       ├── manifest.json        # Integration metadata
│       ├── config_flow.py       # UI configuration
│       ├── const.py             # Constants
│       ├── coordinator.py       # Schedule checking & notifications
│       ├── sensor.py            # Sensor entities
│       ├── store.py             # Persistent storage (chores, todos, stats)
│       ├── todo.py              # TodoListEntity for chore items
│       ├── websocket_api.py     # WebSocket API for frontend
│       ├── services.yaml        # Service definitions
│       ├── strings.json         # Base translations
│       ├── translations/
│       │   ├── en.json
│       │   └── sv.json
│       └── www/
│           └── chore-scheduler-card.js
└── frontend/
    ├── src/
    │   ├── chore-scheduler-card.ts       # Main card component
    │   ├── chore-scheduler-card-editor.ts # Card editor
    │   ├── chore-editor.ts               # Chore editor dialog
    │   ├── chore-icons.ts                # Auto icon detection (EN/SV)
    │   ├── animations.ts                 # Completion animations
    │   ├── styles.ts                     # CSS styles
    │   ├── localize.ts                   # Frontend translations (EN/SV)
    │   └── types.ts                      # TypeScript types
    ├── package.json
    ├── rollup.config.js
    └── tsconfig.json
```

## Translations

The integration supports:

- English (en)
- Swedish (sv)

To add a new language:
1. Add a translation file in `custom_components/chore_scheduler/translations/`
2. Add frontend translations in `frontend/src/localize.ts`
3. Add keywords to `frontend/src/chore-icons.ts` for icon detection

## License

MIT
