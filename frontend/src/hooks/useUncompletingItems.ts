import { useStore } from '@store'

const useUncompletingItems = () => {
  const store = useStore()
  return store((state) => state.uncompletingItems)
}

export default useUncompletingItems
