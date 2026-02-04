"""Todo platform for the Chore Scheduler integration."""
from __future__ import annotations

import logging
from datetime import date
from typing import Any

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SCHEDULE_ONCE
from .coordinator import ChoreSchedulerCoordinator
from .store import ChoreStore

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Chore Scheduler todo list."""
    data = hass.data[DOMAIN][entry.entry_id]
    store: ChoreStore = data["store"]
    coordinator: ChoreSchedulerCoordinator = data["coordinator"]

    todo_entity = ChoreSchedulerTodoList(store, coordinator, entry)

    # Store reference so coordinator can notify us of changes
    data["todo_entity"] = todo_entity

    async_add_entities([todo_entity])


class ChoreSchedulerTodoList(TodoListEntity):
    """A todo list entity for chore-generated items."""

    _attr_has_entity_name = True
    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
        | TodoListEntityFeature.SET_DUE_DATE_ON_ITEM
        | TodoListEntityFeature.SET_DESCRIPTION_ON_ITEM
    )
    _attr_name = "Chores"
    _attr_icon = "mdi:clipboard-check-outline"

    def __init__(
        self,
        store: ChoreStore,
        coordinator: ChoreSchedulerCoordinator,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the todo list entity."""
        self._store = store
        self._coordinator = coordinator
        self._attr_unique_id = f"{entry.entry_id}_todo"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Chore Scheduler",
            "manufacturer": "Custom",
            "model": "Chore Scheduler",
        }

    @property
    def todo_items(self) -> list[TodoItem]:
        """Return the list of todo items."""
        items = []
        for data in self._store.get_todo_items():
            due = None
            if data.get("due"):
                try:
                    due = date.fromisoformat(data["due"])
                except (ValueError, TypeError):
                    pass

            items.append(
                TodoItem(
                    uid=data["uid"],
                    summary=data.get("summary", ""),
                    status=(
                        TodoItemStatus.COMPLETED
                        if data.get("status") == "completed"
                        else TodoItemStatus.NEEDS_ACTION
                    ),
                    due=due,
                    description=data.get("description"),
                )
            )
        return items

    async def async_create_todo_item(self, item: TodoItem) -> None:
        """Handle creation of a todo item (e.g. from HA UI or service)."""
        due_str = None
        if item.due is not None:
            due_str = item.due.isoformat() if isinstance(item.due, date) else item.due.date().isoformat()

        await self._store.async_add_todo_item(
            summary=item.summary or "",
            chore_id="",  # External creation, not linked to a chore
            description=item.description,
            due=due_str,
        )
        self.async_write_ha_state()

    async def async_update_todo_item(self, item: TodoItem) -> None:
        """Handle update of a todo item (including completion)."""
        if not item.uid:
            return

        existing = self._store.get_todo_item(item.uid)
        if existing is None:
            return

        updates: dict[str, Any] = {}
        if item.summary is not None:
            updates["summary"] = item.summary
        if item.description is not None:
            updates["description"] = item.description
        if item.due is not None:
            updates["due"] = (
                item.due.isoformat()
                if isinstance(item.due, date)
                else item.due.date().isoformat()
            )

        # Detect completion
        was_completed = existing.get("status") == "completed"
        if item.status is not None:
            new_status = (
                "completed"
                if item.status == TodoItemStatus.COMPLETED
                else "needs_action"
            )
            updates["status"] = new_status

            # Record completion if newly completed
            if new_status == "completed" and not was_completed:
                chore_id = existing.get("chore_id")
                if chore_id:
                    await self._store.async_record_completion(chore_id)
                    _LOGGER.info(
                        "Chore completed via todo: %s", existing.get("summary")
                    )

        await self._store.async_update_todo_item(item.uid, **updates)

        # Auto-remove one-time chores after completion
        if (
            item.status is not None
            and item.status == TodoItemStatus.COMPLETED
            and not was_completed
        ):
            chore_id = existing.get("chore_id")
            if chore_id:
                chore = self._store.get_chore(chore_id)
                if chore and chore.get("schedule", {}).get("type") == SCHEDULE_ONCE:
                    await self._store.async_delete_todo_items([item.uid])
                    await self._store.async_delete_chore(chore_id)
                    _LOGGER.info(
                        "Auto-removed one-time chore after completion: %s",
                        existing.get("summary"),
                    )

        self.async_write_ha_state()

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        """Handle deletion of todo items."""
        await self._store.async_delete_todo_items(uids)
        self.async_write_ha_state()
