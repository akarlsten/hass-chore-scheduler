import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { useStore } from '@store'
import { useConfig, useChores, useTodoItems, useChoreActions, useLocalize } from '@hooks'
import { Chore } from '@types'
import CardHeader from './CardHeader'
import DisplayMode from './display/DisplayMode'
import ManageMode from './manage/ManageMode'
import ChoreEditorModal from './editor/ChoreEditorModal'

const ChoreSchedulerApp = () => {
  const store = useStore()
  const config = useConfig()
  const chores = useChores()
  const todoItems = useTodoItems()
  const loading = store((s) => s.loading)
  const mode = store((s) => s.mode)
  const { setMode, saveChore, deleteChore, triggerChore, loadData } = useChoreActions()

  const [showEditor, setShowEditor] = useState(false)
  const [editingChore, setEditingChore] = useState<Chore | null>(null)

  if (!config) return null

  const handleAddChore = () => {
    setEditingChore(null)
    setShowEditor(true)
  }

  const handleEditChore = (chore: Chore) => {
    setEditingChore(chore)
    setShowEditor(true)
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingChore(null)
  }

  const handleSaveChore = async (chore: Partial<Chore>, isNew: boolean) => {
    try {
      await saveChore(chore, isNew)
      handleCloseEditor()
    } catch (error) {
      console.error('[ChoreScheduler] Error saving chore:', error)
      alert(`Failed to save chore: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleDeleteChore = async (choreId: string) => {
    try {
      await deleteChore(choreId)
      handleCloseEditor()
    } catch (error) {
      console.error('[ChoreScheduler] Error deleting chore:', error)
    }
  }

  const handleToggleMode = () => {
    setMode(mode === 'display' ? 'manage' : 'display')
  }

  return (
    <CardContent>
      <CardHeader
        title={config.title || 'Chore Scheduler'}
        mode={mode}
        onToggleMode={handleToggleMode}
        onAddChore={handleAddChore}
      />

      {loading ? (
        <Loading>
          <ha-circular-progress indeterminate />
        </Loading>
      ) : mode === 'display' ? (
        <DisplayMode
          todoItems={todoItems}
          chores={chores}
          config={config}
        />
      ) : (
        <ManageMode
          chores={chores}
          todoItems={todoItems}
          config={config}
          onEditChore={handleEditChore}
        />
      )}

      {showEditor && (
        <ChoreEditorModal
          chore={editingChore}
          onSave={handleSaveChore}
          onDelete={handleDeleteChore}
          onTrigger={triggerChore}
          onClose={handleCloseEditor}
        />
      )}
    </CardContent>
  )
}

export default ChoreSchedulerApp

const CardContent = styled.div`
  padding: 16px;
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
`
