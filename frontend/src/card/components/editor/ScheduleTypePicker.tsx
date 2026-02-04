import styled, { css } from 'styled-components'
import { ScheduleType } from '@types'
import { useLocalize } from '@hooks'

interface ScheduleTypePickerProps {
  scheduleType: ScheduleType
  onSelect: (type: ScheduleType) => void
}

const SCHEDULE_TYPES: { type: ScheduleType; icon: string; labelKey: string }[] = [
  { type: 'once', icon: 'mdi:numeric-1-circle', labelKey: 'schedule.once' },
  { type: 'daily', icon: 'mdi:calendar-today', labelKey: 'schedule.daily' },
  { type: 'weekly', icon: 'mdi:calendar-week', labelKey: 'schedule.weekly' },
  { type: 'monthly', icon: 'mdi:calendar-month', labelKey: 'schedule.monthly' },
]

const ScheduleTypePicker = ({ scheduleType, onSelect }: ScheduleTypePickerProps) => {
  const t = useLocalize()

  return (
    <Grid>
      {SCHEDULE_TYPES.map(({ type, icon, labelKey }) => (
        <Chip key={type} $selected={scheduleType === type} onClick={() => onSelect(type)}>
          <ha-icon icon={icon} />
          <span>{t(labelKey)}</span>
        </Chip>
      ))}
    </Grid>
  )
}

export default ScheduleTypePicker

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`

const Chip = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 12px;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;

  &:hover {
    border-color: var(--primary-color);
  }

  ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  ${(p) => p.$selected && css`
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);

    ha-icon {
      color: var(--primary-color);
    }

    span {
      color: var(--primary-color);
    }
  `}
`
