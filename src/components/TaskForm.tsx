import { useState, type FormEvent } from "react"

type Props = {
  onAdd: (title: string) => void
}

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="¿Qué necesitas hacer?"
        aria-label="Nueva tarea"
        maxLength={120}
        className="h-11 min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800/60 px-4 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Agregar
      </button>
    </form>
  )
}
