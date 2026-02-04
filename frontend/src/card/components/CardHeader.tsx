import styled from 'styled-components'
import { useLocalize } from '@hooks'
import { CardMode } from '@types'

interface CardHeaderProps {
  title: string
  mode: CardMode
  onToggleMode: () => void
  onAddChore: () => void
}

const CardHeader = ({ title, mode, onToggleMode, onAddChore }: CardHeaderProps) => {
  const t = useLocalize()

  return (
    <Header>
      <Title>{title}</Title>
      <HeaderActions>
        {mode === 'manage' && (
          <HeaderBtn onClick={onAddChore}>
            <ha-icon icon="mdi:plus" />
            {t('action.add')}
          </HeaderBtn>
        )}
        <HeaderBtn onClick={onToggleMode}>
          <ha-icon icon={mode === 'display' ? 'mdi:pencil' : 'mdi:eye'} />
          {mode === 'display' ? t('action.edit_chores') : t('action.show_chores')}
        </HeaderBtn>
      </HeaderActions>
    </Header>
  )
}

export default CardHeader

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.625rem;
  font-weight: 500;
  color: var(--primary-text-color);
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const HeaderBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid var(--divider-color);
  border-radius: 18px;
  background: transparent;
  color: var(--primary-text-color);
  font-size: 0.925rem;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }

  &:active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
  }

  ha-icon {
    --mdc-icon-size: 16px;
    display: flex;
  }
`
