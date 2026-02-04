import styled, { css } from 'styled-components'
import { Weekday } from '@types'
import { useLocalize } from '@hooks'
import { localizeWeekday } from '@utils/localize'
import { useHass } from '@hooks'

const WEEKDAYS: Weekday[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
]

interface WeekdayGridProps {
  selectedDays: Weekday[]
  onChange: (days: Weekday[]) => void
}

const WeekdayGrid = ({ selectedDays, onChange }: WeekdayGridProps) => {
  const hass = useHass()

  const toggleDay = (day: Weekday) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        onChange(selectedDays.filter((d) => d !== day))
      }
    } else {
      onChange([...selectedDays, day])
    }
  }

  return (
    <Grid>
      {WEEKDAYS.map((day) => (
        <DayChip
          key={day}
          $selected={selectedDays.includes(day)}
          onClick={() => toggleDay(day)}
        >
          {localizeWeekday(day, hass)}
        </DayChip>
      ))}
    </Grid>
  )
}

export default WeekdayGrid

const Grid = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 12px;
`

const DayChip = styled.div<{ $selected?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--primary-text-color);

  &:hover {
    border-color: var(--primary-color);
  }

  ${(p) => p.$selected && css`
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  `}
`
