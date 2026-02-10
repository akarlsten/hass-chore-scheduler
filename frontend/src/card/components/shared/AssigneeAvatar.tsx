import styled from 'styled-components'
import { useHass } from '@hooks'
import { resolveEntityPicture } from '@utils/resolveUrl'

interface AssigneeAvatarProps {
  name: string
}

const AssigneeAvatar = ({ name }: AssigneeAvatarProps) => {
  const hass = useHass()
  const entityId = `person.${name.toLowerCase().replace(/\s+/g, '_')}`
  const personState = hass?.states[entityId]
  const picture = resolveEntityPicture(hass, personState)
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
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--primary-text-color);
`

const AvatarInitial = styled.span``
