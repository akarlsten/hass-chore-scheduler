import { useStore } from '@store'

const useConfig = () => {
  const store = useStore()
  return store((state) => state.config)
}

export default useConfig
