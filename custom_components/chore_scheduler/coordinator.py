"""Coordinator for the Chore Scheduler integration."""
from __future__ import annotations

import asyncio
import calendar
from datetime import datetime, timedelta
import logging
from typing import Any, Callable

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_point_in_time
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    SCHEDULE_ONCE,
    SCHEDULE_DAILY,
    SCHEDULE_WEEKLY,
    SCHEDULE_MONTHLY,
    CONF_TTS_ENABLED,
    CONF_TTS_TARGETS,
    CONF_TTS_SERVICE,
    CONF_TTS_LANGUAGE,
    CONF_QUIET_HOURS_START,
    CONF_QUIET_HOURS_END,
    CONF_REMINDER_DELAY_HOURS,
    DEFAULT_TTS_LANGUAGE,
    DEFAULT_QUIET_HOURS_START,
    DEFAULT_QUIET_HOURS_END,
    DEFAULT_REMINDER_DELAY_HOURS,
    DEFAULT_TTS_SERVICE,
    CONF_CAST_ENABLED,
    CONF_CAST_TARGET,
    CONF_CAST_DASHBOARD,
    CONF_CAST_VIEW,
    CONF_CAST_DURATION,
    DEFAULT_CAST_DURATION,
)
from .store import ChoreStore
from .tts_messages import get_tts_message

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
        self._cast_timer_cancel: Callable[[], None] | None = None

    async def _async_update_data(self) -> dict[str, Any]:
        """Check for due chores and create todos."""
        now = dt_util.now()
        chores = self.store.get_chores()

        _LOGGER.debug(
            "Checking %d chores at %s", len(chores), now.strftime("%H:%M:%S")
        )

        due_chores = []
        next_chore = None
        next_chore_time = None

        for chore in chores:
            if not chore.get("enabled", True):
                continue

            try:
                is_due, scheduled_time = self._check_if_due(chore, now)

                if is_due:
                    due_chores.append(chore)
                    _LOGGER.info(
                        "Chore '%s' is due, triggering", chore["name"]
                    )
                    await self.async_trigger_chore(chore)

                # Track next upcoming chore
                if scheduled_time and scheduled_time > now:
                    if next_chore_time is None or scheduled_time < next_chore_time:
                        next_chore = chore
                        next_chore_time = scheduled_time

            except Exception:
                _LOGGER.exception(
                    "Error processing chore '%s'", chore.get("name", "?")
                )

        # Check for overdue todo items needing TTS reminders
        await self._check_reminders()

        return {
            "chores": chores,
            "due_count": len(due_chores),
            "next_chore": next_chore,
            "next_chore_time": next_chore_time,
        }

    def _already_triggered_today(
        self, chore: dict[str, Any], now: datetime
    ) -> bool:
        """Check if a chore was already triggered today."""
        last_triggered = chore.get("last_triggered")
        if not last_triggered:
            return False
        try:
            last_dt = datetime.fromisoformat(last_triggered)
            return last_dt.date() == now.date()
        except (ValueError, TypeError):
            return False

    def _check_if_due(
        self, chore: dict[str, Any], now: datetime
    ) -> tuple[bool, datetime | None]:
        """Check if a chore is due.

        A chore is due when:
        1. The scheduled time has passed (now >= scheduled time)
        2. It hasn't already been triggered today (based on last_triggered)
        3. The schedule matches today (correct day of week/month/date)
        """
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

        # Has the scheduled time passed today?
        time_has_passed = now >= scheduled_today

        # Was this chore already triggered today?
        already_done = self._already_triggered_today(chore, now)

        if schedule_type == SCHEDULE_ONCE:
            scheduled_date_str = schedule.get("date")
            if scheduled_date_str:
                try:
                    scheduled_date = datetime.strptime(
                        scheduled_date_str, "%Y-%m-%d"
                    ).date()
                    if now.date() == scheduled_date and time_has_passed and not already_done:
                        return True, scheduled_today
                    # Build next occurrence datetime for tracking
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
            if time_has_passed and not already_done:
                return True, scheduled_today
            return False, scheduled_today if not time_has_passed else None

        if schedule_type == SCHEDULE_DAILY:
            if time_has_passed and not already_done:
                return True, scheduled_today
            # Next occurrence is tomorrow if already passed
            if time_has_passed:
                return False, scheduled_today + timedelta(days=1)
            return False, scheduled_today

        if schedule_type == SCHEDULE_WEEKLY:
            days = schedule.get("days", ["sunday"])
            current_day = now.strftime("%A").lower()

            if current_day in days and time_has_passed and not already_done:
                return True, scheduled_today

            # Find next occurrence
            next_time = self._find_next_weekly(now, days, hour, minute)
            return False, next_time

        if schedule_type == SCHEDULE_MONTHLY:
            day_of_month = schedule.get("day_of_month", 1)
            last_day_of_month = calendar.monthrange(now.year, now.month)[1]
            effective_day = min(day_of_month, last_day_of_month)

            if now.day == effective_day and time_has_passed and not already_done:
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

        # Check remaining days this week (including today if time hasn't passed)
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

        # Move to next month
        if now.month == 12:
            next_year, next_month = now.year + 1, 1
        else:
            next_year, next_month = now.year, now.month + 1

        last_day_next_month = calendar.monthrange(next_year, next_month)[1]
        effective_day_next = min(day_of_month, last_day_next_month)

        return scheduled_time.replace(
            year=next_year,
            month=next_month,
            day=effective_day_next,
        )

    async def async_trigger_chore(self, chore: dict[str, Any]) -> None:
        """Trigger a chore - create todo and send notification."""
        _LOGGER.info("Triggering chore: %s", chore["name"])

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
            assignee_name = assignee.split(".")[-1].replace("_", " ").title()
            summary = f"{chore['name']} ({assignee_name})"

        # Send notification (independent of todo creation)
        await self._send_notification(chore, assignee)

        # Send TTS announcement
        await self._send_tts_for_chore(chore, assignee, is_reminder=False)

        # Cast dashboard to display
        await self._cast_dashboard_for_chore(chore)

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
            await self.store.async_update_chore(chore["id"], enabled=False)
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

    # ── TTS Methods ─────────────────────────────────────────────────

    def _get_first_name(self, assignee_entity_id: str) -> str:
        """Get the first name from a person entity's friendly_name."""
        state = self.hass.states.get(assignee_entity_id)
        if state and state.attributes.get("friendly_name"):
            return state.attributes["friendly_name"].split()[0]
        # Fallback to entity_id parsing
        return (
            assignee_entity_id.split(".")[-1]
            .replace("_", " ")
            .title()
            .split()[0]
        )

    def _get_language(self) -> str:
        """Get the configured TTS language, falling back to HA system language."""
        lang = self.entry.options.get(CONF_TTS_LANGUAGE, DEFAULT_TTS_LANGUAGE)
        if lang == "auto":
            return self.hass.config.language or "en"
        return lang

    def _is_quiet_hours(self) -> bool:
        """Check if current time is within quiet hours."""
        now = dt_util.now()
        options = self.entry.options

        start_str = options.get(CONF_QUIET_HOURS_START, DEFAULT_QUIET_HOURS_START)
        end_str = options.get(CONF_QUIET_HOURS_END, DEFAULT_QUIET_HOURS_END)

        try:
            start_parts = str(start_str).split(":")
            end_parts = str(end_str).split(":")
            start_minutes = int(start_parts[0]) * 60 + int(start_parts[1])
            end_minutes = int(end_parts[0]) * 60 + int(end_parts[1])
        except (ValueError, IndexError):
            # Fallback to defaults
            start_minutes = 21 * 60  # 21:00
            end_minutes = 9 * 60  # 09:00

        current_minutes = now.hour * 60 + now.minute

        if start_minutes > end_minutes:
            # Spans midnight (e.g., 21:00 to 09:00)
            return current_minutes >= start_minutes or current_minutes < end_minutes
        else:
            # Same day (e.g., 22:00 to 23:00)
            return start_minutes <= current_minutes < end_minutes

    def _get_tts_targets(self) -> list[str]:
        """Get the configured TTS media_player targets."""
        options = self.entry.options
        tts_enabled = options.get(CONF_TTS_ENABLED, False)
        if not tts_enabled:
            _LOGGER.debug("TTS is disabled in options (CONF_TTS_ENABLED=%s)", tts_enabled)
            return []
        targets = options.get(CONF_TTS_TARGETS, [])
        if not targets:
            _LOGGER.debug("TTS enabled but no targets configured (CONF_TTS_TARGETS=%s)", targets)
        return targets

    async def _send_tts(self, message: str) -> None:
        """Send a TTS announcement to configured media players."""
        if self._is_quiet_hours():
            _LOGGER.debug("Skipping TTS - quiet hours active")
            return

        targets = self._get_tts_targets()
        if not targets:
            _LOGGER.debug("Skipping TTS - no targets configured or TTS disabled")
            return

        options = self.entry.options
        tts_service = options.get(CONF_TTS_SERVICE, DEFAULT_TTS_SERVICE)
        language = self._get_language()

        for target in targets:
            try:
                service_data: dict[str, Any] = {
                    "entity_id": target,
                    "message": message,
                }
                # google_translate_say needs explicit language; cloud_say uses system language
                if tts_service == "google_translate_say":
                    service_data["language"] = language

                if self.hass.services.has_service("tts", tts_service):
                    _LOGGER.debug(
                        "Calling tts.%s for %s with data: %s",
                        tts_service, target, service_data,
                    )
                    await self.hass.services.async_call(
                        "tts",
                        tts_service,
                        service_data,
                        blocking=True,
                    )
                    _LOGGER.info("Sent TTS to %s: %s", target, message)
                else:
                    _LOGGER.warning(
                        "TTS service tts.%s not available", tts_service
                    )

            except Exception as err:
                _LOGGER.error(
                    "Failed TTS to %s: %s", target, err, exc_info=True
                )

    async def _send_tts_for_chore(
        self,
        chore: dict[str, Any],
        assignee: str | None,
        is_reminder: bool,
    ) -> None:
        """Build and send TTS message for a chore trigger or reminder."""
        if not self._get_tts_targets():
            _LOGGER.debug(
                "Skipping TTS for chore '%s' - no targets configured or TTS disabled",
                chore.get("name", "?"),
            )
            return

        language = self._get_language()

        if is_reminder:
            if assignee:
                first_name = self._get_first_name(assignee)
                message = get_tts_message(
                    language,
                    "chore_reminder_assigned",
                    name=first_name,
                    chore=chore["name"],
                )
            else:
                message = get_tts_message(
                    language, "chore_reminder", chore=chore["name"]
                )
        else:
            if assignee:
                first_name = self._get_first_name(assignee)
                message = get_tts_message(
                    language,
                    "chore_trigger",
                    name=first_name,
                    chore=chore["name"],
                )
            else:
                message = get_tts_message(
                    language,
                    "chore_trigger_unassigned",
                    chore=chore["name"],
                )

        await self._send_tts(message)

    def _get_current_assignee(self, chore: dict[str, Any]) -> str | None:
        """Get the current assignee entity_id without rotating."""
        assignment = chore.get("assignment", {})
        if assignment.get("mode") == "rotating":
            assignees = assignment.get("assignees", [])
            if assignees:
                idx = assignment.get("current_index", 0)
                # current_index points to NEXT, so the last assigned is previous
                return assignees[(idx - 1) % len(assignees)]
        elif assignment.get("mode") == "fixed":
            assignees = assignment.get("assignees", [])
            return assignees[0] if assignees else None
        return None

    async def _check_reminders(self) -> None:
        """Check for incomplete todo items that need a TTS reminder."""
        if not self._get_tts_targets():
            return

        now = dt_util.now()
        options = self.entry.options
        global_delay = options.get(
            CONF_REMINDER_DELAY_HOURS, DEFAULT_REMINDER_DELAY_HOURS
        )

        for item in self.store.get_todo_items():
            if item["status"] == "completed":
                continue
            if item.get("reminder_sent", False):
                continue

            chore_id = item.get("chore_id")
            if not chore_id:
                continue

            chore = self.store.get_chore(chore_id)
            if not chore:
                continue

            try:
                created_at = datetime.fromisoformat(item["created_at"])
            except (ValueError, TypeError):
                continue

            threshold = created_at + timedelta(hours=global_delay)
            if now >= threshold:
                assignee = self._get_current_assignee(chore)
                await self._send_tts_for_chore(
                    chore, assignee, is_reminder=True
                )

                # Mark reminder as sent to avoid repeating
                await self.store.async_mark_reminder_sent(item["uid"])

    # ── Cast Methods ───────────────────────────────────────────────

    async def _cast_dashboard_for_chore(self, chore: dict[str, Any]) -> None:
        """Cast dashboard to display when chore triggers."""
        if self._is_quiet_hours():
            _LOGGER.debug("Skipping cast - quiet hours active")
            return

        options = self.entry.options
        cast_enabled = options.get(CONF_CAST_ENABLED, False)
        cast_target = options.get(CONF_CAST_TARGET)
        cast_dashboard = options.get(CONF_CAST_DASHBOARD)
        cast_duration = options.get(CONF_CAST_DURATION, DEFAULT_CAST_DURATION)

        if not cast_enabled or not cast_target or not cast_dashboard:
            _LOGGER.debug(
                "Skipping cast for chore '%s' - cast disabled or not configured",
                chore.get("name", "?"),
            )
            return

        # Check if cast target overlaps with TTS targets - add delay for TTS to finish
        tts_targets = options.get(CONF_TTS_TARGETS, [])
        if cast_target in tts_targets:
            _LOGGER.debug(
                "Cast target %s is also a TTS target, waiting 10s for TTS to complete",
                cast_target,
            )
            await asyncio.sleep(10)

        # Cancel any existing cast timer
        if self._cast_timer_cancel:
            self._cast_timer_cancel()
            self._cast_timer_cancel = None

        # Cast the dashboard
        try:
            service_data: dict[str, Any] = {
                "entity_id": cast_target,
                "dashboard_path": cast_dashboard,
            }
            cast_view = options.get(CONF_CAST_VIEW)
            if cast_view:
                service_data["view_path"] = cast_view

            await self.hass.services.async_call(
                "cast", "show_lovelace_view", service_data, blocking=True
            )
            _LOGGER.info(
                "Cast dashboard '%s' to %s for chore '%s'",
                cast_dashboard,
                cast_target,
                chore.get("name", "?"),
            )
        except Exception as err:
            _LOGGER.warning(
                "Failed to cast dashboard for chore '%s': %s",
                chore.get("name", "?"),
                err,
            )
            return

        # Schedule timer to stop casting
        stop_time = dt_util.utcnow() + timedelta(minutes=cast_duration)
        self._cast_timer_cancel = async_track_point_in_time(
            self.hass, self._async_stop_cast, stop_time
        )
        _LOGGER.debug(
            "Scheduled cast stop for %s in %d minutes", cast_target, cast_duration
        )

    def check_cast_all_done(self) -> None:
        """If casting and all todos are done, shorten the cast timer to 1 minute."""
        if not self._cast_timer_cancel:
            return

        items = self.store.get_todo_items()
        if not items:
            return

        all_done = all(item.get("status") == "completed" for item in items)
        if not all_done:
            return

        _LOGGER.info("All chores completed while casting - stopping cast in 1 minute")
        self._cast_timer_cancel()
        stop_time = dt_util.utcnow() + timedelta(minutes=1)
        self._cast_timer_cancel = async_track_point_in_time(
            self.hass, self._async_stop_cast, stop_time
        )

    async def _async_stop_cast(self, now: datetime) -> None:
        """Stop casting after timeout."""
        self._cast_timer_cancel = None
        cast_target = self.entry.options.get(CONF_CAST_TARGET)
        if not cast_target:
            return

        try:
            await self.hass.services.async_call(
                "media_player", "turn_off", {"entity_id": cast_target}, blocking=True
            )
            _LOGGER.info("Stopped casting to %s", cast_target)
        except Exception as err:
            _LOGGER.debug(
                "Could not stop cast to %s (may already be off): %s", cast_target, err
            )
