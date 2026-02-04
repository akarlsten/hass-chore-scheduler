import { useStore } from '@store'

const useCompletingItems = () => {
  return useStore((state) => state.completingItems)
}

export default useCompletingItems
