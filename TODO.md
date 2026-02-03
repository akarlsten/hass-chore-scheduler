# Chore Scheduler - Development TODO

## High Priority

### 1. Display Mode for Checking Off Chores
Currently the card only shows chores in an "edit/manage" view. We need a **display mode** that shows the actual todo items created by chores, allowing users to check them off directly from the card.

- Add a mode toggle (display vs. edit) in the card header
- In display mode, fetch and show pending todo items from the configured todo list
- Allow marking items as complete directly from the card
- Consider showing "today's chores" vs "upcoming" sections

### 2. Delightful Completion Experience
Checking off a chore should feel **satisfying** - juicy, crunchy, rewarding.

- Add completion animations (confetti, checkmark flourish, etc.)
- Haptic feedback on mobile
- Sound effect option
- Visual celebration when all daily chores are done
- Streak tracking / gamification elements?

### 3. Visual Overhaul of Chore List
The current list view is too plain and hard to scan.

- Add assignee avatar bubbles next to each chore
- Frequency/schedule pills/badges (e.g., "Daily", "Mon/Wed/Fri", "Monthly")
- Auto-determined icons based on chore name (vacuum = broom, dishes = plate, etc.)
- Color coding by category or urgency
- Better visual hierarchy and spacing

## Bugs

### 4. Notification System Not Working
Notifications are not being sent when chores trigger.

- Debug the `_send_notification` method in coordinator.py
- Verify notify service targets are being called correctly
- Check if todo list requirement is blocking notification flow
- Add better error logging for notification failures
- Test with persistent_notification as a fallback
