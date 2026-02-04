"""Config flow for Chore Scheduler integration."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    DOMAIN,
    CONF_TTS_ENABLED,
    CONF_TTS_TARGETS,
    CONF_TTS_SERVICE,
    CONF_TTS_LANGUAGE,
    CONF_QUIET_HOURS_START,
    CONF_QUIET_HOURS_END,
    CONF_REMINDER_DELAY_HOURS,
    DEFAULT_QUIET_HOURS_START,
    DEFAULT_QUIET_HOURS_END,
    DEFAULT_REMINDER_DELAY_HOURS,
    DEFAULT_TTS_SERVICE,
    DEFAULT_TTS_LANGUAGE,
    TTS_SERVICES,
)
from .tts_messages import SUPPORTED_LANGUAGES

_LOGGER = logging.getLogger(__name__)


class ChoreSchedulerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Chore Scheduler."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        # Only allow one instance
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(
                title="Chore Scheduler",
                data={},
            )

        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Get the options flow for this handler."""
        return ChoreSchedulerOptionsFlow(config_entry)


class ChoreSchedulerOptionsFlow(OptionsFlow):
    """Handle options flow for Chore Scheduler."""

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize options flow."""
        self._config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self._config_entry.options

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_TTS_ENABLED,
                        default=options.get(CONF_TTS_ENABLED, False),
                    ): bool,
                    vol.Optional(
                        CONF_TTS_TARGETS,
                        default=options.get(CONF_TTS_TARGETS, []),
                    ): selector.EntitySelector(
                        selector.EntitySelectorConfig(
                            domain="media_player",
                            multiple=True,
                        )
                    ),
                    vol.Optional(
                        CONF_TTS_SERVICE,
                        default=options.get(CONF_TTS_SERVICE, DEFAULT_TTS_SERVICE),
                    ): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=[
                                selector.SelectOptionDict(
                                    value=s, label=s.replace("_", " ").title()
                                )
                                for s in TTS_SERVICES
                            ],
                            mode=selector.SelectSelectorMode.DROPDOWN,
                        )
                    ),
                    vol.Optional(
                        CONF_TTS_LANGUAGE,
                        default=options.get(CONF_TTS_LANGUAGE, DEFAULT_TTS_LANGUAGE),
                    ): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=[
                                selector.SelectOptionDict(
                                    value="auto", label="Auto (HA system language)"
                                ),
                            ] + [
                                selector.SelectOptionDict(
                                    value=lang, label=lang.upper()
                                )
                                for lang in SUPPORTED_LANGUAGES
                            ],
                            mode=selector.SelectSelectorMode.DROPDOWN,
                        )
                    ),
                    vol.Optional(
                        CONF_QUIET_HOURS_START,
                        default=options.get(
                            CONF_QUIET_HOURS_START, DEFAULT_QUIET_HOURS_START
                        ),
                    ): selector.TimeSelector(),
                    vol.Optional(
                        CONF_QUIET_HOURS_END,
                        default=options.get(
                            CONF_QUIET_HOURS_END, DEFAULT_QUIET_HOURS_END
                        ),
                    ): selector.TimeSelector(),
                    vol.Optional(
                        CONF_REMINDER_DELAY_HOURS,
                        default=options.get(
                            CONF_REMINDER_DELAY_HOURS, DEFAULT_REMINDER_DELAY_HOURS
                        ),
                    ): selector.NumberSelector(
                        selector.NumberSelectorConfig(
                            min=1,
                            max=24,
                            step=1,
                            mode=selector.NumberSelectorMode.BOX,
                            unit_of_measurement="hours",
                        )
                    ),
                }
            ),
        )
