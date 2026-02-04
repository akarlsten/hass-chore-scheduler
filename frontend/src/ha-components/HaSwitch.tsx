import { useRef, useEffect, useCallback } from 'preact/hooks'

interface HaSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const HaSwitch = ({ checked, onChange }: HaSwitchProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).checked = checked
    }
  }, [checked])

  const handler = useCallback((e: Event) => {
    e.stopPropagation()
    onChange((e.target as any).checked)
  }, [onChange])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('change', handler)
    return () => el.removeEventListener('change', handler)
  }, [handler])

  return <ha-switch ref={ref} />
}

export default HaSwitch
