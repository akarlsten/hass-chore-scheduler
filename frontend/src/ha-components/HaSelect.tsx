import { useRef, useEffect, useCallback } from 'preact/hooks'
import { ComponentChildren } from 'preact'

interface HaSelectProps {
  value: string
  label?: string
  fixedMenuPosition?: boolean
  onSelected: (value: string) => void
  children: ComponentChildren
}

const HaSelect = ({ value, label, fixedMenuPosition, onSelected, children }: HaSelectProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).value = value
    }
  }, [value])

  const selectedHandler = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail
    if (detail?.value) {
      onSelected(detail.value)
    }
  }, [onSelected])

  const closedHandler = useCallback((e: Event) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('selected', selectedHandler)
    el.addEventListener('closed', closedHandler)
    return () => {
      el.removeEventListener('selected', selectedHandler)
      el.removeEventListener('closed', closedHandler)
    }
  }, [selectedHandler, closedHandler])

  return (
    <ha-select ref={ref} label={label} fixedMenuPosition={fixedMenuPosition}>
      {children}
    </ha-select>
  )
}

export default HaSelect
