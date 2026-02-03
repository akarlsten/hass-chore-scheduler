"""Coordinator for the Chore Scheduler integration."""
from __future__ import annotations

import calendar
from datetime import datetime, timedelta
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    SCHEDULE_ONCE,
    SCHEDULE_DAILY,
    SCHEDULE_WEEKLY,
    SCHEDULE_MONTHLY,
    CONF_DEFAULT_TODO_LIST,
)
from .store import ChoreStore

_LOGGER = logging.getLogger(__name__)

# Check for due chores every minute
UPDATE_INTERVAL = timedelta(minutes=1)


class ChoreSchedulerCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator to manage chore scheduling."""

    def __init__(
        self,
        hass: HomeAssistant,
        store: ChoreStore,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
        )
        self.store = store
        self.entry = entry
        self._processed_today: set[str] = set()

    async def _async_update_data(self) -> dict[str, Any]:
        """Check for due chores and create todos."""
        now = dt_util.now()
        chores = self.store.get_chores()

        # Reset processed set at midnight
        if now.hour == 0 and now.minute == 0:
            self._processed_today.clear()

        due_chores = []
        next_chore = None
        next_chore_time = None

        for chore in chores:
            if not chore.get("enabled", True):
                continue

            is_due, scheduled_time = self._check_if_due(chore, now)

            if is_due and chore["id"] not in self._processed_today:
                due_chores.append(chore)
                self._processed_today.add(chore["id"])
                await self.async_trigger_chore(chore)

            # Track next upcoming chore
            if scheduled_time and scheduled_time > now:
                if next_chore_time is None or scheduled_time < next_chore_time:
                    next_chore = chore
                    next_chore_time = scheduled_time

        return {
            "chores": chores,
            "due_count": len(due_chores),
            "next_chore": next_chore,
            "next_chore_time": next_chore_time,
        }

    def _check_if_due(
        self, chore: dict[str, Any], now: datetime
    ) -> tuple[bool, datetime | None]:
        """Check if a chore is due now."""
        schedule = chore.get("schedule", {})
        schedule_type = schedule.get("type", SCHEDULE_WEEKLY)
        scheduled_time_str = schedule.get("time", "10:00")

        try:
            hour, minute = map(int, scheduled_time_str.split(":"))
        except (ValueError, AttributeError):
            hour, minute = 10, 0

        # Build the scheduled datetime for today
        scheduled_today = now.replace(
            hour=hour, minute=minute, second=0, microsecond=0
        )

        # Check if we're within the trigger window (same minute)
        is_trigger_time = (
            now.hour == hour
            and now.minute == minute
        )

        if schedule_type == SCHEDULE_ONCE:
            # One-time chores trigger on the specified date and time
            scheduled_date_str = schedule.get("date")
            if scheduled_date_str:
                try:
                    scheduled_date = datetime.strptime(scheduled_date_str, "%Y-%m-%d").date()
                    if now.date() == scheduled_date and is_trigger_time:
                        return True, scheduled_today
                    # Build next occurrence datetime
                    scheduled_dt = now.replace(
                        year=scheduled_date.year,
                        month=scheduled_date.month,
                        day=scheduled_date.day,
                        hour=hour,
                        minute=minute,
                        second=0,
                        microsecond=0,
                    )
                    return False, scheduled_dt if scheduled_dt > now else None
                except ValueError:
                    pass
            # Fallback: trigger at specified time today if no date set
            return is_trigger_time, scheduled_today

        if schedule_type == SCHEDULE_DAILY:
            return is_trigger_time, scheduled_today

        elif schedule_type == SCHEDULE_WEEKLY:
            days = schedule.get("days", ["sunday"])
            current_day = now.strftime("%A").lower()

            if current_day in days and is_trigger_time:
                return True, scheduled_today

            # Find next occurrence
            next_time = self._find_next_weekly(now, days, hour, minute)
            return False, next_time

        elif schedule_type == SCHEDULE_MONTHLY:
            day_of_month = schedule.get("day_of_month", 1)
            # Clamp to last day of current month (e.g., day 31 -> day 30 in April)
            last_day_of_month = calendar.monthrange(now.year, now.month)[1]
            effective_day = min(day_of_month, last_day_of_month)

            if now.day == effective_day and is_trigger_time:
                return True, scheduled_today

            # Find next occurrence
            next_time = self._find_next_monthly(now, day_of_month, hour, minute)
            return False, next_time

        return False, None

    def _find_next_weekly(
        self,
        now: datetime,
        days: list[str],
        hour: int,
        minute: int,
    ) -> datetime | None:
        """Find the next occurrence for a weekly schedule."""
        weekday_map = {
            "monday": 0,
            "tuesday": 1,
            "wednesday": 2,
            "thursday": 3,
            "friday": 4,
            "saturday": 5,
            "sunday": 6,
        }

        target_weekdays = [weekday_map[d] for d in days if d in weekday_map]
        if not target_weekdays:
            return None

        current_weekday = now.weekday()
        scheduled_time = now.replace(
            hour=hour, minute=minute, second=0, microsecond=0
        )

        # Check remaining days this week
        for days_ahead in range(7):
            check_weekday = (current_weekday + days_ahead) % 7
            if check_weekday in target_weekdays:
                next_time = scheduled_time + timedelta(days=days_ahead)
                if next_time > now:
                    return next_time

        # Fallback to first matching day next week
        min_days = min(
            (d - current_weekday) % 7 or 7 for d in target_weekdays
        )
        return scheduled_time + timedelta(days=min_days)

    def _find_next_monthly(
        self,
        now: datetime,
        day_of_month: int,
        hour: int,
        minute: int,
    ) -> datetime | None:
        """Find the next occurrence for a monthly schedule."""
        # Clamp to last day of current month
        last_day_this_month = calendar.monthrange(now.year, now.month)[1]
        effective_day = min(day_of_month, last_day_this_month)

        scheduled_time = now.replace(
            day=effective_day,
            hour=hour,
            minute=minute,
            second=0,
            microsecond=0,
        )

        if scheduled_time > now:
            return scheduled_time

        # Move to next month and clamp again
        if now.month == 12:
            next_year, next_month = now.year + 1, 1
        else:
            next_year, next_month = now.year, now.month + 1

        last_day_next_month = calendar.monthrange(next_year, next_month)[1]
        effective_day_next = min(day_of_month, last_day_next_month)

        return scheduled_time.replace(
            year=next_year,
            month=next_month,
            day=effective_day_next
        )

    async def async_trigger_chore(self, chore: dict[str, Any]) -> None:
        """Trigger a chore - create todo and send notification."""
        # Get target todo list
        target_list = chore.get("target_todo_list") or self.entry.data.get(
            CONF_DEFAULT_TODO_LIST
        )

        if not target_list:
            _LOGGER.warning(
                "No todo list configured for chore: %s", chore["name"]
            )
            return

        # Check for existing todo (deduplication)
        if await self._todo_exists(target_list, chore["name"]):
            _LOGGER.debug(
                "Todo already exists for chore: %s", chore["name"]
            )
            return

        # Get current assignee if rotating
        assignee = None
        assignment = chore.get("assignment", {})
        if assignment.get("mode") == "rotating":
            assignee = await self.store.async_rotate_assignment(chore["id"])
        elif assignment.get("mode") == "fixed":
            assignees = assignment.get("assignees", [])
            assignee = assignees[0] if assignees else None

        # Build todo item summary
        summary = chore["name"]
        if assignee:
            # Extract person name from entity_id like "person.adam"
            assignee_name = assignee.split(".")[-1].replace("_", " ").title()
            summary = f"{chore['name']} ({assignee_name})"

        # Create todo item
        await self._create_todo(target_list, summary, chore.get("description"))

        # Update last triggered
        await self.store.async_set_last_triggered(
            chore["id"], dt_util.now().isoformat()
        )

        # Auto-disable "once" chores after triggering
        schedule = chore.get("schedule", {})
        if schedule.get("type") == SCHEDULE_ONCE:
            await self.store.async_update_chore(chore["id"], {"enabled": False})
            _LOGGER.info("Auto-disabled one-time chore: %s", chore["name"])

        # Send notification
        await self._send_notification(chore, assignee)

    async def _todo_exists(self, todo_list: str, item_name: str) -> bool:
        """Check if a todo item already exists."""
        try:
            result = await self.hass.services.async_call(
                "todo",
                "get_items",
                {"entity_id": todo_list},
                blocking=True,
                return_response=True,
            )

            if result and todo_list in result:
                items = result[todo_list].get("items", [])
                for item in items:
                    # Check if item exists and is not completed
                    if (
                        item.get("summary", "").startswith(item_name.split(" (")[0])
                        and item.get("status") != "completed"
                    ):
                        return True

        except Exception as err:
            _LOGGER.error("Error checking for existing todo: %s", err)

        return False

    async def _create_todo(
        self,
        todo_list: str,
        summary: str,
        description: str | None = None,
    ) -> None:
        """Create a todo item."""
        try:
            service_data: dict[str, Any] = {
                "entity_id": todo_list,
                "item": summary,
            }
            if description:
                service_data["description"] = description

            await self.hass.services.async_call(
                "todo",
                "add_item",
                service_data,
                blocking=True,
            )
            _LOGGER.info("Created todo: %s", summary)

        except Exception as err:
            _LOGGER.error("Error creating todo: %s", err)

    async def _send_notification(
        self,
        chore: dict[str, Any],
        assignee: str | None = None,
    ) -> None:
        """Send notification for a chore."""
        notifications = chore.get("notifications", {})

        if not notifications.get("enabled", False):
            return

        notify_targets = notifications.get("notify_targets", [])
        if not notify_targets:
            return

        message = f"Time to: {chore['name']}"
        if chore.get("description"):
            message += f"\n{chore['description']}"

        for target in notify_targets:
            try:
                # Target format: "notify.mobile_app_xxx"
                service_name = target.split(".", 1)[-1] if "." in target else target

                await self.hass.services.async_call(
                    "notify",
                    service_name,
                    {
                        "title": "Chore Reminder",
                        "message": message,
                        "data": {
                            "tag": f"chore_{chore['id']}",
                            "group": "chores",
                        },
                    },
                    blocking=True,
                )
                _LOGGER.debug("Sent notification for: %s", chore["name"])

            except Exception as err:
                _LOGGER.error(
                    "Error sending notification to %s: %s", target, err
                )
