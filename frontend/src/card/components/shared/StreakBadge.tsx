import styled from 'styled-components'
import { useLocalize } from '@hooks'

interface StreakBadgeProps {
  streak: number
}

const StreakBadge = ({ streak }: StreakBadgeProps) => {
  const t = useLocalize()

  if (streak <= 1) return null

  return (
    <Badge title={t('display.streak', { count: streak })}>
      <ha-icon icon="mdi:fire" />{streak}
    </Badge>
  )
}

export default StreakBadge

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--warning-color, #ff9800);
  white-space: nowrap;

  ha-icon {
    --mdc-icon-size: 17px;
  }
`
