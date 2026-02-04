import styled, { css } from 'styled-components'
import { useHass, useLocalize } from '@hooks'
import HaSwitch from '../../../ha-components/HaSwitch'
import HaCheckbox from '../../../ha-components/HaCheckbox'

interface NotificationSettingsProps {
  enabled: boolean
  onEnabledChange: (enabled: boolean) => void
  notifyTargets: string[]
  onNotifyTargetsChange: (targets: string[]) => void
  persistentNotification: boolean
  onPersistentChange: (persistent: boolean) => void
}

const NotificationSettings = ({
  enabled,
  onEnabledChange,
  notifyTargets,
  onNotifyTargetsChange,
  persistentNotification,
  onPersistentChange,
}: NotificationSettingsProps) => {
  const hass = useHass()
  const t = useLocalize()

  const mobileDevices = getMobileDevices(hass?.services || {})

  const toggleNotifyTarget = (service: string) => {
    if (notifyTargets.includes(service)) {
      onNotifyTargetsChange(notifyTargets.filter((t) => t !== service))
    } else {
      onNotifyTargetsChange([...notifyTargets, service])
    }
  }

  return (
    <Section>
      <SectionHeader onClick={() => onEnabledChange(!enabled)}>
        <div>
          <SectionTitle>{t('notifications.title')}</SectionTitle>
          <SectionDesc>Get reminded when due</SectionDesc>
        </div>
        <HaSwitch
          checked={enabled}
          onChange={(checked) => {
            // stopPropagation is handled by HaSwitch internally
            onEnabledChange(checked)
          }}
        />
      </SectionHeader>

      {enabled && (
        <NotifyOptions>
          <NotifyOption
            $selected={persistentNotification}
            onClick={() => onPersistentChange(!persistentNotification)}
          >
            <ha-icon icon="mdi:bell-badge" />
            <NotifyOptionInfo>
              <NotifyOptionTitle>Persistent notification</NotifyOptionTitle>
              <NotifyOptionDesc>Shows in HA sidebar until dismissed</NotifyOptionDesc>
            </NotifyOptionInfo>
            <HaCheckbox
              checked={persistentNotification}
              onClick={(e: Event) => e.stopPropagation()}
            />
          </NotifyOption>

          {mobileDevices.length > 0 && (
            <NotifyTargets>
              <TargetLabel>Mobile devices</TargetLabel>
              {mobileDevices.map((device) => (
                <NotifyOption
                  key={device.service}
                  $selected={notifyTargets.includes(device.service)}
                  onClick={() => toggleNotifyTarget(device.service)}
                >
                  <ha-icon icon="mdi:cellphone" />
                  <NotifyOptionInfo>
                    <NotifyOptionTitle>{device.name}</NotifyOptionTitle>
                  </NotifyOptionInfo>
                  <HaCheckbox
                    checked={notifyTargets.includes(device.service)}
                    onClick={(e: Event) => e.stopPropagation()}
                  />
                </NotifyOption>
              ))}
            </NotifyTargets>
          )}
        </NotifyOptions>
      )}
    </Section>
  )
}

function getMobileDevices(services: Record<string, Record<string, object>>): { service: string; name: string }[] {
  const notifyDomain = services.notify
  if (!notifyDomain) return []
  return Object.keys(notifyDomain)
    .filter((s) => s.startsWith('mobile_app_'))
    .map((s) => ({
      service: `notify.${s}`,
      name: s.replace('mobile_app_', '').replace(/_/g, ' '),
    }))
}

export default NotificationSettings

const Section = styled.div`
  background: var(--secondary-background-color);
  border-radius: 10px;
  padding: 12px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const SectionTitle = styled.div`
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--primary-text-color);
`

const SectionDesc = styled.div`
  font-size: 0.825rem;
  color: var(--secondary-text-color);
  margin-top: 2px;
`

const NotifyOptions = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NotifyOption = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--card-background-color);
  border-radius: 8px;
  cursor: pointer;

  ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }

  ${(p) => p.$selected && css`
    ha-icon {
      color: var(--primary-color);
    }
  `}
`

const NotifyOptionInfo = styled.div`
  flex: 1;
`

const NotifyOptionTitle = styled.div`
  font-size: 0.925rem;
  color: var(--primary-text-color);
`

const NotifyOptionDesc = styled.div`
  font-size: 0.825rem;
  color: var(--secondary-text-color);
`

const NotifyTargets = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const TargetLabel = styled.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 6px;
`
