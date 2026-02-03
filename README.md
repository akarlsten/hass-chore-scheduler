# Chore Scheduler for Home Assistant

A Home Assistant custom integration for managing household chores with scheduled reminders, rotating assignments, and todo list integration.

## Features

- **Scheduled chores** - Daily, weekly, or monthly recurring tasks
- **Person assignment** - Assign chores to household members with optional rotation
- **Todo integration** - Creates items in your existing HA todo lists
- **Notifications** - Optional reminders when chores are due
- **Lovelace card** - Custom card with intuitive UI for managing chores

## Installation

### HACS (recommended)

1. Add this repository as a custom repository in HACS
2. Search for "Chore Scheduler" and install
3. Restart Home Assistant

### Manual installation

1. Copy the `custom_components/chore_scheduler` folder to your Home Assistant `custom_components` directory
2. Restart Home Assistant

## Configuration

1. Go to **Settings** → **Devices & Services** → **Add Integration**
2. Search for "Chore Scheduler"
3. Select a default todo list for chore items

## Lovelace card

Add the card to your dashboard:

```yaml
type: custom:chore-scheduler-card
title: Household chores
show_disabled: true
show_next_due: true
```

### Card options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Chore Scheduler" | Card title |
| `show_disabled` | boolean | true | Show disabled chores |
| `show_next_due` | boolean | true | Show next due date |

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

Manually trigger a chore (creates todo item immediately).

```yaml
service: chore_scheduler.trigger_chore
data:
  chore_id: "abc123"
```

## Schedule types

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

## Development

### Prerequisites

- Node.js 18+
- npm

### Frontend development

```bash
# Install dependencies
cd frontend
npm install

# Build the card
npm run build

# Copy to custom_components
cp dist/chore-scheduler-card.js ../custom_components/chore_scheduler/www/
```

### Deploying to a local HA instance

```bash
# Copy the entire integration (replace with your HA server details)
scp -P 5555 -r custom_components/chore_scheduler root@192.168.1.229:/root/homeassistant/custom_components/

# Restart Home Assistant to load changes
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
│       ├── coordinator.py       # Data coordinator
│       ├── sensor.py            # Sensor entities
│       ├── services.py          # Service handlers
│       ├── services.yaml        # Service definitions
│       ├── storage.py           # Persistent storage
│       ├── websocket_api.py     # WebSocket API
│       ├── strings.json         # Base translations
│       ├── translations/        # Localized strings
│       │   ├── en.json
│       │   └── sv.json
│       └── www/
│           └── chore-scheduler-card.js
└── frontend/
    ├── src/
    │   ├── chore-scheduler-card.ts  # Main card component
    │   ├── chore-editor.ts          # Chore editor dialog
    │   ├── styles.ts                # CSS styles
    │   ├── localize.ts              # Frontend translations
    │   └── types.ts                 # TypeScript types
    ├── package.json
    ├── rollup.config.js
    └── tsconfig.json
```

## Translations

The integration supports multiple languages:

- English (en)
- Swedish (sv)

To add a new language:
1. Add a translation file in `custom_components/chore_scheduler/translations/`
2. Add frontend translations in `frontend/src/localize.ts`

## License

MIT
