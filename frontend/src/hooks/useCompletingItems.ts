import { useStore } from '@store'

const useCompletingItems = () => {
  const store = useStore()
  return store((state) => state.completingItems)
}

export default useCompletingItems
