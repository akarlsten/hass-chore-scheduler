"""WebSocket API for the Chore Scheduler integration."""
from __future__ import annotations

import logging

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.todo import TodoItem, TodoItemStatus
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .store import ChoreStore

_LOGGER = logging.getLogger(__name__)


@callback
def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the WebSocket API handlers."""
    websocket_api.async_register_command(hass, ws_list_chores)
    websocket_api.async_register_command(hass, ws_subscribe_chores)
    websocket_api.async_register_command(hass, ws_list_todos)
    websocket_api.async_register_command(hass, ws_complete_todo)
    websocket_api.async_register_command(hass, ws_uncomplete_todo)


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
    """Subscribe to chore and todo updates."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_found", "Chore Scheduler not configured")
        return

    last_version: list[int | None] = [None]

    @callback
    def forward_data() -> None:
        """Forward all data to the client (skip if store unchanged)."""
        current_version = store.version
        if last_version[0] is not None and last_version[0] == current_version:
            return
        last_version[0] = current_version

        chores = store.get_chores()
        chores_by_id = {c["id"]: c for c in chores}

        # Enrich todos (same logic as ws_list_todos)
        todo_items = store.get_todo_items()
        enriched_todos = []
        for item in todo_items:
            chore = chores_by_id.get(item.get("chore_id", ""))
            enriched_todos.append({
                **item,
                "chore_name": chore["name"] if chore else None,
                "schedule_type": chore.get("schedule", {}).get("type") if chore else None,
                "assignment": chore.get("assignment") if chore else None,
                "completion_stats": store.get_completion_stats(chore["id"]) if chore else None,
            })

        connection.send_message(
            websocket_api.event_message(
                msg["id"],
                {"chores": chores, "items": enriched_todos},
            )
        )

    # Send initial data
    connection.send_result(msg["id"])
    forward_data()

    # Subscribe to coordinator updates
    for entry_data in hass.data.get(DOMAIN, {}).values():
        coordinator = entry_data.get("coordinator") if isinstance(entry_data, dict) else None
        if coordinator:
            connection.subscriptions[msg["id"]] = coordinator.async_add_listener(
                forward_data
            )
            break


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chore_scheduler/todos",
    }
)
@callback
def ws_list_todos(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Return todo items enriched with chore metadata."""
    store = _get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_found", "Chore Scheduler not configured")
        return

    todo_items = store.get_todo_items()
    chores_by_id = {c["id"]: c for c in store.get_chores()}

    # Enrich todo items with chore info
    enriched = []
    for item in todo_items:
        chore = chores_by_id.get(item.get("chore_id", ""))
        enriched_item = {
            **item,
            "chore_name": chore["name"] if chore else None,
            "schedule_type": chore.get("schedule", {}).get("type") if chore else None,
            "assignment": chore.get("assignment") if chore else None,
        }
        # Include completion stats
        if chore:
            enriched_item["completion_stats"] = store.get_completion_stats(
                chore["id"]
            )
        enriched.append(enriched_item)

    connection.send_result(msg["id"], {"items": enriched})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chore_scheduler/complete_todo",
        vol.Required("uid"): str,
    }
)
@websocket_api.async_response
async def ws_complete_todo(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Mark a todo item as complete."""
    uid = msg["uid"]

    # Find the todo entity and update via it (triggers completion tracking)
    for entry_data in hass.data.get(DOMAIN, {}).values():
        if not isinstance(entry_data, dict):
            continue
        todo_entity = entry_data.get("todo_entity")
        if todo_entity:
            await todo_entity.async_update_todo_item(
                TodoItem(uid=uid, status=TodoItemStatus.COMPLETED)
            )
            connection.send_result(msg["id"], {"success": True})
            return

    connection.send_error(
        msg["id"], "not_found", "Todo entity not available"
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "chore_scheduler/uncomplete_todo",
        vol.Required("uid"): str,
    }
)
@websocket_api.async_response
async def ws_uncomplete_todo(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Mark a completed todo item back to needs_action."""
    uid = msg["uid"]

    for entry_data in hass.data.get(DOMAIN, {}).values():
        if not isinstance(entry_data, dict):
            continue
        todo_entity = entry_data.get("todo_entity")
        if todo_entity:
            await todo_entity.async_update_todo_item(
                TodoItem(uid=uid, status=TodoItemStatus.NEEDS_ACTION)
            )
            connection.send_result(msg["id"], {"success": True})
            return

    connection.send_error(
        msg["id"], "not_found", "Todo entity not available"
    )


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
