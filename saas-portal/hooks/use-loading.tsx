"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    // Simuler un délai de chargement réaliste
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return { isLoading, setIsLoading }
}
