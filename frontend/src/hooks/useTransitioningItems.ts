import { useStore } from '@store'

const useTransitioningItems = () => {
  const store = useStore()
  return store((state) => state.transitioningItems)
}

export default useTransitioningItems
