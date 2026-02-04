import { ChoreSchedule, HomeAssistant } from '@types'
import { localize, localizeWeekday } from '@utils/localize'

export function formatSchedule(schedule: ChoreSchedule, hass?: HomeAssistant): string {
  const time = schedule.time || "10:00"
  switch (schedule.type) {
    case "once": {
      const date = schedule.date
      if (date) {
        const dateObj = new Date(date + "T00:00:00")
        const formatted = dateObj.toLocaleDateString(hass?.language || "en", {
          month: "short",
          day: "numeric",
        })
        return `${formatted} ${time}`
      }
      return localize("display.at_time", hass, { time })
    }
    case "daily":
      return localize("display.daily_at", hass, { time })
    case "weekly": {
      const days = schedule.days || ["sunday"]
      const dayNames = days.map((d) => localizeWeekday(d, hass)).join(", ")
      return `${dayNames} ${time}`
    }
    case "monthly":
      return localize("display.monthly_at", hass, {
        day: schedule.day_of_month || 1,
        time,
      })
    default:
      return localize("display.at_time", hass, { time })
  }
}
