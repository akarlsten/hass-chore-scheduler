"""Data storage for the Chore Scheduler integration."""
from __future__ import annotations

import uuid
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import (
    STORAGE_KEY,
    STORAGE_VERSION,
    ASSIGNMENT_UNASSIGNED,
    SCHEDULE_WEEKLY,
)


class ChoreStore:
    """Class to manage chore data storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the chore store."""
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, STORAGE_KEY
        )
        self._chores: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        """Load chores from storage."""
        data = await self._store.async_load()
        if data is not None:
            self._chores = data.get("chores", {})

    async def async_save(self) -> None:
        """Save chores to storage."""
        await self._store.async_save({"chores": self._chores})

    @callback
    def get_chores(self) -> list[dict[str, Any]]:
        """Get all chores."""
        return list(self._chores.values())

    @callback
    def get_chore(self, chore_id: str) -> dict[str, Any] | None:
        """Get a single chore by ID."""
        return self._chores.get(chore_id)

    async def async_add_chore(
        self,
        name: str,
        description: str = "",
        schedule: dict[str, Any] | None = None,
        assignment: dict[str, Any] | None = None,
        target_todo_list: str | None = None,
        notifications: dict[str, Any] | None = None,
        enabled: bool = True,
    ) -> dict[str, Any]:
        """Add a new chore."""
        chore_id = str(uuid.uuid4())

        # Default schedule: weekly on Sunday at 10:00
        if schedule is None:
            schedule = {
                "type": SCHEDULE_WEEKLY,
                "days": ["sunday"],
                "time": "10:00",
                "interval": 1,
            }

        # Default assignment: unassigned
        if assignment is None:
            assignment = {
                "mode": ASSIGNMENT_UNASSIGNED,
                "assignees": [],
                "current_index": 0,
            }

        # Default notifications: disabled
        if notifications is None:
            notifications = {
                "enabled": False,
                "remind_before": 60,
                "notify_targets": [],
            }

        chore = {
            "id": chore_id,
            "name": name,
            "description": description,
            "schedule": schedule,
            "assignment": assignment,
            "target_todo_list": target_todo_list,
            "notifications": notifications,
            "enabled": enabled,
            "last_triggered": None,
        }

        self._chores[chore_id] = chore
        await self.async_save()
        return chore

    async def async_update_chore(
        self, chore_id: str, **kwargs: Any
    ) -> dict[str, Any] | None:
        """Update an existing chore."""
        if chore_id not in self._chores:
            return None

        chore = self._chores[chore_id]
        for key, value in kwargs.items():
            if key in chore and value is not None:
                chore[key] = value

        await self.async_save()
        return chore

    async def async_delete_chore(self, chore_id: str) -> bool:
        """Delete a chore."""
        if chore_id not in self._chores:
            return False

        del self._chores[chore_id]
        await self.async_save()
        return True

    async def async_set_last_triggered(
        self, chore_id: str, timestamp: str
    ) -> None:
        """Update the last triggered timestamp for a chore."""
        if chore_id in self._chores:
            self._chores[chore_id]["last_triggered"] = timestamp
            await self.async_save()

    async def async_rotate_assignment(self, chore_id: str) -> str | None:
        """Rotate to the next assignee and return the current one."""
        if chore_id not in self._chores:
            return None

        chore = self._chores[chore_id]
        assignment = chore.get("assignment", {})

        if assignment.get("mode") != "rotating":
            return None

        assignees = assignment.get("assignees", [])
        if not assignees:
            return None

        current_index = assignment.get("current_index", 0)
        current_assignee = assignees[current_index]

        # Rotate to next
        assignment["current_index"] = (current_index + 1) % len(assignees)
        await self.async_save()

        return current_assignee
