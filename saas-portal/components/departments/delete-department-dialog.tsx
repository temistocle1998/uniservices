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
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Department {
  id: string
  name: string
  director: string
  professorCount: number
  studentCount: number
  programCount: number
  createdAt: string
}

interface DeleteDepartmentDialogProps {
  department: Department
}

export default function DeleteDepartmentDialog({ department }: DeleteDepartmentDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Simuler la suppression d'un département
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Département supprimé avec succès")

      // Fermer la boîte de dialogue
      setOpen(false)

      // Rafraîchir la page pour mettre à jour la liste
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression du département")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
          Supprimer
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le département</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le département {department.name} ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Cette action supprimera également toutes les filières associées à ce département. Les étudiants et
            professeurs associés à ce département devront être réaffectés manuellement.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
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
