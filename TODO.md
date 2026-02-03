# Chore Scheduler - Development TODO

All initial items have been implemented.

## Completed

- [x] **Display mode** - Card shows pending todo items with check-off support, grouped by Overdue / Today / Upcoming
- [x] **Completion experience** - Checkmark pop animation, haptic feedback, "all done" celebration, streak tracking
- [x] **Visual overhaul** - Auto icons (EN/SV), assignee avatars, schedule pills, streak badges
- [x] **Notification bug fix** - Notifications now fire independently of todo creation, persistent_notification handled correctly
- [x] **Own TodoListEntity** - Integration manages `todo.chore_scheduler_chores` internally (no external todo list needed)
- [x] **Bilingual icon matching** - Chore icon keywords support English and Swedish with fuzzy diacritic normalization

## Future ideas

- Confetti / sound effects on completion (optional)
- Category grouping for chores
- Statistics dashboard (completion rates, streaks over time)
- Automation triggers on chore completion events
- Additional language support
- Google Home / Nest Hub display integration (HA Cloud exposure, casting HA dashboard, or Google Keep sync)
