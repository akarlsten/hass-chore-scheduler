// JSX IntrinsicElements declarations for Home Assistant web components.
// These are custom elements provided by the HA frontend at runtime.

declare namespace preact.JSX {
  interface IntrinsicElements {
    'ha-card': preact.JSX.HTMLAttributes<HTMLElement>
    'ha-icon': preact.JSX.HTMLAttributes<HTMLElement> & {
      icon?: string
    }
    'ha-textfield': preact.JSX.HTMLAttributes<HTMLElement> & {
      value?: string
      label?: string
      type?: string
      placeholder?: string
    }
    'ha-select': preact.JSX.HTMLAttributes<HTMLElement> & {
      value?: string
      label?: string
      fixedMenuPosition?: boolean
    }
    'ha-list-item': preact.JSX.HTMLAttributes<HTMLElement> & {
      value?: string
    }
    'ha-switch': preact.JSX.HTMLAttributes<HTMLElement> & {
      checked?: boolean
    }
    'ha-checkbox': preact.JSX.HTMLAttributes<HTMLElement> & {
      checked?: boolean
    }
    'ha-circular-progress': preact.JSX.HTMLAttributes<HTMLElement> & {
      indeterminate?: boolean
    }
    'ha-icon-button': preact.JSX.HTMLAttributes<HTMLElement>
  }
}
