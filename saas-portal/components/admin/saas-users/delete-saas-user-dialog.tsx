"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/admin-data"

interface DeleteSaasUserDialogProps {
  user: User
  trigger: React.ReactNode
}

export function DeleteSaasUserDialog({ user, trigger }: DeleteSaasUserDialogProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    // Ici, vous implémenteriez la logique pour supprimer l'utilisateur
    console.log(`Suppression de l'utilisateur ${user.id}`)
    toast({
      title: "Utilisateur supprimé",
      description: `${user.firstName} ${user.lastName} a été supprimé avec succès.`,
    })
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera définitivement l'utilisateur
            <span className="font-semibold">
              {" "}
              {user.firstName} {user.lastName}{" "}
            </span>
            et toutes les données associées de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
