import { ChoreSchedulerCardConfig, HomeAssistant } from "@types";
import styled from "styled-components";
import HaSelect from "../ha-components/HaSelect";
import HaSwitch from "../ha-components/HaSwitch";

interface CardEditorProps {
  hass: HomeAssistant;
  config: ChoreSchedulerCardConfig;
  onConfigChanged: (config: ChoreSchedulerCardConfig) => void;
}

const CardEditor = ({ hass, config, onConfigChanged }: CardEditorProps) => {
  const update = (updates: Partial<ChoreSchedulerCardConfig>) => {
    onConfigChanged({ ...config, ...updates });
  };

  return (
    <EditorRoot>
      <FormGroup>
        <ha-textfield
          label="Title"
          value={config.title || "Chore Scheduler"}
          onInput={(e: Event) =>
            update({ title: (e.target as HTMLInputElement).value })
          }
        />
      </FormGroup>

      <FormGroup>
        <HaSelect
          value={config.default_mode || "display"}
          label="Default mode"
          onSelected={(value) =>
            update({ default_mode: value as "display" | "manage" })
          }
        >
          <ha-list-item value="display">Display (view todos)</ha-list-item>
          <ha-list-item value="manage">Manage (edit chores)</ha-list-item>
        </HaSelect>
      </FormGroup>

      <Switches>
        <SwitchRow>
          <SwitchLabel>Show disabled chores</SwitchLabel>
          <HaSwitch
            checked={config.show_disabled !== false}
            onChange={(checked) => update({ show_disabled: checked })}
          />
        </SwitchRow>

        <SwitchRow>
          <SwitchLabel>Show completed todos</SwitchLabel>
          <HaSwitch
            checked={config.show_completed === true}
            onChange={(checked) => update({ show_completed: checked })}
          />
        </SwitchRow>

        <SwitchRow>
          <SwitchLabel>Enable animations</SwitchLabel>
          <HaSwitch
            checked={config.enable_animations !== false}
            onChange={(checked) => update({ enable_animations: checked })}
          />
        </SwitchRow>
      </Switches>
    </EditorRoot>
  );
};

export default CardEditor;

// ── Styles ──────────────────────────────────────────────────────────

const EditorRoot = styled.div``;

const FormGroup = styled.div`
  margin-bottom: 16px;

  ha-textfield,
  ha-select {
    display: block;
    width: 100%;
  }
`;

const Switches = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SwitchLabel = styled.span`
  font-size: 1rem;
  color: var(--primary-text-color);
`;
