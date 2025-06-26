"use client"

import { useEffect, useRef } from "react"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import SidebarNav from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CollapsibleSidebar() {
  const { isCollapsed, toggle, setCollapsed } = useSidebarState()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const mobileSidebarRef = useRef<HTMLDivElement>(null)

  // Fermer la sidebar en cliquant à l'extérieur (desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        window.innerWidth >= 768 &&
        !isCollapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement
        const isNavbarClick = target.closest("[data-navbar]")
        const isButtonClick = target.closest("button")

        if (!isNavbarClick && !isButtonClick) {
          setCollapsed(true)
        }
      }
    }

    if (!isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCollapsed, setCollapsed])

  // Fermer la sidebar mobile en cliquant à l'extérieur
  useEffect(() => {
    function handleMobileClickOutside(event: MouseEvent) {
      if (
        window.innerWidth < 768 &&
        !isCollapsed &&
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true)
      }
    }

    if (!isCollapsed && window.innerWidth < 768) {
      document.addEventListener("mousedown", handleMobileClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleMobileClickOutside)
    }
  }, [isCollapsed, setCollapsed])

  // Fermer la sidebar avec la touche Escape
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !isCollapsed) {
        setCollapsed(true)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isCollapsed, setCollapsed])

  return (
    <>
      {/* Sidebar pour desktop */}
      <aside
        ref={sidebarRef}
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 bg-background border-r transition-all duration-300",
          "shadow-sm",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Bouton de toggle */}
        <div
          className={cn(
            "flex items-center border-b bg-muted/30",
            isCollapsed ? "justify-center p-2" : "justify-end p-3",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8 hover:bg-background"
            aria-label={isCollapsed ? "Ouvrir la sidebar" : "Fermer la sidebar"}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav collapsed={isCollapsed} />
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-label="Fermer la sidebar"
        />
      )}

      {/* Sidebar mobile */}
      <aside
        ref={mobileSidebarRef}
        className={cn(
          "fixed left-0 top-16 bottom-0 z-40 w-64 bg-background border-r transition-transform duration-300 md:hidden shadow-lg",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
        )}
      >
        {/* Header avec bouton de fermeture */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          {/*<h2 className="font-semibold">Navigation</h2*/}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(true)}
            className="h-8 w-8 hover:bg-background"
            aria-label="Fermer la sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav collapsed={false} />
        </div>
      </aside>
    </>
  )
}
