"""Data storage for the Chore Scheduler integration."""
from __future__ import annotations

import uuid
from contextlib import asynccontextmanager
from datetime import date, datetime
from typing import Any, AsyncIterator

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

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
        self._todo_items: dict[str, dict[str, Any]] = {}
        self._completion_history: dict[str, dict[str, Any]] = {}
        self._version: int = 0
        self._batch_depth: int = 0
        self._save_pending: bool = False

    @property
    def version(self) -> int:
        """Return the data version counter (increments on every save)."""
        return self._version

    @asynccontextmanager
    async def batch(self) -> AsyncIterator[None]:
        """Batch multiple mutations into a single disk write."""
        self._batch_depth += 1
        try:
            yield
        finally:
            self._batch_depth -= 1
            if self._batch_depth == 0 and self._save_pending:
                self._save_pending = False
                await self.async_save()

    async def async_load(self) -> None:
        """Load data from storage."""
        data = await self._store.async_load()
        if data is not None:
            self._chores = data.get("chores", {})
            # Migrate from v1: add todo_items and completion_history if missing
            todo_items_list = data.get("todo_items", [])
            if isinstance(todo_items_list, list):
                self._todo_items = {i["uid"]: i for i in todo_items_list}
            else:
                self._todo_items = todo_items_list
            self._completion_history = data.get("completion_history", {})

    async def async_save(self) -> None:
        """Save all data to storage."""
        self._version += 1
        await self._store.async_save({
            "chores": self._chores,
            "todo_items": list(self._todo_items.values()),
            "completion_history": self._completion_history,
        })

    async def _request_save(self) -> None:
        """Save immediately or defer if inside a batch."""
        if self._batch_depth > 0:
            self._save_pending = True
        else:
            await self.async_save()

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
            "notifications": notifications,
            "enabled": enabled,
            "last_triggered": None,
        }

        self._chores[chore_id] = chore
        await self._request_save()
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

        await self._request_save()
        return chore

    async def async_delete_chore(self, chore_id: str) -> bool:
        """Delete a chore."""
        if chore_id not in self._chores:
            return False

        del self._chores[chore_id]
        await self._request_save()
        return True

    async def async_set_last_triggered(
        self, chore_id: str, timestamp: str
    ) -> None:
        """Update the last triggered timestamp for a chore."""
        if chore_id in self._chores:
            self._chores[chore_id]["last_triggered"] = timestamp
            await self._request_save()

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
        await self._request_save()

        return current_assignee

    # ── Todo item methods ──────────────────────────────────────────────

    @callback
    def get_todo_items(self) -> list[dict[str, Any]]:
        """Get all todo items."""
        return list(self._todo_items.values())

    @callback
    def get_todo_item(self, uid: str) -> dict[str, Any] | None:
        """Get a single todo item by UID."""
        return self._todo_items.get(uid)

    @callback
    def todo_item_exists_for_chore(self, chore_id: str) -> bool:
        """Check if a non-completed todo item already exists for a chore."""
        return any(
            item["chore_id"] == chore_id and item["status"] != "completed"
            for item in self._todo_items.values()
        )

    async def async_add_todo_item(
        self,
        summary: str,
        chore_id: str,
        description: str | None = None,
        due: str | None = None,
    ) -> dict[str, Any]:
        """Add a new todo item."""
        uid = str(uuid.uuid4())
        item = {
            "uid": uid,
            "summary": summary,
            "status": "needs_action",
            "description": description,
            "due": due or dt_util.now().date().isoformat(),
            "chore_id": chore_id,
            "created_at": dt_util.now().isoformat(),
            "completed_at": None,
            "reminder_sent": False,
        }
        self._todo_items[uid] = item
        await self._request_save()
        return item

    async def async_update_todo_item(
        self, uid: str, **kwargs: Any
    ) -> dict[str, Any] | None:
        """Update an existing todo item."""
        if uid not in self._todo_items:
            return None

        item = self._todo_items[uid]
        for key, value in kwargs.items():
            if key in item:
                item[key] = value

        # Track completion timestamp
        if kwargs.get("status") == "completed" and item.get("completed_at") is None:
            item["completed_at"] = dt_util.now().isoformat()

        await self._request_save()
        return item

    async def async_mark_reminder_sent(self, uid: str) -> None:
        """Mark a todo item's reminder as sent."""
        if uid in self._todo_items:
            self._todo_items[uid]["reminder_sent"] = True
            await self._request_save()

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        """Delete todo items by UIDs."""
        for uid in uids:
            self._todo_items.pop(uid, None)
        await self._request_save()

    # ── Completion history methods ─────────────────────────────────────

    @callback
    def get_completion_stats(self, chore_id: str) -> dict[str, Any]:
        """Get completion stats for a chore."""
        return self._completion_history.get(chore_id, {
            "last_completed": None,
            "streak": 0,
            "total_completions": 0,
        })

    async def async_record_completion(self, chore_id: str) -> dict[str, Any]:
        """Record a chore completion and update streak."""
        now = dt_util.now()
        stats = self._completion_history.get(chore_id, {
            "last_completed": None,
            "streak": 0,
            "total_completions": 0,
        })

        # Update streak: if last completion was yesterday, increment; otherwise reset to 1
        last = stats.get("last_completed")
        if last:
            try:
                last_date = datetime.fromisoformat(last).date()
                delta = (now.date() - last_date).days
                if delta == 1:
                    stats["streak"] = stats.get("streak", 0) + 1
                elif delta == 0:
                    pass  # Same day, don't change streak
                else:
                    stats["streak"] = 1
            except (ValueError, TypeError):
                stats["streak"] = 1
        else:
            stats["streak"] = 1

        stats["last_completed"] = now.isoformat()
        stats["total_completions"] = stats.get("total_completions", 0) + 1

        self._completion_history[chore_id] = stats
        await self._request_save()
        return stats
