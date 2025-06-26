"use client"

import type React from "react"
import { Suspense } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import CollapsibleSidebar from "@/components/collapsible-sidebar"
import LoadingBar from "@/components/loading-bar"
import { Spinner } from "@/components/ui/spinner"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebarState()

  return (
    <div className="min-h-screen bg-background">
      {/* Barre de chargement globale */}
      <LoadingBar />

      {/* Navbar fixe en haut */}
      <DashboardNavbar className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />

      {/* Container principal avec sidebar et contenu */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <CollapsibleSidebar />

        {/* Contenu principal avec marge */}
        <main
          className={cn(
            "flex-1 min-w-0 overflow-hidden transition-all duration-300 ease-in-out",
            // Ajout de marges pour la lisibilité
            isCollapsed
              ? "md:ml-20 ml-0" // Marge de 20 (80px) quand la sidebar est fermée
              : "md:ml-68 ml-0", // Marge de 68 (272px) quand la sidebar est ouverte
          )}
        >
          <div className="h-full p-4 md:p-6 lg:p-8 max-w-full">
            {/* Container avec marge interne pour plus d'espacement */}
            <div className="w-full max-w-none">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <Spinner size="lg" />
                      <p className="mt-4 text-muted-foreground">Chargement...</p>
                    </div>
                  </div>
                }
              >
                {children}
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
