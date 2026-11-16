import { useMemo, useState } from "react"
import { Filters } from "./components/Filters"
import { TaskForm } from "./components/TaskForm"
import { TaskList } from "./components/TaskList"
import { useLocalStorage } from "./hooks/useLocalStorage"
import type { Filter, Task } from "./types"

const STORAGE_KEY = "gestor-tareas.tasks.v1"

/** ID único sin depender de `crypto.randomUUID` (no disponible en contextos HTTP no seguros). */
function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])
  const [filter, setFilter] = useState<Filter>("all")

  const activeCount = useMemo(() => tasks.filter((task) => !task.done).length, [tasks])
  const completedCount = tasks.length - activeCount

  function addTask(title: string) {
    const newTask: Task = {
      id: createId(),
      title,
      done: false,
      createdAt: Date.now(),
    }
    setTasks((current) => [newTask, ...current])
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    )
  }

  function updateTask(id: string, title: string) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task)),
    )
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.done))
  }

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.done)
      case "completed":
        return tasks.filter((task) => task.done)
      default:
        return tasks
    }
  }, [tasks, filter])

  return (
    <main className="flex min-h-screen justify-center bg-slate-950 px-4 py-10 text-slate-100 sm:py-16">
      <div className="w-full max-w-lg">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestor de <span className="text-indigo-400">Tareas</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {activeCount === 0
              ? "No tienes tareas pendientes"
              : `${activeCount} ${activeCount === 1 ? "tarea pendiente" : "tareas pendientes"}`}
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-indigo-500/5 sm:p-6">
          <TaskForm onAdd={addTask} />

          <Filters
            filter={filter}
            onChange={setFilter}
            counts={{ all: tasks.length, active: activeCount, completed: completedCount }}
            onClearCompleted={clearCompleted}
          />

          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onRemove={removeTask}
          />

          <footer className="mt-5 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
            Tus tareas se guardan localmente en este navegador.
          </footer>
        </section>
      </div>
    </main>
  )
}
