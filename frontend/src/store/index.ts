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

  // Animation state flags
  completingItems: Record<string, boolean>   // Phase 1: checkbox pop, stays in pending
  transitioningItems: Record<string, boolean> // Phase 2: exiting pending, hidden from done
  uncompletingItems: Record<string, boolean>  // Uncomplete: exit done upward

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
  uncompleteItem: (uid: string) => Promise<void>
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
    transitioningItems: {},
    uncompletingItems: {},
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

          set({
            chores: message.chores ?? [],
            todoItems: message.items ?? [],
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
      const { hass } = get()
      if (!hass) return
      set({ loading: true })
      try {
        const [choresResp, todosResp] = await Promise.all([
          hass.connection.sendMessagePromise<ListChoresResponse>({ type: `${DOMAIN}/list` }),
          hass.connection.sendMessagePromise<ListTodosResponse>({ type: `${DOMAIN}/todos` }),
        ])
        set({
          chores: choresResp?.chores ?? [],
          todoItems: todosResp?.items ?? [],
        })
      } catch (err) {
        console.warn('[ChoreScheduler] Failed to load data:', err)
        set({ chores: [], todoItems: [] })
      } finally {
        set({ loading: false })
      }
    },

    completeItem: async (uid) => {
      const { hass, completingItems } = get()
      if (!hass || completingItems[uid]) return

      // Phase 1: Checkbox pop — item stays in pending section
      set({ completingItems: { ...completingItems, [uid]: true } })

      // Fire backend call (don't await)
      hass.connection.sendMessagePromise({
        type: `${DOMAIN}/complete_todo`,
        uid,
      }).catch((err) => {
        console.error('[ChoreScheduler] Failed to complete todo:', err)
        const { completingItems: c } = get()
        const { [uid]: _, ...rest } = c
        set({ completingItems: rest })
      })

      // Phase 2 (500ms): Item exits pending, hidden from done via transitioningItems.
      // Status changes to 'completed' so it leaves pending, but transitioningItems
      // keeps it out of done while the pending exit animation plays (~200ms).
      setTimeout(() => {
        const { completingItems: c, transitioningItems: t, todoItems } = get()
        if (!c[uid]) return
        const { [uid]: _, ...restC } = c
        const items = todoItems.map((i) =>
          i.uid === uid && i.status !== 'completed'
            ? { ...i, status: 'completed' as const, completed_at: new Date().toISOString() }
            : i
        )
        set({
          completingItems: restC,
          transitioningItems: { ...t, [uid]: true },
          todoItems: items,
        })

        // Phase 3 (700ms): Clear transitioning flag — item enters done section.
        // Done section updates in one render: new item enters, others layout-shift down,
        // displaced item exits instantly.
        setTimeout(() => {
          const { transitioningItems: t2 } = get()
          if (!t2[uid]) return
          const { [uid]: __, ...restT } = t2
          set({ transitioningItems: restT })
        }, 200)
      }, 500)
    },

    uncompleteItem: async (uid) => {
      const { hass, uncompletingItems } = get()
      if (!hass || uncompletingItems[uid]) return

      // Phase 1: Set flag so TodoItem knows to exit upward.
      // Item stays in done section (status still 'completed') for one render.
      set({ uncompletingItems: { ...uncompletingItems, [uid]: true } })

      // Fire backend call (don't await)
      hass.connection.sendMessagePromise({
        type: `${DOMAIN}/uncomplete_todo`,
        uid,
      }).catch((err) => {
        console.error('[ChoreScheduler] Failed to uncomplete todo:', err)
        const { uncompletingItems: current } = get()
        const { [uid]: _, ...rest } = current
        set({ uncompletingItems: rest })
        get().loadData()
      })

      // Phase 2: After one frame, clear flag + optimistic status change.
      // AnimatePresence captured the component with the flag set, so exit goes up.
      setTimeout(() => {
        const { uncompletingItems: current, todoItems } = get()
        if (!current[uid]) return // Error handler already cleaned up
        const { [uid]: _, ...rest } = current
        const items = todoItems.map((i) =>
          i.uid === uid && i.status !== 'needs_action'
            ? { ...i, status: 'needs_action' as const, completed_at: undefined }
            : i
        )
        set({ uncompletingItems: rest, todoItems: items })
      }, 50)
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
