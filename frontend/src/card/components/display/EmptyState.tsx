import styled from 'styled-components'
import { useLocalize } from '@hooks'

const EmptyState = () => {
  const t = useLocalize()

  return (
    <Root>
      <Icon><ha-icon icon="mdi:check-circle-outline" /></Icon>
      <Text>{t('display.empty_todos')}</Text>
    </Root>
  )
}

export default EmptyState

const Root = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--secondary-text-color);
`

const Icon = styled.div`
  ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`

const Text = styled.p`
  margin: 0;
`
