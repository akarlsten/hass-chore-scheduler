import { useEffect } from 'preact/hooks'
import { HomeAssistant, ChoreSchedulerCardConfig } from '@types'
import { StoreProvider, StoreInstance, useStore } from '@store'
import ChoreSchedulerApp from '@components/ChoreSchedulerApp'

interface StoreProps {
  hass: HomeAssistant
  config: ChoreSchedulerCardConfig
  store: StoreInstance
}

const StoreWrapper = ({ hass, config }: Omit<StoreProps, 'store'>) => {
  const store = useStore()
  const setHass = store((s) => s.setHass)
  const setConfig = store((s) => s.setConfig)

  useEffect(() => {
    setHass(hass)
  }, [hass])

  useEffect(() => {
    setConfig(config)
  }, [config])

  return <ChoreSchedulerApp />
}

const StoreProviderWrapper = ({ hass, config, store }: StoreProps) => (
  <StoreProvider store={store}>
    <StoreWrapper hass={hass} config={config} />
  </StoreProvider>
)

export default StoreProviderWrapper
