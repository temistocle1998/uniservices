import type React from "react"
import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Administration - Gestion des Services Universitaires",
  description: "Panneau d'administration de l'université",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <Card>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" asChild>
              <a href="/admin/users">Utilisateurs</a>
            </TabsTrigger>
            <TabsTrigger value="roles" asChild>
              <a href="/admin/roles">Rôles et permissions</a>
            </TabsTrigger>
          </TabsList>
        </Card>
        <TabsContent value="users" className="space-y-4">
          {children}
        </TabsContent>
        <TabsContent value="roles" className="space-y-4">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  )
}
