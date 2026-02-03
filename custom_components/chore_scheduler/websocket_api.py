"""WebSocket API for the Chore Scheduler integration."""
from __future__ import annotations

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .store import ChoreStore


@callback
def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the WebSocket API handlers."""
    websocket_api.async_register_command(hass, ws_list_chores)
    websocket_api.async_register_command(hass, ws_subscribe_chores)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chore_scheduler/list",
    }
)
@callback
def ws_list_chores(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Return a list of all chores."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_found", "Chore Scheduler not configured")
        return

    chores = store.get_chores()
    connection.send_result(msg["id"], {"chores": chores})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chore_scheduler/subscribe",
    }
)
@callback
def ws_subscribe_chores(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Subscribe to chore updates."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_found", "Chore Scheduler not configured")
        return

    @callback
    def forward_chores() -> None:
        """Forward chore updates to the client."""
        connection.send_message(
            websocket_api.event_message(
                msg["id"],
                {"chores": store.get_chores()},
            )
        )

    # Send initial data
    connection.send_result(msg["id"])
    forward_chores()

    # Subscribe to coordinator updates
    for entry_data in hass.data.get(DOMAIN, {}).values():
        coordinator = entry_data.get("coordinator")
        if coordinator:
            connection.subscriptions[msg["id"]] = coordinator.async_add_listener(
                forward_chores
            )
            break


def _get_store(hass: HomeAssistant) -> ChoreStore | None:
    """Get the chore store from hass data."""
    domain_data = hass.data.get(DOMAIN, {})
    for entry_data in domain_data.values():
        # Skip non-dict entries (e.g., "frontend_registered": True)
        if isinstance(entry_data, dict):
            store = entry_data.get("store")
            if store:
                return store
    return None
