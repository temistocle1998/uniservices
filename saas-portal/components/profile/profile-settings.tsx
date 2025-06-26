"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfilePhoto } from "./profile-photo"
import { PersonalInfoForm } from "./personal-info-form"
import { ChangePasswordForm } from "./change-password-form"
import { currentUser } from "@/lib/profile-data"
import { User, Lock, Camera } from "lucide-react"

export function ProfileSettings() {
  return (
    <div className="grid gap-6">
      {/* En-tête du profil */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {currentUser.firstName} {currentUser.lastName}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentUser.role} • {currentUser.department}
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-1">
                Membre depuis{" "}
                {new Date(currentUser.dateJoined).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Onglets des paramètres */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Informations personnelles
          </TabsTrigger>
          <TabsTrigger value="photo" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Photo de profil
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Mot de passe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="photo">
          <ProfilePhoto />
        </TabsContent>

        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
