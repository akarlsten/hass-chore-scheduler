import { useRef } from 'preact/hooks'
import styled, { keyframes, css } from 'styled-components'
import { TodoItem as TodoItemType, Chore } from '@types'
import { useConfig, useChoreActions, useCompletingItems } from '@hooks'
import { getChoreIcon } from '@utils/chore-icons'
import { triggerHaptic } from '@utils/animations'
import AssigneeAvatar from '../shared/AssigneeAvatar'
import StreakBadge from '../shared/StreakBadge'

interface TodoItemProps {
  item: TodoItemType
  chore?: Chore
  sectionClass: string
}

const TodoItem = ({ item, chore, sectionClass }: TodoItemProps) => {
  const config = useConfig()
  const { completeItem } = useChoreActions()
  const completingItems = useCompletingItems()
  const rowRef = useRef<HTMLDivElement>(null)

  const icon = chore ? getChoreIcon(chore.name) : getChoreIcon(item.summary)
  const isCompleted = item.status === 'completed'
  const completing = !!completingItems[item.uid]
  const assigneeName = extractAssignee(item.summary)
  const stats = item.completion_stats
  const animate = config?.enable_animations !== false

  const handleComplete = () => {
    if (isCompleted || completing) return

    if (animate) {
      triggerHaptic()
    }

    // This now handles everything: optimistic update, backend call, animation timing
    completeItem(item.uid)
  }

  return (
    <Row
      ref={rowRef}
      $isCompleted={isCompleted}
      $isOverdue={sectionClass === 'overdue'}
      $completing={completing}
    >
      <Checkbox
        $isCompleted={isCompleted}
        $completing={completing}
        onClick={handleComplete}
      >
        <ha-icon
          icon={isCompleted || completing
            ? 'mdi:checkbox-marked-circle'
            : 'mdi:checkbox-blank-circle-outline'
          }
        />
      </Checkbox>
      <TodoIcon>
        <ha-icon icon={icon} />
      </TodoIcon>
      <TodoInfo>
        <TodoSummary $isCompleted={isCompleted || completing}>{item.summary}</TodoSummary>
      </TodoInfo>
      {stats && <StreakBadge streak={stats.streak} />}
      {assigneeName && <AssigneeAvatar name={assigneeName} />}
    </Row>
  )
}

function extractAssignee(summary: string): string | null {
  const match = summary.match(/\(([^)]+)\)$/)
  return match ? match[1] : null
}

export default TodoItem

// ── Animations ────────────────────────────────────────────────────

const checkmarkPop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.4); }
  100% { transform: scale(1); }
`

const itemFadeOut = keyframes`
  0% { opacity: 1; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
  50% { opacity: 0; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
  100% { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-bottom: -4px; }
`

// ── Styles ────────────────────────────────────────────────────────

const Row = styled.div<{ $isCompleted?: boolean; $isOverdue?: boolean; $completing?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  gap: 8px;
  transition: background-color 0.15s, opacity 0.3s;

  &:hover {
    background: var(--secondary-background-color);
  }

  ${(p) => p.$isOverdue && css`
    border-left: 3px solid var(--error-color, #f44336);
  `}

  ${(p) => p.$isCompleted && css`
    opacity: 0.5;
  `}

  ${(p) => p.$completing && css`
    animation: ${itemFadeOut} 0.45s ease-out 0.28s forwards;
    overflow: hidden;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 0.5;
    }
  `}
`

const Checkbox = styled.div<{ $isCompleted?: boolean; $completing?: boolean }>`
  cursor: pointer;
  flex-shrink: 0;

  ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    transition: color 0.15s, transform 0.15s;
  }

  &:hover ha-icon {
    color: var(--primary-color);
  }

  ${(p) => p.$isCompleted && css`
    cursor: default;
    ha-icon {
      color: var(--success-color, #4caf50);
    }
  `}

  ${(p) => p.$completing && css`
    ha-icon {
      animation: ${checkmarkPop} 0.3s ease-out;
      color: var(--success-color, #4caf50);

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  `}
`

const TodoIcon = styled.div`
  flex-shrink: 0;
  ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
`

const TodoInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TodoSummary = styled.span<{ $isCompleted?: boolean }>`
  font-size: 1.025rem;
  color: var(--primary-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  ${(p) => p.$isCompleted && css`
    text-decoration: line-through;
    color: var(--secondary-text-color);
  `}
`
