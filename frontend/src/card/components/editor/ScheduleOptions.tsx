import styled from 'styled-components'
import { ScheduleType, Weekday } from '@types'
import HaSelect from '../../../ha-components/HaSelect'
import WeekdayGrid from './WeekdayGrid'

interface ScheduleOptionsProps {
  scheduleType: ScheduleType
  scheduleDays: Weekday[]
  onDaysChange: (days: Weekday[]) => void
  scheduleDayOfMonth: number
  onDayOfMonthChange: (day: number) => void
  scheduleDate: string
  onDateChange: (date: string) => void
}

const ScheduleOptions = ({
  scheduleType,
  scheduleDays,
  onDaysChange,
  scheduleDayOfMonth,
  onDayOfMonthChange,
  scheduleDate,
  onDateChange,
}: ScheduleOptionsProps) => {
  if (scheduleType === 'once') {
    return (
      <Extra>
        <Label>On date</Label>
        <ha-textfield
          type="date"
          value={scheduleDate}
          onInput={(e: Event) => onDateChange((e.target as HTMLInputElement).value)}
        />
      </Extra>
    )
  }

  if (scheduleType === 'weekly') {
    return (
      <Extra>
        <Label>On days</Label>
        <WeekdayGrid selectedDays={scheduleDays} onChange={onDaysChange} />
      </Extra>
    )
  }

  if (scheduleType === 'monthly') {
    return (
      <Extra>
        <HaSelect
          value={String(scheduleDayOfMonth)}
          label="On day"
          fixedMenuPosition
          onSelected={(value) => onDayOfMonthChange(parseInt(value) || 1)}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <ha-list-item key={day} value={String(day)}>
              {formatOrdinal(day)}
            </ha-list-item>
          ))}
        </HaSelect>
      </Extra>
    )
  }

  // Daily - no extra options
  return null
}

function formatOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export default ScheduleOptions

const Extra = styled.div`
  margin-top: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 8px;
`
