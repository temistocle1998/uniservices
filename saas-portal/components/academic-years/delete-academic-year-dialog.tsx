"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AcademicYear {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  registrationStartDate: string
  registrationEndDate: string
  studentCount: number
}

interface DeleteAcademicYearDialogProps {
  academicYear: AcademicYear
}

export default function DeleteAcademicYearDialog({ academicYear }: DeleteAcademicYearDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Simuler la suppression d'une année académique
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Année académique supprimée avec succès")

      // Fermer la boîte de dialogue
      setOpen(false)

      // Rafraîchir la page pour mettre à jour la liste
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de l'année académique")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-destructive focus:text-destructive"
          disabled={academicYear.isActive}
        >
          Supprimer
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Supprimer l'année académique</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l'année académique {academicYear.name} ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Action irréversible</AlertTitle>
            <AlertDescription>
              Cette action supprimera définitivement toutes les données associées à cette année académique, y compris
              les inscriptions et les emplois du temps. Les données des étudiants et des cours seront conservées.
            </AlertDescription>
          </Alert>

          {academicYear.studentCount > 0 && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Données existantes</AlertTitle>
              <AlertDescription>
                Cette année académique contient {academicYear.studentCount} inscriptions d'étudiants qui seront
                également supprimées.
              </AlertDescription>
            </Alert>
          )}

          {academicYear.isActive && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Année active</AlertTitle>
              <AlertDescription>
                Vous ne pouvez pas supprimer l'année académique active. Veuillez d'abord activer une autre année
                académique.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading || academicYear.isActive}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Suppression..." : "Supprimer définitivement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
