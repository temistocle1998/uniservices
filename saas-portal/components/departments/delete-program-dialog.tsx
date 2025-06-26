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

interface Program {
  id: string
  name: string
  level: string
  coordinator: string
  studentCount: number
  courseCount: number
  status: "active" | "inactive" | "pending"
}

interface DeleteProgramDialogProps {
  program: Program
  departmentId: string
}

export default function DeleteProgramDialog({ program, departmentId }: DeleteProgramDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Simuler la suppression d'une filière
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Filière supprimée avec succès")

      // Fermer la boîte de dialogue
      setOpen(false)

      // Rafraîchir la page pour mettre à jour la liste
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de la filière")
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
          <DialogTitle>Supprimer la filière</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer la filière {program.name} ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Cette action supprimera également tous les cours associés à cette filière. Les étudiants inscrits à cette
            filière ({program.studentCount}) devront être réaffectés manuellement.
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
