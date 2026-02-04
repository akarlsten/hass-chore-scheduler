import { ComponentChildren, type FunctionComponent, createContext } from 'preact'
import type { StoreApi, UseBoundStore } from 'zustand'
import { useContext, useState } from 'preact/hooks'

function createStoreContext<TState>(createStore: () => UseBoundStore<StoreApi<TState>>) {
  const StoreContext = createContext<UseBoundStore<StoreApi<TState>>>(createStore())

  const StoreProvider: FunctionComponent = ({
    children,
  }: {
    children: ComponentChildren
  }) => {
    const [useStore] = useState(createStore)
    return <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
  }

  const useStore = () => {
    const useZustandStore = useContext(StoreContext)
    return useZustandStore
  }

  return [StoreProvider, useStore] as const
}

export default createStoreContext
