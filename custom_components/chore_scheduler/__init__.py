"""The Chore Scheduler integration."""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

from .const import (
    DOMAIN,
    ATTR_CHORE_ID,
    ATTR_NAME,
    ATTR_DESCRIPTION,
    ATTR_SCHEDULE,
    ATTR_ASSIGNMENT,
    ATTR_NOTIFICATIONS,
    ATTR_ENABLED,
    SERVICE_ADD_CHORE,
    SERVICE_UPDATE_CHORE,
    SERVICE_DELETE_CHORE,
    SERVICE_TRIGGER_CHORE,
    SERVICE_LIST_CHORES,
)
from .store import ChoreStore
from .coordinator import ChoreSchedulerCoordinator
from .websocket_api import async_register_websocket_api

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.TODO]

# Service schemas
ADD_CHORE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_NAME): cv.string,
        vol.Optional(ATTR_DESCRIPTION, default=""): cv.string,
        vol.Optional(ATTR_SCHEDULE): dict,
        vol.Optional(ATTR_ASSIGNMENT): dict,
        vol.Optional(ATTR_NOTIFICATIONS): dict,
        vol.Optional(ATTR_ENABLED, default=True): cv.boolean,
    }
)

UPDATE_CHORE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CHORE_ID): cv.string,
        vol.Optional(ATTR_NAME): cv.string,
        vol.Optional(ATTR_DESCRIPTION): cv.string,
        vol.Optional(ATTR_SCHEDULE): dict,
        vol.Optional(ATTR_ASSIGNMENT): dict,
        vol.Optional(ATTR_NOTIFICATIONS): dict,
        vol.Optional(ATTR_ENABLED): cv.boolean,
    }
)

DELETE_CHORE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CHORE_ID): cv.string,
    }
)

TRIGGER_CHORE_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CHORE_ID): cv.string,
    }
)


FRONTEND_SCRIPT_PATH = f"/{DOMAIN}/chore-scheduler-card.js"
FRONTEND_SCRIPT_URL = f"{FRONTEND_SCRIPT_PATH}?v=5"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Chore Scheduler from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    # Register frontend
    await _async_register_frontend(hass)

    # Initialize store
    store = ChoreStore(hass)
    await store.async_load()

    # Initialize coordinator
    coordinator = ChoreSchedulerCoordinator(hass, store, entry)
    await coordinator.async_config_entry_first_refresh()

    # Store references
    hass.data[DOMAIN][entry.entry_id] = {
        "store": store,
        "coordinator": coordinator,
    }

    # Register services
    await _async_register_services(hass)

    # Register WebSocket API
    async_register_websocket_api(hass)

    # Set up platforms
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Reload on options change
    entry.async_on_unload(entry.add_update_listener(_async_update_options))

    return True


async def _async_update_options(
    hass: HomeAssistant, entry: ConfigEntry
) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    if unload_ok := await hass.config_entries.async_unload_platforms(
        entry, PLATFORMS
    ):
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok


def _get_entry_data(hass: HomeAssistant) -> dict[str, Any] | None:
    """Get the current store and coordinator from hass.data."""
    for entry_data in hass.data.get(DOMAIN, {}).values():
        if isinstance(entry_data, dict) and "store" in entry_data:
            return entry_data
    return None


