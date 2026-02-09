import styled, { css, keyframes } from 'styled-components'
import { useLocalize } from '@hooks'

const PARTICLES = Array.from({ length: 8 }, (_, i) => i)

interface AllDoneStateProps {
  celebrate?: boolean
}

const AllDoneState = ({ celebrate = false }: AllDoneStateProps) => {
  const t = useLocalize()

  return (
    <Root>
      <IconWrap>
        {celebrate && PARTICLES.map((i) => (
          <Particle key={i} $index={i} />
        ))}
        {celebrate && <GlowRing />}
        <CelebrateIcon $animate={celebrate}><ha-icon icon="mdi:check-circle" /></CelebrateIcon>
      </IconWrap>
      <CelebrateText $animate={celebrate}>{t('display.all_done')}</CelebrateText>
    </Root>
  )
}

export default AllDoneState

// ── Keyframes ────────────────────────────────────────────────────

const celebrateIconIn = keyframes`
  0%   { opacity: 0; transform: scale(0); }
  50%  { opacity: 1; transform: scale(1.2); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
`

const glowFlash = keyframes`
  0%   { filter: drop-shadow(0 0 0 transparent); }
  30%  { filter: drop-shadow(0 0 16px var(--success-color, #4caf50)); }
  100% { filter: drop-shadow(0 0 0 transparent); }
`

const ringPulse = keyframes`
  0%   { opacity: 0; transform: scale(0.5); }
  40%  { opacity: 0.4; }
  100% { opacity: 0; transform: scale(2); }
`

const particleBurst = keyframes`
  0%   { opacity: 1; transform: translate(var(--sx), var(--sy)) scale(1); }
  100% { opacity: 0; transform: translate(var(--px), var(--py)) scale(0); }
`

const celebrateTextIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ── Styles ───────────────────────────────────────────────────────

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 0;
  padding: 32px 16px;
`

const IconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  margin-bottom: -24px;
`

const GlowRing = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid var(--success-color, #4caf50);
  animation: ${ringPulse} 0.7s ease-out 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }
`

const PARTICLE_COLORS = [
  'var(--success-color, #4caf50)',
  'var(--warning-color, #ff9800)',
  'var(--info-color, #2196f3)',
  'var(--error-color, #f44336)',
  'var(--success-color, #4caf50)',
  '#9c27b0',
  'var(--info-color, #2196f3)',
  'var(--warning-color, #ff9800)',
]

const Particle = styled.div<{ $index: number }>`
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0;
  background: ${(p) => PARTICLE_COLORS[p.$index]};
  --sx: ${(p) => Math.round(Math.cos((p.$index * 45 * Math.PI) / 180) * 20)}px;
  --sy: ${(p) => Math.round(Math.sin((p.$index * 45 * Math.PI) / 180) * 20)}px;
  --px: ${(p) => Math.round(Math.cos((p.$index * 45 * Math.PI) / 180) * 75)}px;
  --py: ${(p) => Math.round(Math.sin((p.$index * 45 * Math.PI) / 180) * 75)}px;
  animation: ${particleBurst} 0.6s ease-out ${(p) => 0.2 + p.$index * 0.025}s forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }
`

const CelebrateIcon = styled.div<{ $animate?: boolean }>`
  position: relative;

  ha-icon {
    --mdc-icon-size: 64px;
    color: var(--success-color, #4caf50);
    display: block;

    ${(p) => p.$animate && css`
      animation:
        ${celebrateIconIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1),
        ${glowFlash} 0.7s ease-out 0.2s;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
  }
`

const CelebrateText = styled.p<{ $animate?: boolean }>`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-text-color);
  margin: 0;

  ${(p) => p.$animate && css`
    animation: ${celebrateTextIn} 0.35s ease-out 0.3s both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `}
`
