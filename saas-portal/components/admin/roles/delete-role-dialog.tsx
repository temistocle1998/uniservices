"use client"

import { useState } from "react"
import type { Role } from "@/lib/admin-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface DeleteRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: Role
  onRoleDeleted: (roleId: string) => void
}

export function DeleteRoleDialog({ open, onOpenChange, role, onRoleDeleted }: DeleteRoleDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onRoleDeleted(role.id)
      toast({
        title: "Rôle supprimé",
        description: `Le rôle ${role.name} a été supprimé avec succès.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du rôle.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le rôle</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce rôle ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Vous êtes sur le point de supprimer le rôle <span className="font-medium text-foreground">{role.name}</span>
            .
          </p>
          <p className="mt-2 text-sm text-destructive">
            Attention : Les utilisateurs ayant ce rôle perdront leurs permissions associées.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
