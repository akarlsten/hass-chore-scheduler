# Chore Scheduler - Claude Instructions

A Home Assistant custom integration for managing household chore schedules with a custom Lovelace card.

## Project Structure

```
├── custom_components/chore_scheduler/   # HA integration (Python)
│   ├── __init__.py          # Setup, services, frontend registration
│   ├── coordinator.py       # Data update coordinator
│   ├── store.py             # Persistent storage for chores
│   ├── websocket_api.py     # WebSocket handlers for frontend
│   ├── todo.py              # HA Todo entity integration
│   ├── sensor.py            # Sensor entities
│   ├── const.py             # Constants and attribute names
│   └── www/                  # Built frontend JS (deployed here)
│
├── frontend/                 # Preact frontend
│   ├── src/
│   │   ├── index.tsx        # HTMLElement shells for HA custom elements
│   │   ├── card/            # Main card components
│   │   ├── config-editor/   # Card configuration UI
│   │   ├── hooks/           # Custom hooks (useChores, useLocalize, etc.)
│   │   ├── store/           # Zustand store
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utilities (API calls, localization)
│   ├── webpack.config.cjs
│   └── tsconfig.json
│
├── deploy.sh                 # Full deploy (rebuild + restart HA)
└── deploy-frontend.sh        # Frontend-only deploy (no HA restart)
```

## Tech Stack

- **Frontend**: Preact + Zustand + styled-components
- **Build**: Webpack with Babel (transpiles to ES2017 for Nest Hub cast compatibility)
- **Backend**: Home Assistant custom integration (Python)

## Building & Deploying

```bash
# Frontend-only changes (fast iteration)
./deploy-frontend.sh

# Full deploy (Python changes, requires HA restart)
./deploy.sh

# Dev server with mock data
cd frontend && npm run dev
# Opens localhost:8080 with mock hass object
```

## Key Architectural Patterns

### HTMLElement Shell Pattern
The frontend uses custom elements that wrap Preact rendering. HA sets `hass` and calls `setConfig()` on these elements, which trigger re-renders of the Preact tree.

```typescript
// index.tsx
class ChoreSchedulerCardElement extends HTMLElement {
  set hass(hass: HomeAssistant) {
    this._hass = hass
    this._render()
  }

  setConfig(config: LovelaceCardConfig) {
    this._config = config
    this._render()
  }
}
```

### styled-components in Light DOM
We use `StyleSheetManager target={this}` to inject styles into the light DOM (no Shadow DOM). This is required for HA compatibility.

### Zustand Store with Props Sync
The `StoreProviderWrapper` syncs HA props into Zustand via useEffect:

```typescript
// card/index.tsx - Two-layer pattern
const StoreWrapper = ({ hass, config }) => {
  useEffect(() => setHass(hass), [hass])
  useEffect(() => setConfig(config), [config])
  // ...
}
```

### HA Component Wrappers
Preact can't set properties on custom elements natively. Use ref-based wrappers:

```typescript
// See components like HaSwitch, HaSelect, HaCheckbox
const ref = useRef<HTMLElement>(null)
useEffect(() => {
  if (ref.current) ref.current.checked = value
}, [value])
```

## API Communication

### WebSocket (read operations)
```typescript
hass.connection.sendMessagePromise({
  type: 'chore_scheduler/list'  // or 'chore_scheduler/todos'
})
```

### Service Calls (write operations)
```typescript
hass.callService('chore_scheduler', 'add_chore', { name, schedule, ... })
hass.callService('chore_scheduler', 'update_chore', { chore_id, ... })
hass.callService('chore_scheduler', 'delete_chore', { chore_id })
hass.callService('chore_scheduler', 'trigger_chore', { chore_id })
hass.callService('todo', 'complete_item', { entity_id, item })
```

## Common Tasks

### Adding a new card config option
1. Add to `ChoreSchedulerCardConfig` type in `frontend/src/types/index.ts`
2. Add default in `setConfig()` in `frontend/src/index.tsx`
3. Add to `getStubConfig()` in same file
4. Add UI control in `frontend/src/config-editor/CardEditor.tsx`

### Adding a new chore field
1. Add to Python schema in `custom_components/chore_scheduler/__init__.py`
2. Add to store in `store.py`
3. Add to `Chore` type in `frontend/src/types/index.ts`
4. Update editor UI in `frontend/src/card/components/editor/`

### Adding localization strings
Edit `frontend/src/utils/localize.ts` - add keys to the `translations` object.

## Gotchas

- **Don't call hooks inside JSX** - destructure at component top level
- **transpileOnly: true** in ts-loader - styled-components v6 types expect React's ReactNode, Preact uses VNode. Runtime works fine.
- **Cast compatibility** - JS is copied to both `/custom_components/.../www/` AND `/www/` folder. The `/local/` path is needed for cast receivers.
- **Custom element registration guards** - Always check `customElements.get()` before `define()` to prevent double registration errors.
- **connectedCallback for styles** - Set element styles in `connectedCallback()`, not constructor, or HA throws "result must not have attributes" error.

## Path Aliases

Configured in both `tsconfig.json` and `webpack.config.cjs`:
- `@components` → `src/card/components`
- `@hooks` → `src/hooks`
- `@store` → `src/store`
- `@types` → `src/types`
- `@utils` → `src/utils`

## Testing on Cast/Nest Hub

The card works on Google Nest Hub via HA Cast. Requirements:
- Nabu Casa subscription (for HTTPS)
- JS transpiled to ES2017 (older Chromium on Nest Hub)
- CORS configured in HA for `https://cast.home-assistant.io`
- JS available at `/local/chore-scheduler-card.js` (add as manual resource in dashboard)
