import { useMemo } from 'preact/hooks'
import styled from 'styled-components'
import { TodoItem, Chore, ChoreSchedulerCardConfig } from '@types'
import { useLocalize } from '@hooks'
import TodoSection from './TodoSection'
import EmptyState from './EmptyState'
import AllDoneState from './AllDoneState'

interface DisplayModeProps {
  todoItems: TodoItem[]
  chores: Chore[]
  config: ChoreSchedulerCardConfig
}

const DisplayMode = ({ todoItems, chores, config }: DisplayModeProps) => {
  const t = useLocalize()
  const choresById = useMemo(() => new Map(chores.map((c) => [c.id, c])), [chores])

  const pending = todoItems.filter((i) => i.status === 'needs_action')
  const completed = todoItems
    .filter((i) => i.status === 'completed')
    .sort((a, b) => (b.completed_at ?? '').localeCompare(a.completed_at ?? ''))
    .slice(0, 3)

  if (pending.length === 0 && completed.length === 0) {
    return <EmptyState />
  }

  const today = new Date().toISOString().split('T')[0]
  const overdue = pending.filter((i) => i.due && i.due < today)
  const todayItems = pending.filter((i) => !i.due || i.due === today)
  const upcoming = pending.filter((i) => i.due && i.due > today)

  if (pending.length === 0 && completed.length > 0) {
    return (
      <Container>
        <AllDoneState />
        <Spacer />
        {config.show_completed && (
          <TodoSection title={t('display.done')} items={completed} choresById={choresById} sectionClass="completed" />
        )}
      </Container>
    )
  }

  return (
    <Container>
      <PendingSections>
        {overdue.length > 0 && (
          <TodoSection title={t('display.overdue')} items={overdue} choresById={choresById} sectionClass="overdue" />
        )}
        {todayItems.length > 0 && (
          <TodoSection title={t('display.today')} items={todayItems} choresById={choresById} sectionClass="today" />
        )}
        {upcoming.length > 0 && (
          <TodoSection title={t('display.upcoming')} items={upcoming} choresById={choresById} sectionClass="upcoming" />
        )}
      </PendingSections>
      {config.show_completed && completed.length > 0 && (
        <>
          <Spacer />
          <TodoSection title={t('display.done')} items={completed} choresById={choresById} sectionClass="completed" />
        </>
      )}
    </Container>
  )
}

export default DisplayMode

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

const PendingSections = styled.div``

const Spacer = styled.div`
  flex: 1;
  min-height: 16px;
`
