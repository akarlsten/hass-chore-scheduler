import { useStore } from '@store'

const useChores = () => {
  const store = useStore()
  return store((s) => s.chores)
}

export default useChores
