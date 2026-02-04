import { css } from "lit";

export const cardStyles = css`
  :host {
    --mdc-theme-primary: var(--primary-color);
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  }

  .card-header h1 {
    margin: 0;
    font-size: 1.625rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 18px;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 0.925rem;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }

  .header-btn:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }

  .header-btn:active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
  }

  .header-btn ha-icon {
    --mdc-icon-size: 16px;
    display: flex;
  }

  .chore-actions ha-icon-button ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Manage Mode: Chore List ─────────────────────────── */

  .chore-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: fade-in 0.2s ease-out;
  }

  .chore-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: var(--card-background-color, var(--ha-card-background));
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .chore-item:hover {
    background: var(--secondary-background-color);
  }

  .chore-item.disabled {
    opacity: 0.5;
  }

  .chore-icon {
    margin-right: 12px;
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .chore-info {
    flex: 1;
    min-width: 0;
  }

  .chore-name {
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chore-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .chore-actions {
    display: flex;
    gap: 4px;
  }

  /* ── Schedule Pills ──────────────────────────────────── */

  .schedule-pill {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.825rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .schedule-pill.daily {
    background: rgba(76, 175, 80, 0.15);
    color: var(--label-badge-green, #4caf50);
  }

  .schedule-pill.weekly {
    background: rgba(33, 150, 243, 0.15);
    color: var(--label-badge-blue, #2196f3);
  }

  .schedule-pill.monthly {
    background: rgba(156, 39, 176, 0.15);
    color: var(--label-badge-purple, #9c27b0);
  }

  .schedule-pill.once {
    background: rgba(255, 152, 0, 0.15);
    color: var(--label-badge-yellow, #ff9800);
  }

  /* ── Assignee Avatars ────────────────────────────────── */

  .assignee-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: var(--secondary-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.775rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .assignee-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── Streak Badge ────────────────────────────────────── */

  .streak-badge {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.825rem;
    font-weight: 600;
    color: var(--warning-color, #ff9800);
    white-space: nowrap;
  }

  .streak-badge ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ── Display Mode: Todo List ─────────────────────────── */

  .todo-section {
    margin-bottom: 12px;
  }

  .todo-section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    font-size: 0.825rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-text-color);
    padding: 4px 0 8px 0;
  }

  .todo-section.overdue .section-header {
    color: var(--error-color, #f44336);
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: 8px;
    gap: 8px;
    transition: background-color 0.15s, opacity 0.3s;
  }

  .todo-item:hover {
    background: var(--secondary-background-color);
  }

  .todo-item.overdue {
    border-left: 3px solid var(--error-color, #f44336);
  }

  .todo-item.completed {
    opacity: 0.5;
  }

  .todo-checkbox {
    --mdc-icon-size: 22px;
    cursor: pointer;
    color: var(--secondary-text-color);
    transition: color 0.15s, transform 0.15s;
    flex-shrink: 0;
  }

  .todo-checkbox:hover {
    color: var(--primary-color);
  }

  .todo-item.completed .todo-checkbox {
    color: var(--success-color, #4caf50);
    cursor: default;
  }

  .todo-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  .todo-info {
    flex: 1;
    min-width: 0;
  }

  .todo-summary {
    font-size: 1.025rem;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .todo-item.completed .todo-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  /* ── Animations ──────────────────────────────────────── */

  @keyframes checkmark-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.4); }
    100% { transform: scale(1); }
  }

  .todo-checkbox.completing {
    animation: checkmark-pop 0.3s ease-out;
    color: var(--success-color, #4caf50);
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Item completing: pop the check, then fade out the row */
  @keyframes item-fade-out {
    0% { opacity: 1; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
    50% { opacity: 0; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
    100% { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-bottom: -4px; }
  }

  .todo-item.completing-item {
    animation: item-fade-out 0.45s ease-out forwards;
    overflow: hidden;
    pointer-events: none;
  }

  .todo-item.completing-item .todo-checkbox {
    color: var(--success-color, #4caf50);
  }

  .todo-item.completing-item .todo-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  /* Sections and content areas entering - only on the list container,
     not individual items, to avoid re-animating on every state update */
  .todo-list {
    animation: fade-in 0.2s ease-out both;
  }

  /* ── All Done Celebration ────────────────────────────── */

  @keyframes celebrate-icon-in {
    0%  { opacity: 0; transform: scale(0.3); }
    40% { opacity: 1; transform: scale(1.18); }
    60% { transform: scale(0.9); }
    78% { transform: scale(1.08); }
    90% { transform: scale(0.97); }
    100% { transform: scale(1); }
  }

  @keyframes celebrate-text-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .all-done {
    text-align: center;
    padding: 32px 16px;
  }

  .all-done ha-icon {
    --mdc-icon-size: 48px;
    color: var(--success-color, #4caf50);
    margin-bottom: 12px;
    display: block;
    animation: celebrate-icon-in 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .all-done p {
    font-size: 1.225rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
    animation: celebrate-text-in 0.35s ease-out 0.25s both;
  }

  /* ── Empty State ─────────────────────────────────────── */

  .empty-state {
    text-align: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
    animation: fade-in 0.3s ease-out;
  }

  .empty-state ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .loading {
    display: flex;
    justify-content: center;
    padding: 32px;
  }

  /* ── Reduced Motion ──────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    .todo-checkbox.completing,
    .all-done ha-icon,
    .all-done p,
    .todo-item.completing-item,
    .todo-list,
    .empty-state,
    .chore-list {
      animation: none;
    }
  }
`;

export const editorStyles = css`
  :host {
    display: block;
  }

  .editor-content {
    padding: 16px;
  }

  .form-row {
    margin-bottom: 16px;
  }

  .form-row label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .form-row ha-textfield,
  .form-row ha-textarea,
  .form-row ha-select {
    width: 100%;
  }

  .section-header {
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 24px 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--divider-color);
  }

  .weekday-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .weekday-chip {
    padding: 6px 12px;
    border-radius: 16px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .weekday-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
    border-color: var(--primary-color);
  }

  .time-input {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .assignee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .assignee-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .assignee-item ha-select {
    flex: 1;
  }

  .button-row {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--divider-color);
  }

  .delete-button {
    --mdc-theme-primary: var(--error-color);
    margin-right: auto;
  }

  ha-switch {
    margin-right: 8px;
  }

  .switch-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .switch-row label {
    flex: 1;
  }
`;

export const dialogStyles = css`
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
  }

  @media (max-width: 450px) {
    ha-dialog {
      --mdc-dialog-min-width: 100%;
      --mdc-dialog-max-width: 100%;
    }
  }
`;
