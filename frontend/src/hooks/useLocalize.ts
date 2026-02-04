import { useCallback } from 'preact/hooks'
import useHass from './useHass'
import { localize } from '@utils/localize'

const useLocalize = () => {
  const hass = useHass()
  return useCallback(
    (key: string, params?: Record<string, string | number>) =>
      localize(key, hass, params),
    [hass?.language]
  )
}

export default useLocalize
