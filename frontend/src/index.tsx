import { render } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { HomeAssistant, ChoreSchedulerCardConfig, CardMode, LovelaceCardConfig } from '@types'
import StoreProviderWrapper from './card'
import CardEditor from './config-editor'

// ── Main Card Element ───────────────────────────────────────────────

class ChoreSchedulerCardElement extends HTMLElement {
  private _hass: HomeAssistant | undefined
  private _config: ChoreSchedulerCardConfig | undefined
  private _card: HTMLElement | undefined

  set hass(hass: HomeAssistant) {
    this._hass = hass
    this._render()
  }

  setConfig(config: LovelaceCardConfig) {
    this._config = {
      ...config,
      title: (config.title as string | undefined) ?? 'Chore Scheduler',
      show_disabled: (config.show_disabled as boolean | undefined) ?? true,
      show_next_due: (config.show_next_due as boolean | undefined) ?? true,
      default_mode: (config.default_mode as CardMode | undefined) ?? 'display',
      show_completed: (config.show_completed as boolean | undefined) ?? false,
      enable_animations: (config.enable_animations as boolean | undefined) ?? true,
    }
    this._render()
  }

  connectedCallback() {
    // When HA re-attaches the element (e.g. tab switch), the styled-components
    // CSSStyleSheet is invalidated. Force a clean re-render.
    this._teardown()
    this._render()
  }

  disconnectedCallback() {
    this._teardown()
  }

  getCardSize() {
    return 3
  }

  static getConfigElement() {
    return document.createElement('chore-scheduler-card-editor')
  }

  static getStubConfig() {
    return {
      title: 'Chore Scheduler',
      show_disabled: true,
      show_next_due: true,
      default_mode: 'display',
      show_completed: false,
      enable_animations: true,
    }
  }

  private _teardown() {
    if (this._card) {
      render(null, this._card)
    }
    this._card = undefined
    this.innerHTML = ''
  }

  private _ensureCard() {
    if (!this._card) {
      this._card = document.createElement('ha-card')
      this.appendChild(this._card)
    }
    return this._card
  }

  private _render() {
    if (!this._config || !this._hass) return
    const card = this._ensureCard()
    render(
      <StyleSheetManager target={this}>
        <StoreProviderWrapper hass={this._hass} config={this._config} />
      </StyleSheetManager>,
      card
    )
  }
}

customElements.define('chore-scheduler-card', ChoreSchedulerCardElement)

// ── Config Editor Element ───────────────────────────────────────────

class ChoreSchedulerCardEditorElement extends HTMLElement {
  private _hass: HomeAssistant | undefined
  private _config: ChoreSchedulerCardConfig | undefined
  private _container: HTMLDivElement | undefined

  set hass(hass: HomeAssistant) {
    this._hass = hass
    this._render()
  }

  setConfig(config: ChoreSchedulerCardConfig) {
    this._config = config
    this._render()
  }

  private _handleConfigChanged = (config: ChoreSchedulerCardConfig) => {
    this._config = config
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    )
    this._render()
  }

  private _ensureContainer() {
    if (!this._container) {
      this._container = document.createElement('div')
      this.appendChild(this._container)
    }
    return this._container
  }

  private _render() {
    if (!this._config || !this._hass) return
    const container = this._ensureContainer()
    render(
      <StyleSheetManager target={this}>
        <CardEditor
          hass={this._hass}
          config={this._config}
          onConfigChanged={this._handleConfigChanged}
        />
      </StyleSheetManager>,
      container
    )
  }
}

customElements.define('chore-scheduler-card-editor', ChoreSchedulerCardEditorElement)

// ── Card Registration ───────────────────────────────────────────────

declare global {
  interface Window {
    customCards?: Array<{
      type: string
      name: string
      description: string
      preview?: boolean
    }>
  }
}

window.customCards = window.customCards || []
window.customCards.push({
  type: 'chore-scheduler-card',
  name: 'Chore Scheduler Card',
  description: 'A card for managing household chore schedules',
  preview: true,
})
