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

        # Send notification (independent of todo creation)
        await self._send_notification(chore, assignee)

        # Create todo item in our own todo list (dedup check)
        if not self.store.todo_item_exists_for_chore(chore["id"]):
            await self.store.async_add_todo_item(
                summary=summary,
                chore_id=chore["id"],
                description=chore.get("description"),
            )
            _LOGGER.info("Created todo: %s", summary)

            # Notify the todo entity to update HA state
            self._notify_todo_entity()
        else:
            _LOGGER.debug(
                "Todo already exists for chore: %s", chore["name"]
            )

        # Update last triggered
        await self.store.async_set_last_triggered(
            chore["id"], dt_util.now().isoformat()
        )

        # Auto-disable "once" chores after triggering
        schedule = chore.get("schedule", {})
        if schedule.get("type") == SCHEDULE_ONCE:
            await self.store.async_update_chore(chore["id"], {"enabled": False})
            _LOGGER.info("Auto-disabled one-time chore: %s", chore["name"])

    def _notify_todo_entity(self) -> None:
        """Notify the todo entity to update its HA state."""
        for entry_data in self.hass.data.get(DOMAIN, {}).values():
            if isinstance(entry_data, dict):
                todo_entity = entry_data.get("todo_entity")
                if todo_entity:
                    todo_entity.async_write_ha_state()
                    break

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
            _LOGGER.debug("No notify targets for chore: %s", chore["name"])
            return

        message = f"Time to: {chore['name']}"
        if chore.get("description"):
            message += f"\n{chore['description']}"

        for target in notify_targets:
            # Handle persistent_notification separately
            if target == "persistent_notification":
                await self._send_persistent_notification(chore)
                continue

            try:
                # Target format: "notify.mobile_app_xxx" or "mobile_app_xxx"
                if "." in target:
                    domain, service_name = target.split(".", 1)
                else:
                    domain = "notify"
                    service_name = target

                # Verify service exists before calling
                if not self.hass.services.has_service(domain, service_name):
                    _LOGGER.warning(
                        "Notify service %s.%s not found for chore: %s",
                        domain,
                        service_name,
                        chore["name"],
                    )
                    continue

                await self.hass.services.async_call(
                    domain,
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
                _LOGGER.info(
                    "Sent notification for chore '%s' to %s.%s",
                    chore["name"],
                    domain,
                    service_name,
                )

            except Exception as err:
                _LOGGER.error(
                    "Failed to send notification to %s for chore '%s': %s",
                    target,
                    chore["name"],
                    err,
                    exc_info=True,
                )

    async def _send_persistent_notification(
        self, chore: dict[str, Any]
    ) -> None:
        """Send a persistent notification for a chore."""
        try:
            message = f"Time to: {chore['name']}"
            if chore.get("description"):
                message += f"\n{chore['description']}"

            await self.hass.services.async_call(
                "persistent_notification",
                "create",
                {
                    "title": f"Chore: {chore['name']}",
                    "message": message,
                    "notification_id": f"chore_{chore['id']}",
                },
                blocking=True,
            )
            _LOGGER.info(
                "Sent persistent notification for chore: %s", chore["name"]
            )
        except Exception as err:
            _LOGGER.error(
                "Failed to send persistent notification for chore '%s': %s",
                chore["name"],
                err,
                exc_info=True,
            )
