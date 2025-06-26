"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { currentUser, uploadAvatar } from "@/lib/profile-data"
import { Camera, Upload, Trash2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function ProfilePhoto() {
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Vérification du type de fichier
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide",
        variant: "destructive",
      })
      return
    }

    // Vérification de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "La taille du fichier ne doit pas dépasser 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const result = await uploadAvatar(file)

      if (result.success && result.avatarUrl) {
        setAvatar(result.avatarUrl)
        toast({
          title: "Succès",
          description: result.message,
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement de l'image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemovePhoto = () => {
    setAvatar("/placeholder.svg?height=100&width=100&text=Avatar")
    toast({
      title: "Photo supprimée",
      description: "Votre photo de profil a été supprimée",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo de profil</CardTitle>
        <CardDescription>
          Téléchargez une photo pour personnaliser votre profil. Formats acceptés : JPG, PNG, GIF (max 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={avatar || "/placeholder.svg"}
              alt="Photo de profil"
              className="h-32 w-32 rounded-full object-cover border-4 border-background shadow-lg"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <Spinner size="md" className="text-white" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Changer la photo</h3>
              <p className="text-sm text-muted-foreground">Choisissez une image qui vous représente bien</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                {isUploading ? <Spinner size="sm" /> : <Upload className="h-4 w-4" />}
                Télécharger
              </Button>

              <Button
                variant="outline"
                onClick={handleRemovePhoto}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-start gap-3">
            <Camera className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Conseils pour une bonne photo</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Utilisez une photo récente et professionnelle</li>
                <li>• Assurez-vous que votre visage est bien visible</li>
                <li>• Évitez les photos floues ou trop sombres</li>
                <li>• Format carré recommandé pour un meilleur rendu</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
