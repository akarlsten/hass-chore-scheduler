import { useEffect } from 'preact/hooks'
import { HomeAssistant, ChoreSchedulerCardConfig } from '@types'
import { StoreProvider, useStore } from '@store'
import ChoreSchedulerApp from '@components/ChoreSchedulerApp'

interface StoreProps {
  hass: HomeAssistant
  config: ChoreSchedulerCardConfig
}

const StoreWrapper = ({ hass, config }: StoreProps) => {
  const store = useStore()
  const setHass = store((s) => s.setHass)
  const setConfig = store((s) => s.setConfig)
  const subscribe = store((s) => s.subscribe)
  const unsubscribe = store((s) => s.unsubscribe)
  const hasHass = store((s) => !!s.hass)

  useEffect(() => {
    setHass(hass)
  }, [hass])

  useEffect(() => {
    setConfig(config)
  }, [config])

  useEffect(() => {
    if (hasHass) {
      subscribe()
      return () => unsubscribe()
    }
  }, [hasHass])

  return <ChoreSchedulerApp />
}

const StoreProviderWrapper = ({ hass, config }: StoreProps) => (
  <StoreProvider>
    <StoreWrapper hass={hass} config={config} />
  </StoreProvider>
)

export default StoreProviderWrapper