async def _async_register_services(hass: HomeAssistant) -> None:
    """Register integration services."""

    async def handle_add_chore(call: ServiceCall) -> None:
        """Handle the add_chore service call."""
        entry_data = _get_entry_data(hass)
        if not entry_data:
            _LOGGER.error("Chore Scheduler not loaded")
            return
        store = entry_data["store"]
        coordinator = entry_data["coordinator"]
        chore = await store.async_add_chore(
            name=call.data[ATTR_NAME],
            description=call.data.get(ATTR_DESCRIPTION, ""),
            schedule=call.data.get(ATTR_SCHEDULE),
            assignment=call.data.get(ATTR_ASSIGNMENT),
            notifications=call.data.get(ATTR_NOTIFICATIONS),
            enabled=call.data.get(ATTR_ENABLED, True),
        )
        _LOGGER.info("Added chore: %s", chore["name"])
        await coordinator.async_request_refresh()

    async def handle_update_chore(call: ServiceCall) -> None:
        """Handle the update_chore service call."""
        entry_data = _get_entry_data(hass)
        if not entry_data:
            _LOGGER.error("Chore Scheduler not loaded")
            return
        store = entry_data["store"]
        coordinator = entry_data["coordinator"]
        chore_id = call.data[ATTR_CHORE_ID]
        update_data = {
            k: v
            for k, v in call.data.items()
            if k != ATTR_CHORE_ID and v is not None
        }
        chore = await store.async_update_chore(chore_id, **update_data)
        if chore:
            _LOGGER.info("Updated chore: %s", chore["name"])
            await coordinator.async_request_refresh()
        else:
            _LOGGER.warning("Chore not found: %s", chore_id)

    async def handle_delete_chore(call: ServiceCall) -> None:
        """Handle the delete_chore service call."""
        entry_data = _get_entry_data(hass)
        if not entry_data:
            _LOGGER.error("Chore Scheduler not loaded")
            return
        store = entry_data["store"]
        coordinator = entry_data["coordinator"]
        chore_id = call.data[ATTR_CHORE_ID]
        if await store.async_delete_chore(chore_id):
            _LOGGER.info("Deleted chore: %s", chore_id)
            await coordinator.async_request_refresh()
        else:
            _LOGGER.warning("Chore not found: %s", chore_id)

    async def handle_trigger_chore(call: ServiceCall) -> None:
        """Handle the trigger_chore service call."""
        entry_data = _get_entry_data(hass)
        if not entry_data:
            _LOGGER.error("Chore Scheduler not loaded")
            return
        store = entry_data["store"]
        coordinator = entry_data["coordinator"]
        chore_id = call.data[ATTR_CHORE_ID]
        chore = store.get_chore(chore_id)
        if chore:
            await coordinator.async_trigger_chore(chore)
            _LOGGER.info("Manually triggered chore: %s", chore["name"])
        else:
            _LOGGER.warning("Chore not found: %s", chore_id)

    async def handle_list_chores(call: ServiceCall) -> dict[str, Any]:
        """Handle the list_chores service call."""
        entry_data = _get_entry_data(hass)
        if not entry_data:
            return {"chores": []}
        store = entry_data["store"]
        return {"chores": store.get_chores()}

    # Register services if not already registered
    if not hass.services.has_service(DOMAIN, SERVICE_ADD_CHORE):
        hass.services.async_register(
            DOMAIN, SERVICE_ADD_CHORE, handle_add_chore, schema=ADD_CHORE_SCHEMA
        )
        hass.services.async_register(
            DOMAIN,
            SERVICE_UPDATE_CHORE,
            handle_update_chore,
            schema=UPDATE_CHORE_SCHEMA,
        )
        hass.services.async_register(
            DOMAIN,
            SERVICE_DELETE_CHORE,
            handle_delete_chore,
            schema=DELETE_CHORE_SCHEMA,
        )
        hass.services.async_register(
            DOMAIN,
            SERVICE_TRIGGER_CHORE,
            handle_trigger_chore,
            schema=TRIGGER_CHORE_SCHEMA,
        )
        hass.services.async_register(
            DOMAIN,
            SERVICE_LIST_CHORES,
            handle_list_chores,
        )


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Register the frontend card."""
    # Only register once
    if "frontend_registered" in hass.data.get(DOMAIN, {}):
        return

    hass.data.setdefault(DOMAIN, {})["frontend_registered"] = True

    # Get the path to the frontend JS file
    frontend_path = Path(__file__).parent / "www" / "chore-scheduler-card.js"

    if frontend_path.exists():
        # Register static paths (card JS) - use path without query string
        static_paths = [
            StaticPathConfig(
                FRONTEND_SCRIPT_PATH,
                str(frontend_path),
                cache_headers=False,
            ),
        ]

        await hass.http.async_register_static_paths(static_paths)

        # Add the JS to the frontend
        add_extra_js_url(hass, FRONTEND_SCRIPT_URL)
        _LOGGER.debug("Registered Chore Scheduler card frontend")
    else:
        _LOGGER.warning(
            "Frontend file not found at %s. Card will not be available.",
            frontend_path,
        )

