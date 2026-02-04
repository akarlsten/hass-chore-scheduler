import { useRef, useEffect } from 'preact/hooks'

interface HaCheckboxProps {
  checked: boolean
  onClick?: (e: Event) => void
}

const HaCheckbox = ({ checked, onClick }: HaCheckboxProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).checked = checked
    }
  }, [checked])

  return <ha-checkbox ref={ref} onClick={onClick} />
}

export default HaCheckbox
