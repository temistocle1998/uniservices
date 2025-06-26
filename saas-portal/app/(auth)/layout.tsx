import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentification | UniServices",
  description: "Authentification pour la plateforme de gestion des services universitaires",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Colonne de gauche avec image de fond et texte */}
        <div className="hidden lg:flex lg:w-1/2 bg-muted relative flex-col items-center justify-center p-12">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/40" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight">UniServices</h2>
                <p className="mt-2 text-xl text-muted-foreground">
                  La plateforme complète pour la gestion des services universitaires
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="text-sm">Gestion simplifiée des cours et des emplois du temps</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="text-sm">Suivi des étudiants et des professeurs en temps réel</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="text-sm">Analyses et rapports détaillés pour une meilleure prise de décision</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-12 z-20">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UniServices. Tous droits réservés.
            </p>
          </div>
        </div>
        {/* Colonne de droite avec le formulaire */}
        <div className="flex w-full lg:w-1/2 flex-col">{children}</div>
      </div>
    </div>
  )
}
