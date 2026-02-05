import styled, { keyframes } from 'styled-components'
import { useLocalize } from '@hooks'

const AllDoneState = () => {
  const t = useLocalize()

  return (
    <Root>
      <CelebrateIcon><ha-icon icon="mdi:check-circle" /></CelebrateIcon>
      <CelebrateText>{t('display.all_done')}</CelebrateText>
    </Root>
  )
}

export default AllDoneState

const celebrateIconIn = keyframes`
  0%   { opacity: 0; transform: scale(0.5); }
  60%  { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
`

const glowFlash = keyframes`
  0%   { filter: drop-shadow(0 0 0 transparent); }
  30%  { filter: drop-shadow(0 0 12px var(--success-color, #4caf50)); }
  100% { filter: drop-shadow(0 0 0 transparent); }
`

const celebrateTextIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 0;
  padding: 32px 16px;
`

const CelebrateIcon = styled.div`
  ha-icon {
    --mdc-icon-size: 64px;
    color: var(--success-color, #4caf50);
    margin-bottom: 12px;
    display: block;
    animation:
      ${celebrateIconIn} 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      ${glowFlash} 0.6s ease-out 0.15s;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`

const CelebrateText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-text-color);
  margin: 0;
  animation: ${celebrateTextIn} 0.35s ease-out 0.25s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
