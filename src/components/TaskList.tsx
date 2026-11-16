import type { Filter, Task } from "../types"
import { TaskItem } from "./TaskItem"

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: "No hay tareas todavía. ¡Agrega la primera!",
  active: "No hay tareas pendientes. ¡Buen trabajo!",
  completed: "Todavía no completas ninguna tarea.",
}

type Props = {
  tasks: Task[]
  filter: Filter
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TaskList({ tasks, filter, onToggle, onUpdate, onRemove }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="mt-4 rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-sm text-slate-500">
        {EMPTY_MESSAGES[filter]}
      </p>
    )
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onUpdate={onUpdate} onRemove={onRemove} />
      ))}
    </ul>
  )
}
