import styled, { css } from 'styled-components'
import { useHass } from '@hooks'
import { HassEntity } from '@types'

interface PersonSelectorProps {
  selectedAssignee: string | null
  onSelect: (entityId: string | null) => void
}

const PersonSelector = ({ selectedAssignee, onSelect }: PersonSelectorProps) => {
  const hass = useHass()

  const persons = Object.values(hass?.states || {}).filter((entity) =>
    entity.entity_id.startsWith('person.')
  )

  return (
    <PersonGrid>
      <PersonOption $selected={selectedAssignee === null} onClick={() => onSelect(null)}>
        <PersonAvatar>
          <ha-icon icon="mdi:account-group" />
        </PersonAvatar>
        <PersonName>Anyone</PersonName>
      </PersonOption>
      {persons.map((person) => (
        <PersonOptionItem
          key={person.entity_id}
          person={person}
          isSelected={selectedAssignee === person.entity_id}
          onSelect={() => onSelect(person.entity_id)}
        />
      ))}
    </PersonGrid>
  )
}

interface PersonOptionItemProps {
  person: HassEntity
  isSelected: boolean
  onSelect: () => void
}

const PersonOptionItem = ({ person, isSelected, onSelect }: PersonOptionItemProps) => {
  const fullName = (person.attributes.friendly_name as string) || person.entity_id.split('.')[1].replace(/_/g, ' ')
  const firstName = fullName.split(' ')[0]
  const picture = person.attributes.entity_picture as string | undefined

  return (
    <PersonOption $selected={isSelected} onClick={onSelect}>
      <PersonAvatar>
        {picture
          ? <img src={picture} alt={firstName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <ha-icon icon="mdi:account" />
        }
      </PersonAvatar>
      <PersonName $selected={isSelected}>{firstName}</PersonName>
    </PersonOption>
  )
}

export default PersonSelector

const PersonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`

const PersonOption = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 2px;
  border-radius: 10px;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
  min-width: 0;

  &:hover {
    border-color: var(--primary-color);
  }

  ${(p) => p.$selected && css`
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  `}
`

const PersonAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
  }
`

const PersonName = styled.span<{ $selected?: boolean }>`
  font-size: 0.775rem;
  color: var(--primary-text-color);
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(p) => p.$selected && css`
    font-weight: 500;
    color: var(--primary-color);
  `}
`
