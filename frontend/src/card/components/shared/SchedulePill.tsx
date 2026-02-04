import styled from 'styled-components'
import { ScheduleType } from '@types'

interface SchedulePillProps {
  type: ScheduleType
  text: string
}

const SchedulePill = ({ type, text }: SchedulePillProps) => {
  return <Pill $type={type}>{text}</Pill>
}

export default SchedulePill

const Pill = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.825rem;
  font-weight: 500;
  white-space: nowrap;

  ${({ $type }) => {
    switch ($type) {
      case 'daily':
        return `
          background: rgba(76, 175, 80, 0.15);
          color: var(--label-badge-green, #4caf50);
        `
      case 'weekly':
        return `
          background: rgba(33, 150, 243, 0.15);
          color: var(--label-badge-blue, #2196f3);
        `
      case 'monthly':
        return `
          background: rgba(156, 39, 176, 0.15);
          color: var(--label-badge-purple, #9c27b0);
        `
      case 'once':
        return `
          background: rgba(255, 152, 0, 0.15);
          color: var(--label-badge-yellow, #ff9800);
        `
      default:
        return `
          background: rgba(158, 158, 158, 0.15);
          color: var(--secondary-text-color);
        `
    }
  }}
`
