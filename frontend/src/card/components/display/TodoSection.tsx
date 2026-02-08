import { AnimatePresence } from 'framer-motion'
import styled, { css } from 'styled-components'
import { TodoItem as TodoItemType, Chore } from '@types'
import TodoItem from './TodoItem'

interface TodoSectionProps {
  title: string
  items: TodoItemType[]
  choresById: Map<string, Chore>
  sectionClass: string
}

const TodoSection = ({ title, items, choresById, sectionClass }: TodoSectionProps) => {
  return (
    <Section>
      <SectionHeader $isOverdue={sectionClass === 'overdue'}>{title}</SectionHeader>
      <TodoList>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <TodoItem
              key={item.uid}
              item={item}
              chore={choresById.get(item.chore_id)}
              sectionClass={sectionClass}
            />
          ))}
        </AnimatePresence>
      </TodoList>
    </Section>
  )
}

export default TodoSection

const Section = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionHeader = styled.div<{ $isOverdue?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--secondary-text-color);
  padding: 4px 0 8px 0;

  ${(p) => p.$isOverdue && css`
    color: var(--error-color, #f44336);
  `}
`

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
