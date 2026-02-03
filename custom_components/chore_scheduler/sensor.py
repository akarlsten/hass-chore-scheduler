"""Sensor platform for Chore Scheduler."""
from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorEntity,
    SensorEntityDescription,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import ChoreSchedulerCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Chore Scheduler sensors."""
    coordinator: ChoreSchedulerCoordinator = hass.data[DOMAIN][entry.entry_id][
        "coordinator"
    ]

    sensors = [
        ChoreCountSensor(coordinator, entry),
        NextChoreSensor(coordinator, entry),
    ]

    async_add_entities(sensors)


class ChoreSchedulerSensorBase(
    CoordinatorEntity[ChoreSchedulerCoordinator], SensorEntity
):
    """Base class for Chore Scheduler sensors."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: ChoreSchedulerCoordinator,
        entry: ConfigEntry,
        description: SensorEntityDescription,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator)
        self.entity_description = description
        self._attr_unique_id = f"{entry.entry_id}_{description.key}"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Chore Scheduler",
            "manufacturer": "Custom",
            "model": "Chore Scheduler",
        }


class ChoreCountSensor(ChoreSchedulerSensorBase):
    """Sensor showing total number of active chores."""

    def __init__(
        self,
        coordinator: ChoreSchedulerCoordinator,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(
            coordinator,
            entry,
            SensorEntityDescription(
                key="chore_count",
                name="Active Chores",
                icon="mdi:clipboard-list",
            ),
        )

    @property
    def native_value(self) -> int:
        """Return the number of active chores."""
        if self.coordinator.data:
            chores = self.coordinator.data.get("chores", [])
            return len([c for c in chores if c.get("enabled", True)])
        return 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return additional attributes."""
        if not self.coordinator.data:
            return {}

        chores = self.coordinator.data.get("chores", [])
        return {
            "chores": [
                {
                    "id": c["id"],
                    "name": c["name"],
                    "enabled": c.get("enabled", True),
                    "schedule_type": c.get("schedule", {}).get("type"),
                }
                for c in chores
            ]
        }


class NextChoreSensor(ChoreSchedulerSensorBase):
    """Sensor showing the next upcoming chore."""

    def __init__(
        self,
        coordinator: ChoreSchedulerCoordinator,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(
            coordinator,
            entry,
            SensorEntityDescription(
                key="next_chore",
                name="Next Chore",
                icon="mdi:calendar-clock",
            ),
        )

    @property
    def native_value(self) -> str | None:
        """Return the name of the next chore."""
        if self.coordinator.data:
            next_chore = self.coordinator.data.get("next_chore")
            if next_chore:
                return next_chore.get("name")
        return None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return additional attributes."""
        if not self.coordinator.data:
            return {}

        next_chore = self.coordinator.data.get("next_chore")
        next_time = self.coordinator.data.get("next_chore_time")

        if not next_chore:
            return {}

        attrs = {
            "chore_id": next_chore.get("id"),
            "description": next_chore.get("description"),
            "schedule_type": next_chore.get("schedule", {}).get("type"),
        }

        if next_time:
            attrs["scheduled_time"] = next_time.isoformat()

        assignment = next_chore.get("assignment", {})
        if assignment.get("mode") == "fixed":
            assignees = assignment.get("assignees", [])
            if assignees:
                attrs["assigned_to"] = assignees[0]
        elif assignment.get("mode") == "rotating":
            assignees = assignment.get("assignees", [])
            current_index = assignment.get("current_index", 0)
            if assignees:
                attrs["next_assignee"] = assignees[current_index]

        return attrs
