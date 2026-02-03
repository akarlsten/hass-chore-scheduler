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
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .add-button {
    --mdc-theme-primary: var(--primary-color);
  }

  .add-button ha-icon,
  .chore-actions ha-icon-button ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chore-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
    margin-right: 16px;
    color: var(--primary-color);
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

  .chore-schedule {
    font-size: 0.875rem;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  .chore-assignee {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  .chore-actions {
    display: flex;
    gap: 4px;
  }

  .empty-state {
    text-align: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
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
    font-size: 0.875rem;
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
