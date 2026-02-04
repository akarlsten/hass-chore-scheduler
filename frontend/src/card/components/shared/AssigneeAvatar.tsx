import styled from 'styled-components'
import { useHass } from '@hooks'

interface AssigneeAvatarProps {
  name: string
}

const AssigneeAvatar = ({ name }: AssigneeAvatarProps) => {
  const hass = useHass()
  const entityId = `person.${name.toLowerCase().replace(/\s+/g, '_')}`
  const personState = hass?.states[entityId]
  const picture = personState?.attributes?.entity_picture as string | undefined
  const initial = name.charAt(0).toUpperCase()

  return (
    <AvatarRoot title={name}>
      {picture
        ? <img
            src={picture}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        : <AvatarInitial>{initial}</AvatarInitial>
      }
    </AvatarRoot>
  )
}

export default AssigneeAvatar

const AvatarRoot = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--primary-text-color);
`

const AvatarInitial = styled.span``
