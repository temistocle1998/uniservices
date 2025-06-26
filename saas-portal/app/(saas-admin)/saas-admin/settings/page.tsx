import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SaasGeneralSettings } from "@/components/admin/settings/saas-general-settings"
import { SaasEmailSettings } from "@/components/admin/settings/saas-email-settings"
import { SaasApiSettings } from "@/components/admin/settings/saas-api-settings"

export const metadata: Metadata = {
  title: "Paramètres SaaS",
  description: "Gérez les paramètres globaux de la plateforme SaaS",
}

export default function SaasSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Paramètres SaaS</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les paramètres généraux de la plateforme SaaS.</CardDescription>
            </CardHeader>
            <CardContent>
              <SaasGeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'email</CardTitle>
              <CardDescription>
                Configurez les paramètres d'email pour les notifications et communications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SaasEmailSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres API</CardTitle>
              <CardDescription>Gérez les clés API et les intégrations externes.</CardDescription>
            </CardHeader>
            <CardContent>
              <SaasApiSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
