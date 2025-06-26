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
import type { University } from "@/lib/admin-data"

interface DeleteUniversityDialogProps {
  university: University
  trigger: React.ReactNode
}

export function DeleteUniversityDialog({ university, trigger }: DeleteUniversityDialogProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    // Ici, vous implémenteriez la logique pour supprimer l'université
    console.log(`Suppression de l'université ${university.id}`)
    toast({
      title: "Université supprimée",
      description: `L'université ${university.name} a été supprimée avec succès.`,
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
            Cette action ne peut pas être annulée. Cela supprimera définitivement l'université
            <span className="font-semibold"> {university.name} </span>
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
