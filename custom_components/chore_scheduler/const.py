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
