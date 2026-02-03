# Plan: Home Assistant Chore Scheduler

## Overview
Build a custom Home Assistant integration + Lovelace card that lets household members create recurring chore schedules, automatically generates todo items when due, sends push notifications, and handles smart deduplication.

## Project Location
`/home/addec/dev/hass-chore-scheduler/`

---

## Architecture

### Backend: Custom Integration (`custom_components/chore_scheduler/`)
- **Python-based** custom component
- Stores chore definitions with schedules in HA's `.storage/`
- Uses HA's built-in `todo` integration to create checklist items
- Uses HA's `notify` platform for push notifications to mobile apps
- Handles deduplication (won't create duplicate todos if one already exists)
- HACS-installable

### Frontend: Custom Lovelace Card (`hass-chore-scheduler-card/`)
- **TypeScript/Lit** based
- UI for creating/editing/deleting chore schedules
- Shows upcoming chores and current todo status
- Separate HACS repository (or combined)

---

## Data Model

### Chore Definition
```python
{
    "id": "uuid",
    "name": "Vacuum the floors",
    "description": "Vacuum all rooms including under furniture",
    "schedule": {
        "type": "weekly",  # daily, weekly, monthly, custom
        "days": ["sunday"],  # for weekly
        "time": "10:00",
        "interval": 1  # every 1 week
    },
    "assignment": {
        "mode": "rotating",  # fixed, rotating, unassigned
        "assignees": ["person.adam", "person.partner"],  # HA person entities
        "current_index": 0  # for rotation tracking
    },
    "target_todo_list": "todo.household_chores",  # or per-person list
    "notifications": {
        "enabled": true,
        "remind_before": 60,  # minutes before due time
        "notify_targets": ["notify.mobile_app_adams_phone"]
    },
    "enabled": true
}
```

---

## Components to Build

### 1. Integration Core (`__init__.py`)
- Register the integration domain
- Set up storage coordinator for chore definitions
- Initialize the scheduler that checks for due chores

### 2. Config Flow (`config_flow.py`)
- Initial setup (select default todo list)
- Options flow for global settings

### 3. Coordinator (`coordinator.py`)
- `DataUpdateCoordinator` that runs periodically (every minute)
- Checks which chores are due
- Creates todo items via `todo.add_item` service
- Handles deduplication by checking existing items first
- Rotates assignments when needed
- Sends notifications

### 4. Services (`services.yaml` + handlers)
- `chore_scheduler.add_chore` - Create a new chore
- `chore_scheduler.update_chore` - Modify a chore
- `chore_scheduler.delete_chore` - Remove a chore
- `chore_scheduler.trigger_chore` - Manually trigger a chore (add to todo now)
- `chore_scheduler.list_chores` - Get all chores (for frontend)

### 5. Sensors (`sensor.py`)
- `sensor.chore_scheduler_next_chore` - Next upcoming chore
- `sensor.chore_scheduler_overdue_count` - Number of overdue items

### 6. WebSocket API (`websocket_api.py`)
- Real-time updates for the frontend card
- Subscribe to chore changes

### 7. Lovelace Card (`hass-chore-scheduler-card/`)
- Main management UI
- Create/edit chores with schedule picker
- View upcoming chores
- See current todo list status
- Assign household members

---

## File Structure

```
hass-chore-scheduler/
├── custom_components/
│   └── chore_scheduler/
│       ├── __init__.py          # Integration setup
│       ├── manifest.json        # Integration metadata
│       ├── config_flow.py       # UI configuration
│       ├── coordinator.py       # Schedule checking logic
│       ├── const.py             # Constants
│       ├── services.yaml        # Service definitions
│       ├── sensor.py            # Sensor entities
│       ├── websocket_api.py     # Frontend communication
│       ├── store.py             # Data persistence
│       └── strings.json         # Translations
├── hacs.json                    # HACS metadata
├── README.md
└── frontend/                    # Lovelace card source
    ├── src/
    │   ├── chore-scheduler-card.ts
    │   ├── chore-editor.ts
    │   ├── schedule-picker.ts
    │   └── styles.ts
    ├── package.json
    ├── rollup.config.js
    └── tsconfig.json
```

---

## Implementation Phases

### Phase 1: Backend Foundation
1. Set up project structure with manifest.json
2. Implement basic `__init__.py` with storage
3. Create config flow for initial setup
4. Build the data store for chore definitions

### Phase 2: Core Scheduling Logic
1. Implement the coordinator with schedule checking
2. Add deduplication logic (check existing todos before creating)
3. Implement assignment rotation
4. Add services for CRUD operations

### Phase 3: Notifications & Sensors
1. Add notification sending when chores are due
2. Create sensor entities for dashboard display
3. Add WebSocket API for real-time updates

### Phase 4: Lovelace Card
1. Set up TypeScript/Lit project with rollup
2. Build the main card component
3. Create chore editor dialog
4. Add schedule picker UI
5. Style with HA design patterns

### Phase 5: Local HA Testing
1. Deploy to local Home Assistant instance
2. Configure the integration via UI
3. Test chore creation/editing via card
4. Verify schedule triggering and todo creation
5. Test notifications to mobile app
6. Fix any bugs discovered during testing

### Phase 6: Polish & Public Release (Optional)
1. Add translations
2. Write documentation
3. Set up HACS repository structure
4. Test installation via HACS

---

## Key Technical Details

### Schedule Checking Logic
```python
async def _async_check_schedules(self):
    now = dt_util.now()
    for chore in self.chores:
        if self._is_due(chore, now):
            if not await self._todo_exists(chore):
                await self._create_todo(chore)
                await self._send_notification(chore)
                self._rotate_assignment(chore)
```

### Deduplication
- Before creating a todo, call `todo.get_items` on the target list
- Check if an item with the same summary exists and is not completed
- If exists, skip creation (or optionally update the due date)

### Notifications
```python
await self.hass.services.async_call(
    "notify",
    chore["notifications"]["notify_targets"][0].split(".")[1],
    {
        "title": "Chore Reminder",
        "message": f"Time to: {chore['name']}",
        "data": {"tag": f"chore_{chore['id']}"}  # Prevents duplicate notifications
    }
)
```

---

## Verification Plan

1. **Unit tests**: Test schedule calculation logic
2. **Integration test**: Install in HA dev environment
3. **Manual testing**:
   - Create a chore with daily schedule
   - Verify todo item appears at scheduled time
   - Verify notification received on phone
   - Check that duplicates are prevented
   - Test rotation between household members
4. **HACS test**: Install via custom repository URL

---

## Dependencies

- Home Assistant 2024.1+ (for modern todo integration)
- A todo integration configured (Local To-do, Todoist, etc.)
- HA Companion app for push notifications

---

## Questions Resolved
- ✅ Shared vs per-person lists: **Both** - configurable per chore
- ✅ Assignment mode: **All options** - rotating, fixed, or unassigned per chore

---

## Next Steps
Ready to begin implementation starting with Phase 1: Backend Foundation.
