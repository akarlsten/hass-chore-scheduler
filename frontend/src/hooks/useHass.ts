import { useStore } from '@store'

const useHass = () => {
  const store = useStore()
  return store(({ hass }) => hass)
}

export default useHass
