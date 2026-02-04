import { useStore } from '@store'

const useTodoItems = () => {
  const store = useStore()
  return store((s) => s.todoItems)
}

export default useTodoItems
