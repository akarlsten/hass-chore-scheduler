import styled from 'styled-components'
import { Chore, TodoItem } from '@types'
import { useHass } from '@hooks'
import { getChoreIcon } from '@utils/chore-icons'
import { formatSchedule } from '@utils/format-schedule'
import AssigneeAvatar from '../shared/AssigneeAvatar'
import SchedulePill from '../shared/SchedulePill'
import StreakBadge from '../shared/StreakBadge'

interface ChoreItemProps {
  chore: Chore
  todoItems: TodoItem[]
  onEdit: (chore: Chore) => void
}

const ChoreItem = ({ chore, todoItems, onEdit }: ChoreItemProps) => {
  const hass = useHass()
  const icon = getChoreIcon(chore.name)
  const scheduleText = formatSchedule(chore.schedule, hass)
  const assigneeNames = getAssigneeNames(chore)
  const stats = getChoreStats(chore.id, todoItems)

  return (
    <Row $disabled={!chore.enabled} onClick={() => onEdit(chore)}>
      <ChoreIcon><ha-icon icon={icon} /></ChoreIcon>
      <ChoreInfo>
        <ChoreName>{chore.name}</ChoreName>
        <ChoreMeta>
          <SchedulePill type={chore.schedule.type} text={scheduleText} />
          {assigneeNames.map((name) => (
            <AssigneeAvatar key={name} name={name} />
          ))}
          {stats && <StreakBadge streak={stats.streak} />}
        </ChoreMeta>
      </ChoreInfo>
      <ChoreIcon style={{ marginRight: 0, marginLeft: 8 }}>
        <ha-icon icon="mdi:chevron-right" />
      </ChoreIcon>
    </Row>
  )
}

function getAssigneeNames(chore: Chore): string[] {
  if (chore.assignment.mode === 'unassigned' || !chore.assignment.assignees?.length) {
    return []
  }
  return chore.assignment.assignees
    .filter((a): a is string => a != null)
    .map((a) => a.split('.').pop()?.replace(/_/g, ' ') || a)
}

function getChoreStats(choreId: string, todoItems: TodoItem[]) {
  const item = todoItems.find((i) => i.chore_id === choreId)
  return item?.completion_stats
}

export default ChoreItem

const Row = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--card-background-color, var(--ha-card-background));
  border: 1px solid var(--divider-color);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--secondary-background-color);
  }

  ${(p) => p.$disabled && `opacity: 0.5;`}
`

const ChoreIcon = styled.div`
  margin-right: 12px;
  ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }
`

const ChoreInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ChoreName = styled.div`
  font-weight: 500;
  color: var(--primary-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ChoreMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
`

