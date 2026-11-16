import type { Filter } from "../types"

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "active", label: "Activas" },
  { value: "completed", label: "Completadas" },
]

type Props = {
  filter: Filter
  onChange: (filter: Filter) => void
  counts: Record<Filter, number>
  onClearCompleted: () => void
}

export function Filters({ filter, onChange, counts, onClearCompleted }: Props) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-1 rounded-lg bg-slate-800/70 p-1" role="tablist" aria-label="Filtrar tareas">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            onClick={() => onChange(value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
              filter === value
                ? "bg-indigo-500 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {label}
            <span className="ml-1 opacity-60">{counts[value]}</span>
          </button>
        ))}
      </div>

      {counts.completed > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="text-xs text-slate-400 transition-colors hover:text-rose-400 sm:text-sm"
        >
          Borrar completadas
        </button>
      )}
    </div>
  )
}
