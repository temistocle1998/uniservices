"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  isCollapsed: boolean
  toggle: () => void
  setCollapsed: (collapsed: boolean) => void
}

export const useSidebarState = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: true, // Commencer en mode réduit sur mobile
      toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed }),
    }),
    {
      name: "sidebar-state",
    },
  ),
)
