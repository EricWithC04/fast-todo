import { useEffect, useState } from "react"

/**
 * Estado sincronizado con localStorage. Funciona como `useState`,
 * pero el valor se restaura al recargar y se guarda en cada cambio.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? (JSON.parse(stored) as T) : initialValue
    } catch {
      // Datos corruptos o storage bloqueado: se usa el valor inicial.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Sin Storage disponible (modo privado, cuota llena, etc.): se ignora.
    }
  }, [key, value])

  return [value, setValue] as const
}
