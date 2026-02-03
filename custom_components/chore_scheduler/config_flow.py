"""Config flow for Chore Scheduler integration."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.selector import (
    EntitySelector,
    EntitySelectorConfig,
)

from .const import DOMAIN, CONF_DEFAULT_TODO_LIST

_LOGGER = logging.getLogger(__name__)


class ChoreSchedulerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Chore Scheduler."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        errors: dict[str, str] = {}

        # Check if already configured
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            # Validate the selected todo list exists
            todo_list = user_input.get(CONF_DEFAULT_TODO_LIST)
            if todo_list:
                state = self.hass.states.get(todo_list)
                if state is None:
                    errors[CONF_DEFAULT_TODO_LIST] = "invalid_todo_list"

            if not errors:
                return self.async_create_entry(
                    title="Chore Scheduler",
                    data=user_input,
                )

        # Get available todo lists
        todo_entities = self._get_todo_entities()

        if not todo_entities:
            return self.async_abort(reason="no_todo_lists")

        data_schema = vol.Schema(
            {
                vol.Required(CONF_DEFAULT_TODO_LIST): EntitySelector(
                    EntitySelectorConfig(domain="todo")
                ),
            }
        )

        return self.async_show_form(
            step_id="user",
            data_schema=data_schema,
            errors=errors,
            description_placeholders={
                "todo_count": str(len(todo_entities)),
            },
        )

    @callback
    def _get_todo_entities(self) -> list[str]:
        """Get list of todo entities."""
        entity_reg = er.async_get(self.hass)
        return [
            entry.entity_id
            for entry in entity_reg.entities.values()
            if entry.domain == "todo"
        ]
