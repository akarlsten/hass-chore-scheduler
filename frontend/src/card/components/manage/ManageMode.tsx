import styled from 'styled-components'
import { Chore, TodoItem, ChoreSchedulerCardConfig } from '@types'
import { useLocalize } from '@hooks'
import ChoreItem from './ChoreItem'

interface ManageModeProps {
  chores: Chore[]
  todoItems: TodoItem[]
  config: ChoreSchedulerCardConfig
  onEditChore: (chore: Chore) => void
}

const ManageMode = ({ chores, todoItems, config, onEditChore }: ManageModeProps) => {
  const t = useLocalize()

  const filteredChores = config.show_disabled
    ? chores
    : chores.filter((c) => c.enabled)

  if (filteredChores.length === 0) {
    return (
      <EmptyState>
        <ha-icon icon="mdi:broom" />
        <p>{t('card.empty_title')}</p>
        <p>{t('card.empty_subtitle')}</p>
      </EmptyState>
    )
  }

  return (
    <ChoreList>
      {filteredChores.map((chore) => (
        <ChoreItem
          key={chore.id}
          chore={chore}
          todoItems={todoItems}
          onEdit={onEditChore}
        />
      ))}
    </ChoreList>
  )
}

export default ManageMode

const ChoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--secondary-text-color);

  ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`
