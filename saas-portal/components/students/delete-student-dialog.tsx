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
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  studentId: string
  departmentId: string
  programId: string
  programName: string
  year: string
  status: "active" | "inactive" | "suspended" | "graduated"
  enrollmentDate: string
}

interface DeleteStudentDialogProps {
  student: Student
  open: boolean
  onOpenChange: (open: boolean) => void
  onStudentDeleted: () => void
}

export default function DeleteStudentDialog({
  student,
  open,
  onOpenChange,
  onStudentDeleted,
}: DeleteStudentDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Simuler la suppression d'un étudiant
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Étudiant supprimé avec succès")

      // Appeler le callback
      onStudentDeleted()

      // Fermer la boîte de dialogue
      onOpenChange(false)

      // Rafraîchir la page pour mettre à jour la liste
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de l'étudiant")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer l'étudiant</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l'étudiant {student.firstName} {student.lastName} ? Cette action est
            irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Cette action supprimera définitivement toutes les données associées à cet étudiant, y compris ses
            inscriptions aux cours, ses notes et ses documents.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Suppression..." : "Supprimer définitivement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
