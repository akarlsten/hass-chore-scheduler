"""Constants for the Chore Scheduler integration."""
from typing import Final

DOMAIN: Final = "chore_scheduler"

# Storage
STORAGE_KEY: Final = f"{DOMAIN}.chores"
STORAGE_VERSION: Final = 1

# Schedule types
SCHEDULE_ONCE: Final = "once"
SCHEDULE_DAILY: Final = "daily"
SCHEDULE_WEEKLY: Final = "weekly"
SCHEDULE_MONTHLY: Final = "monthly"
SCHEDULE_CUSTOM: Final = "custom"

SCHEDULE_TYPES: Final = [
    SCHEDULE_ONCE,
    SCHEDULE_DAILY,
    SCHEDULE_WEEKLY,
    SCHEDULE_MONTHLY,
    SCHEDULE_CUSTOM,
]

# Assignment modes
ASSIGNMENT_UNASSIGNED: Final = "unassigned"
ASSIGNMENT_FIXED: Final = "fixed"
ASSIGNMENT_ROTATING: Final = "rotating"

ASSIGNMENT_MODES: Final = [
    ASSIGNMENT_UNASSIGNED,
    ASSIGNMENT_FIXED,
    ASSIGNMENT_ROTATING,
]

# Days of week
WEEKDAYS: Final = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

# Events
EVENT_CHORE_COMPLETED: Final = f"{DOMAIN}_chore_completed"

# Attributes
ATTR_CHORE_ID: Final = "chore_id"
ATTR_NAME: Final = "name"
ATTR_DESCRIPTION: Final = "description"
ATTR_SCHEDULE: Final = "schedule"
ATTR_ASSIGNMENT: Final = "assignment"
ATTR_NOTIFICATIONS: Final = "notifications"
ATTR_ENABLED: Final = "enabled"

# Services
SERVICE_ADD_CHORE: Final = "add_chore"
SERVICE_UPDATE_CHORE: Final = "update_chore"
SERVICE_DELETE_CHORE: Final = "delete_chore"
SERVICE_TRIGGER_CHORE: Final = "trigger_chore"
SERVICE_LIST_CHORES: Final = "list_chores"

# TTS configuration keys
CONF_TTS_ENABLED: Final = "tts_enabled"
CONF_TTS_TARGETS: Final = "tts_targets"
CONF_TTS_SERVICE: Final = "tts_service"
CONF_TTS_LANGUAGE: Final = "tts_language"
CONF_QUIET_HOURS_START: Final = "quiet_hours_start"
CONF_QUIET_HOURS_END: Final = "quiet_hours_end"
CONF_REMINDER_DELAY_HOURS: Final = "reminder_delay_hours"
# TTS defaults
DEFAULT_QUIET_HOURS_START: Final = "21:00"
DEFAULT_QUIET_HOURS_END: Final = "09:00"
DEFAULT_REMINDER_DELAY_HOURS: Final = 2
DEFAULT_TTS_SERVICE: Final = "google_translate_say"
DEFAULT_TTS_LANGUAGE: Final = "auto"

# TTS service options
TTS_SERVICES: Final = [
    "google_translate_say",
    "cloud_say",
    "speak",
]

# Cast configuration keys
CONF_CAST_ENABLED: Final = "cast_enabled"
CONF_CAST_TARGET: Final = "cast_target"
CONF_CAST_DASHBOARD: Final = "cast_dashboard"
CONF_CAST_VIEW: Final = "cast_view"
CONF_CAST_DURATION: Final = "cast_duration"
DEFAULT_CAST_DURATION: Final = 60
