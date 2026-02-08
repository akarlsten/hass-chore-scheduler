import { create } from 'zustand'
import { createContext, h, ComponentChildren } from 'preact'
import { useContext } from 'preact/hooks'
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

// Subscription message type
interface SubscriptionMessage {
  chores: Chore[]
  items: TodoItem[]
}

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

  // Subscription state (internal)
  _unsubscribe: (() => void) | null
  _subscriptionId: number

  // Setters
  setHass: (hass: HomeAssistant) => void
  setConfig: (config: ChoreSchedulerCardConfig) => void
  setMode: (mode: CardMode) => void

  // Actions
  subscribe: () => void
  unsubscribe: () => void
  loadData: () => Promise<void>
  completeItem: (uid: string) => Promise<void>
  triggerChore: (choreId: string) => Promise<void>
  saveChore: (chore: Partial<Chore>, isNew: boolean) => Promise<void>
  deleteChore: (choreId: string) => Promise<void>
}

export const createChoreSchedulerStore = () =>
  create<ChoreSchedulerStore>((set, get) => ({
    hass: undefined,
    config: undefined,
    chores: [],
    todoItems: [],
    loading: true,
    mode: 'display',
    completingItems: {},
    _unsubscribe: null,
    _subscriptionId: 0,

    setHass: (hass) => {
      const prev = get().hass
      set({ hass })
      // Auto-subscribe when connection first becomes available or changes
      if (hass && (!prev || prev.connection !== hass.connection)) {
        get().subscribe()
      }
    },

    setConfig: (config) => set({ config, mode: config.default_mode || 'display' }),
    setMode: (mode) => set({ mode }),

    subscribe: () => {
      const { hass, _unsubscribe: existing } = get()
      if (!hass) return
      if (existing) existing()

      // Only show loading spinner if we have no data yet
      const hasData = get().chores.length > 0 || get().todoItems.length > 0
      if (!hasData) {
        set({ loading: true })
      }

      // Generation counter to handle async race conditions
      const id = get()._subscriptionId + 1
      set({ _unsubscribe: null, _subscriptionId: id })

      hass.connection.subscribeMessage<SubscriptionMessage>(
        (message) => {
          // Ignore messages from stale subscriptions
          if (get()._subscriptionId !== id) return

          const { completingItems } = get()
          // Merge with optimistic completing state
          const items = (message.items ?? []).map((item) =>
            completingItems[item.uid] ? { ...item, status: 'completed' as const } : item
          )
          set({
            chores: message.chores ?? [],
            todoItems: items,
            loading: false,
          })
        },
        { type: `${DOMAIN}/subscribe` }
      ).then((unsub) => {
        // Only store unsub if this subscription is still current
        if (get()._subscriptionId !== id) {
          unsub()
          return
        }
        set({ _unsubscribe: unsub })
      })
    },

    unsubscribe: () => {
      const { _unsubscribe } = get()
      if (_unsubscribe) {
        _unsubscribe()
        set({ _unsubscribe: null })
      }
    },

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
      const { hass, todoItems, completingItems } = get()
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
        // After animation completes (~800ms), remove from completing set
        // Subscription will push the real update
        setTimeout(() => {
          const { completingItems: current } = get()
          const { [uid]: _, ...rest } = current
          set({ completingItems: rest })
        }, 800)
      }).catch((err) => {
        console.error('[ChoreScheduler] Failed to complete todo:', err)
        // Revert optimistic update on error
        const { completingItems: current } = get()
        const { [uid]: _, ...rest } = current
        set({ completingItems: rest })
      })
    },

    triggerChore: async (choreId) => {
      const { hass } = get()
      if (!hass) return
      try {
        await hass.callService(DOMAIN, 'trigger_chore', { chore_id: choreId })
        // Subscription will push update when coordinator refreshes
      } catch (err) {
        console.error('[ChoreScheduler] Error triggering chore:', err)
      }
    },

    saveChore: async (chore, isNew) => {
      const { hass } = get()
      if (!hass) return
      if (isNew) {
        await hass.callService(DOMAIN, 'add_chore', chore)
      } else {
        await hass.callService(DOMAIN, 'update_chore', {
          chore_id: chore.id,
          ...chore,
        })
      }
      // Subscription will push update when coordinator refreshes
    },

    deleteChore: async (choreId) => {
      const { hass } = get()
      if (!hass) return
      await hass.callService(DOMAIN, 'delete_chore', { chore_id: choreId })
      // Subscription will push update when coordinator refreshes
    },
  }))

export type StoreInstance = ReturnType<typeof createChoreSchedulerStore>

// ── Context / Provider / Hook ─────────────────────────────────────

const StoreContext = createContext<StoreInstance | null>(null)

export function StoreProvider({ store, children }: { store: StoreInstance; children: ComponentChildren }) {
  return h(StoreContext.Provider, { value: store }, children)
}

export const useStore = (): StoreInstance => {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used within StoreProvider')
  return store
}
