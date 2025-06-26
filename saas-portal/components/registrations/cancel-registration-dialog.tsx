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

interface Registration {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  academicYear: string
  department: string
  program: string
  registrationType: "new" | "reenrollment"
  status: "pending" | "approved" | "rejected" | "cancelled"
  registrationDate: string
  paymentStatus: "unpaid" | "partial" | "paid"
}

interface CancelRegistrationDialogProps {
  registration: Registration
}

export default function CancelRegistrationDialog({ registration }: CancelRegistrationDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {
    setIsLoading(true)

    try {
      // Simuler l'annulation d'une inscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Inscription annulée avec succès")

      // Fermer la boîte de dialogue
      setOpen(false)

      // Rafraîchir la page pour mettre à jour la liste
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'annulation de l'inscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier si l'inscription peut être annulée
  const canCancel = registration.status !== "cancelled" && registration.status !== "rejected"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-destructive focus:text-destructive"
          disabled={!canCancel}
        >
          Annuler l'inscription
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Annuler l'inscription
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir annuler l'inscription de {registration.studentName} ? Cette action est
            irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            L'annulation de cette inscription entraînera la perte de la place réservée pour cet étudiant. Si des frais
            ont été payés, ils devront être remboursés selon la politique de l'établissement.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Retour
          </Button>
          <Button type="button" variant="destructive" onClick={handleCancel} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Annulation..." : "Confirmer l'annulation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
