import { motion } from 'framer-motion'
import styled, { css, keyframes } from 'styled-components'
import { TodoItem as TodoItemType, Chore } from '@types'
import { useConfig, useChoreActions, useCompletingItems, useUncompletingItems } from '@hooks'
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
  const { completeItem, uncompleteItem } = useChoreActions()
  const completingItems = useCompletingItems()
  const uncompletingItems = useUncompletingItems()

  const icon = chore ? getChoreIcon(chore.name) : getChoreIcon(item.summary)
  const isCompleted = item.status === 'completed'
  const completing = !!completingItems[item.uid]
  const uncompleting = !!uncompletingItems[item.uid]
  const assigneeName = extractAssignee(item.summary)
  const stats = item.completion_stats
  const animate = config?.enable_animations !== false

  // Exit animation depends on context (popLayout removes from flow first):
  // - Pending completing: shrink + fade in place
  // - Done uncompleted: slide UP toward pending section
  // - Done displaced (4th pushed out): instant removal (prevents 4-item flash)
  const exitAnim = sectionClass === 'completed'
    ? uncompleting
      ? { opacity: 0, y: -20 }
      : { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.9 }

  const handleClick = () => {
    if (completing || uncompleting) return
    if (isCompleted) {
      uncompleteItem(item.uid)
      return
    }
    if (animate) triggerHaptic()
    completeItem(item.uid)
  }

  const isDone = sectionClass === 'completed'

  return (
    <Card
      layout={isDone}
      initial={{ opacity: 0, y: isDone ? -8 : 8 }}
      animate={{ opacity: isCompleted ? 0.5 : 1, y: 0 }}
      exit={exitAnim}
      transition={{
        duration: 0.2,
        layout: { type: 'spring', stiffness: 500, damping: 35 },
      }}
      $isOverdue={sectionClass === 'overdue'}
      $isCompleted={isCompleted}
      $completing={completing || uncompleting}
      onClick={handleClick}
    >
      <CheckboxWrap $checked={isCompleted || completing} $completing={completing}>
        <motion.div
          animate={completing ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.25 }}
        >
          <ha-icon
            icon={isCompleted || completing
              ? 'mdi:checkbox-marked-circle'
              : 'mdi:checkbox-blank-circle-outline'
            }
          />
        </motion.div>
      </CheckboxWrap>
      <TodoIcon>
        <ha-icon icon={icon} />
      </TodoIcon>
      <TodoInfo>
        <TodoSummary $isCompleted={isCompleted || completing}>
          {item.summary}
        </TodoSummary>
      </TodoInfo>
      {stats && <StreakBadge streak={stats.streak} />}
      {assigneeName && <AssigneeAvatar name={assigneeName} />}
    </Card>
  )
}

function extractAssignee(summary: string): string | null {
  const match = summary.match(/\(([^)]+)\)$/)
  return match ? match[1] : null
}

export default TodoItem

// ── Styles ────────────────────────────────────────────────────────

const Card = styled(motion.div)<{
  $isCompleted?: boolean
  $isOverdue?: boolean
  $completing?: boolean
}>`
  display: flex;
  align-items: center;
  height: 76px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  box-sizing: border-box;
  gap: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    background: var(--secondary-background-color);
  }

  ${(p) => p.$isOverdue && css`
    border-left: 3px solid var(--error-color, #f44336);
  `}

  ${(p) => p.$isCompleted && css`
    cursor: pointer;
  `}

  ${(p) => p.$completing && css`
    pointer-events: none;
  `}
`

const checkboxGlow = keyframes`
  0%   { filter: drop-shadow(0 0 0 transparent); }
  30%  { filter: drop-shadow(0 0 10px var(--success-color, #4caf50)); }
  100% { filter: drop-shadow(0 0 0 transparent); }
`

const checkboxRingPulse = keyframes`
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  40%  { opacity: 0.4; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
`

const CheckboxWrap = styled.div<{ $checked?: boolean; $completing?: boolean }>`
  flex-shrink: 0;
  position: relative;

  ha-icon {
    --mdc-icon-size: 26px;
    color: var(--secondary-text-color);
    transition: color 0.15s;
  }

  ${(p) => p.$checked && css`
    ha-icon {
      color: var(--success-color, #4caf50);
    }
  `}

  ${(p) => p.$completing && css`
    animation: ${checkboxGlow} 0.5s ease-out;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 2px solid var(--success-color, #4caf50);
      animation: ${checkboxRingPulse} 0.6s ease-out forwards;
      pointer-events: none;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
        display: none;
      }
    }
  `}
`

const TodoIcon = styled.div`
  flex-shrink: 0;
  ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
  }
`

const TodoInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TodoSummary = styled.span<{ $isCompleted?: boolean }>`
  font-size: 1.2rem;
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
