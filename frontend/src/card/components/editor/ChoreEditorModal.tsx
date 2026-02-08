import { useState, useRef, useCallback } from 'preact/hooks'
import styled, { keyframes, css } from 'styled-components'
import {
  Chore,
  ChoreSchedule,
  ChoreAssignment,
  ChoreNotifications,
  ScheduleType,
  Weekday,
} from '@types'
import { useHass, useLocalize } from '@hooks'
import PersonSelector from './PersonSelector'
import ScheduleTypePicker from './ScheduleTypePicker'
import ScheduleOptions from './ScheduleOptions'
import NotificationSettings from './NotificationSettings'

interface ChoreEditorModalProps {
  chore: Chore | null
  onSave: (chore: Partial<Chore>, isNew: boolean) => void
  onDelete: (choreId: string) => void
  onTrigger: (choreId: string) => void
  onClose: () => void
}

const ChoreEditorModal = ({ chore, onSave, onDelete, onTrigger, onClose }: ChoreEditorModalProps) => {
  const hass = useHass()
  const t = useLocalize()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)

  const isNew = !chore

  // Form state
  const [name, setName] = useState(chore?.name || '')
  const [description, setDescription] = useState(chore?.description || '')
  const [scheduleType, setScheduleType] = useState<ScheduleType>(chore?.schedule.type || 'weekly')
  const [scheduleDays, setScheduleDays] = useState<Weekday[]>(chore?.schedule.days || ['sunday'])
  const [scheduleTime, setScheduleTime] = useState(chore?.schedule.time || '10:00')
  const [scheduleDayOfMonth, setScheduleDayOfMonth] = useState(chore?.schedule.day_of_month || 1)
  const [scheduleDate, setScheduleDate] = useState(chore?.schedule.date || getTodayDate())

  // Assignment
  const initialAssignee = chore?.assignment.mode === 'unassigned' || !chore?.assignment.assignees?.length
    ? null
    : chore.assignment.assignees[0]
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(initialAssignee)

  // Notifications
  const initialNotifyTargets = (chore?.notifications.notify_targets || []).filter(t => t !== 'persistent_notification')
  const initialPersistent = (chore?.notifications.notify_targets || []).includes('persistent_notification')
  const [notificationsEnabled, setNotificationsEnabled] = useState(chore?.notifications.enabled || false)
  const [notifyTargets, setNotifyTargets] = useState<string[]>(initialNotifyTargets)
  const [persistentNotification, setPersistentNotification] = useState(initialPersistent)

  const animateClose = useCallback(() => {
    if (closing) return
    setClosing(true)

    const overlay = overlayRef.current
    const emit = () => onClose()

    if (overlay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      overlay.addEventListener('animationend', (e) => {
        if (e.target === overlay) emit()
      }, { once: true })
      setTimeout(emit, 300)
    } else {
      emit()
    }
  }, [closing, onClose])

  const handleSave = () => {
    const schedule: ChoreSchedule = {
      type: scheduleType,
      time: scheduleTime,
      interval: 1,
    }

    if (scheduleType === 'once') {
      schedule.date = scheduleDate
    } else if (scheduleType === 'weekly') {
      schedule.days = scheduleDays
    } else if (scheduleType === 'monthly') {
      schedule.day_of_month = scheduleDayOfMonth
    }

    const assignment: ChoreAssignment = {
      mode: selectedAssignee ? 'fixed' : 'unassigned',
      assignees: selectedAssignee ? [selectedAssignee] : [],
      current_index: 0,
    }

    const allNotifyTargets = [...notifyTargets]
    if (persistentNotification) {
      allNotifyTargets.push('persistent_notification')
    }

    const notifications: ChoreNotifications = {
      enabled: notificationsEnabled,
      remind_before: 60,
      notify_targets: allNotifyTargets,
    }

    const choreData: Partial<Chore> = {
      name: name.trim(),
      description: description.trim(),
      enabled: true,
      schedule,
      assignment,
      notifications,
    }

    if (chore) {
      choreData.id = chore.id
    }

    onSave(choreData, isNew)
  }

  const handleDelete = () => {
    if (chore && confirm(t('editor.delete_confirm'))) {
      onDelete(chore.id)
    }
  }

  const handleTrigger = () => {
    if (chore) {
      onTrigger(chore.id)
      animateClose()
    }
  }

  return (
    <Overlay ref={overlayRef} $closing={closing} onClick={animateClose}>
      <Dialog $closing={closing} onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <h2>{isNew ? t('editor.add_title') : t('editor.edit_title')}</h2>
        </DialogHeader>

        <DialogContent>
          {/* Name */}
          <FormGroup>
            <FormLabel className="required">{t('editor.name')}</FormLabel>
            <ha-textfield
              value={name}
              onInput={(e: Event) => setName((e.target as HTMLInputElement).value)}
              placeholder="e.g. Vacuum the floors"
            />
          </FormGroup>

          {/* Who */}
          <FormGroup>
            <FormLabel>{t('assignment.title')}</FormLabel>
            <PersonSelector
              selectedAssignee={selectedAssignee}
              onSelect={setSelectedAssignee}
            />
          </FormGroup>

          {/* When */}
          <FormGroup>
            <FormLabel>{t('schedule.title')}</FormLabel>
            <ScheduleTypePicker
              scheduleType={scheduleType}
              onSelect={setScheduleType}
            />

            <TimeSection>
              <FormLabel>{t('schedule.time')}</FormLabel>
              <ha-textfield
                type="time"
                value={scheduleTime}
                onInput={(e: Event) => setScheduleTime((e.target as HTMLInputElement).value)}
              />
            </TimeSection>

            <ScheduleOptions
              scheduleType={scheduleType}
              scheduleDays={scheduleDays}
              onDaysChange={setScheduleDays}
              scheduleDayOfMonth={scheduleDayOfMonth}
              onDayOfMonthChange={setScheduleDayOfMonth}
              scheduleDate={scheduleDate}
              onDateChange={setScheduleDate}
            />
          </FormGroup>

          <Divider />

          {/* Description */}
          <FormGroup>
            <FormLabel>{t('editor.description')}</FormLabel>
            <ha-textfield
              value={description}
              onInput={(e: Event) => setDescription((e.target as HTMLInputElement).value)}
              placeholder="Notes or instructions..."
            />
          </FormGroup>

          {/* Notifications */}
          <NotificationSettings
            enabled={notificationsEnabled}
            onEnabledChange={setNotificationsEnabled}
            notifyTargets={notifyTargets}
            onNotifyTargetsChange={setNotifyTargets}
            persistentNotification={persistentNotification}
            onPersistentChange={setPersistentNotification}
          />
        </DialogContent>

        <DialogActions>
          {!isNew && (
            <DeleteBtn onClick={handleDelete}>{t('editor.delete')}</DeleteBtn>
          )}
          {!isNew && (
            <TriggerBtn onClick={handleTrigger}>
              <ha-icon icon="mdi:play" />
              {t('editor.trigger')}
            </TriggerBtn>
          )}
          <Spacer />
          <CancelBtn onClick={animateClose}>{t('editor.cancel')}</CancelBtn>
          <SaveBtn onClick={handleSave} disabled={!name.trim()}>
            {isNew ? t('editor.add') : t('editor.save')}
          </SaveBtn>
        </DialogActions>
      </Dialog>
    </Overlay>
  )
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export default ChoreEditorModal

