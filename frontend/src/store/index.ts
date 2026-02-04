import { create } from 'zustand'
import createStoreContext from '@store/createStoreContext'
import {
  HomeAssistant,
  ChoreSchedulerCardConfig,
  Chore,
  TodoItem,
  CardMode,
  ListChoresResponse,
  ListTodosResponse,
} from '@types'

const DOMAIN = 'chore_scheduler'

export interface ChoreSchedulerStore {
  // State from HTMLElement shell
  hass?: HomeAssistant
  config?: ChoreSchedulerCardConfig

  // Application state
  chores: Chore[]
  todoItems: TodoItem[]
  loading: boolean
  mode: CardMode

  // Track items being completed (for optimistic UI)
  completingItems: Record<string, boolean>

  // Setters
  setHass: (hass: HomeAssistant) => void
  setConfig: (config: ChoreSchedulerCardConfig) => void
  setMode: (mode: CardMode) => void

  // Actions
  loadData: () => Promise<void>
  completeItem: (uid: string) => Promise<void>
  triggerChore: (choreId: string) => Promise<void>
  saveChore: (chore: Partial<Chore>, isNew: boolean) => Promise<void>
  deleteChore: (choreId: string) => Promise<void>
}

// Debounce timer for loadData after completions
let reloadTimer: ReturnType<typeof setTimeout> | null = null

const createStore = () =>
  create<ChoreSchedulerStore>((set, get) => ({
    hass: undefined,
    config: undefined,
    chores: [],
    todoItems: [],
    loading: true,
    mode: 'display',
    completingItems: {},

    setHass: (hass) => set({ hass }),
    setConfig: (config) => set({ config, mode: config.default_mode || 'display' }),
    setMode: (mode) => set({ mode }),

    loadData: async () => {
      const { hass, completingItems } = get()
      if (!hass) return
      set({ loading: true })
      try {
        const [choresResp, todosResp] = await Promise.all([
          hass.connection.sendMessagePromise<ListChoresResponse>({ type: `${DOMAIN}/list` }),
          hass.connection.sendMessagePromise<ListTodosResponse>({ type: `${DOMAIN}/todos` }),
        ])
        // Merge with completing items - preserve optimistic state
        const items = (todosResp?.items ?? []).map((item) => {
          if (completingItems[item.uid]) {
            return { ...item, status: 'completed' as const }
          }
          return item
        })
        set({
          chores: choresResp?.chores ?? [],
          todoItems: items,
        })
      } catch (err) {
        console.warn('[ChoreScheduler] Failed to load data:', err)
        set({ chores: [], todoItems: [] })
      } finally {
        set({ loading: false })
      }
    },

    completeItem: async (uid) => {
      const { hass, todoItems, completingItems, loadData } = get()
      if (!hass) return
      if (completingItems[uid]) return // Already completing

      // Optimistic update FIRST - before any async work
      set({
        completingItems: { ...completingItems, [uid]: true },
        todoItems: todoItems.map((i) =>
          i.uid === uid
            ? { ...i, status: 'completed' as const, completed_at: new Date().toISOString() }
            : i
        ),
      })

      // Fire backend call (don't await - let animation proceed)
      hass.connection.sendMessagePromise({
        type: `${DOMAIN}/complete_todo`,
        uid,
      }).then(() => {
        // After animation completes (~800ms), remove from completing set and reload
        setTimeout(() => {
          const { completingItems: current, loadData: reload } = get()
          const { [uid]: _, ...rest } = current
          set({ completingItems: rest })

          // Debounce reload - wait for rapid completions to settle
          if (reloadTimer) clearTimeout(reloadTimer)
          reloadTimer = setTimeout(() => {
            reloadTimer = null
            reload()
          }, 500)
        }, 800)
      }).catch((err) => {
        console.error('[ChoreScheduler] Failed to complete todo:', err)
        // Revert optimistic update on error
        const { completingItems: current, loadData: reload } = get()
        const { [uid]: _, ...rest } = current
        set({ completingItems: rest })
        reload()
      })
    },

    triggerChore: async (choreId) => {
      const { hass, loadData } = get()
      if (!hass) return
      try {
        await hass.callService(DOMAIN, 'trigger_chore', { chore_id: choreId })
        setTimeout(() => loadData(), 500)
      } catch (err) {
        console.error('[ChoreScheduler] Error triggering chore:', err)
      }
    },

    saveChore: async (chore, isNew) => {
      const { hass, loadData } = get()
      if (!hass) return
      if (isNew) {
        await hass.callService(DOMAIN, 'add_chore', chore)
      } else {
        await hass.callService(DOMAIN, 'update_chore', {
          chore_id: chore.id,
          ...chore,
        })
      }
      await loadData()
    },

    deleteChore: async (choreId) => {
      const { hass, loadData } = get()
      if (!hass) return
      await hass.callService(DOMAIN, 'delete_chore', { chore_id: choreId })
      setTimeout(() => loadData(), 500)
    },
  }))

const [StoreProvider, useStore] = createStoreContext<ChoreSchedulerStore>(createStore)

export { StoreProvider, useStore }
