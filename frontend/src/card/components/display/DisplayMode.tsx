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
      <>
        <AllDoneState />
        {config.show_completed && (
          <TodoSection title={t('display.done')} items={completed} chores={chores} sectionClass="completed" />
        )}
      </>
    )
  }

  return (
    <>
      {overdue.length > 0 && (
        <TodoSection title={t('display.overdue')} items={overdue} chores={chores} sectionClass="overdue" />
      )}
      {todayItems.length > 0 && (
        <TodoSection title={t('display.today')} items={todayItems} chores={chores} sectionClass="today" />
      )}
      {upcoming.length > 0 && (
        <TodoSection title={t('display.upcoming')} items={upcoming} chores={chores} sectionClass="upcoming" />
      )}
      {config.show_completed && completed.length > 0 && (
        <TodoSection title={t('display.done')} items={completed} chores={chores} sectionClass="completed" />
      )}
    </>
  )
}

export default DisplayMode
