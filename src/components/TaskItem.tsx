import { useEffect, useRef, useState, type FormEvent } from "react"
import type { Task } from "../types"

const dateFormat = new Intl.DateTimeFormat("es", { day: "numeric", month: "short" })

type Props = {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TaskItem({ task, onToggle, onUpdate, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.select()
  }, [isEditing])

  function startEditing() {
    setDraft(task.title)
    setIsEditing(true)
  }

  function save(event: FormEvent) {
    event.preventDefault()
    const trimmed = draft.trim()
    if (trimmed) onUpdate(task.id, trimmed)
    setIsEditing(false)
  }

  function cancel() {
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 transition-colors hover:border-slate-700">
      <button
        type="button"
        role="checkbox"
        aria-checked={task.done}
        aria-label={task.done ? "Marcar como pendiente" : "Marcar como completada"}
        onClick={() => onToggle(task.id)}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-600 text-transparent hover:border-emerald-400"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" className="size-3" aria-hidden="true">
          <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isEditing ? (
        <form onSubmit={save} className="flex min-w-0 flex-1 items-center gap-2">
          <input
            ref={inputRef}
            value={draft}
            maxLength={120}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") cancel()
            }}
            aria-label="Editar tarea"
            className="h-8 min-w-0 flex-1 rounded-lg border border-indigo-500 bg-slate-800 px-2 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <button
            type="submit"
            aria-label="Guardar cambios"
            title="Guardar (Enter)"
            className="shrink-0 rounded-lg p-1.5 text-emerald-400 transition-colors hover:bg-slate-800 hover:text-emerald-300"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
              <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={cancel}
            aria-label="Cancelar edición"
            title="Cancelar (Esc)"
            className="shrink-0 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className={`truncate text-sm ${task.done ? "text-slate-500 line-through" : "text-slate-100"}`}>
              {task.title}
            </p>
            <time className="text-xs text-slate-500">{dateFormat.format(task.createdAt)}</time>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={startEditing}
              aria-label="Editar tarea"
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-indigo-300"
            >
              <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
                <path d="M13.5 3.5l3 3L7 16H4v-3l9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onRemove(task.id)}
              aria-label="Eliminar tarea"
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-rose-400"
            >
              <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
                <path d="M4 6h12M8 6V4h4v2m-7 0l1 10h8l1-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  )
}