// ── Animations ────────────────────────────────────────────────────

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const overlayFadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const dialogEnter = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const dialogExit = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(24px) scale(0.96); }
`

// ── Styles ────────────────────────────────────────────────────────

const Overlay = styled.div<{ $closing?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 12px;
  box-sizing: border-box;
  animation: ${overlayFadeIn} 0.2s ease-out;

  ${(p) => p.$closing && css`
    animation: ${overlayFadeOut} 0.2s ease-in forwards;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Dialog = styled.div<{ $closing?: boolean }>`
  background: var(--card-background-color, white);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  max-height: calc(100vh - 24px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${dialogEnter} 0.25s ease-out;

  ${(p) => p.$closing && css`
    animation: ${dialogExit} 0.2s ease-in forwards;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const DialogHeader = styled.div`
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--divider-color);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
`

const DialogContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  ha-textfield, ha-textarea, ha-select {
    display: block;
    width: 100%;
  }
`

const FormLabel = styled.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 8px;

  &.required::after {
    content: " *";
    color: var(--error-color, #db4437);
  }
`

const TimeSection = styled.div`
  margin-top: 12px;

  ha-textfield {
    width: 110px;
  }
`

const Divider = styled.div`
  height: 1px;
  background: var(--divider-color);
  margin: 20px 0;
`

const DialogActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--divider-color);
  justify-content: flex-end;
`

const Btn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
`

const DeleteBtn = styled(Btn)`
  margin-right: auto;
  background: transparent;
  color: var(--error-color, #db4437);

  &:hover {
    background: rgba(219, 68, 55, 0.1);
  }
`

const CancelBtn = styled(Btn)`
  background: transparent;
  color: var(--primary-text-color);

  &:hover {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
  }
`

const SaveBtn = styled(Btn)`
  background: var(--primary-color);
  color: white;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TriggerBtn = styled(Btn)`
  background: transparent;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ha-icon {
    --mdc-icon-size: 16px;
  }

  &:hover {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  }
`

const Spacer = styled.div`
  flex: 1;
`
