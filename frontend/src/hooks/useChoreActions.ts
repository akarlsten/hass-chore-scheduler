import { useStore } from '@store'

const useChoreActions = () => {
  const store = useStore()
  return {
    loadData: store((s) => s.loadData),
    completeItem: store((s) => s.completeItem),
    triggerChore: store((s) => s.triggerChore),
    saveChore: store((s) => s.saveChore),
    deleteChore: store((s) => s.deleteChore),
    setMode: store((s) => s.setMode),
  }
}

export default useChoreActions
