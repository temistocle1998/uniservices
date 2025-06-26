"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"
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

interface EditRegistrationDialogProps {
  registration: Registration
}

export default function EditRegistrationDialog({ registration }: EditRegistrationDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    department: registration.department,
    program: registration.program,
    status: registration.status,
    paymentStatus: registration.paymentStatus,
  })

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler la modification d'une inscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Inscription modifiée avec succès")

      // Fermer la boîte de dialogue
      setOpen(false)

      // Rafraîchir la page pour afficher les modifications
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la modification de l'inscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Modifier</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier l'inscription</DialogTitle>
            <DialogDescription>
              Modifiez les informations d'inscription de {registration.studentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="department">Département</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleSelectChange("department", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sciences">Sciences</SelectItem>
                  <SelectItem value="Lettres">Lettres</SelectItem>
                  <SelectItem value="Droit">Droit</SelectItem>
                  <SelectItem value="Économie">Économie</SelectItem>
                  <SelectItem value="Médecine">Médecine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="program">Programme</Label>
              <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un programme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Licence en Mathématiques">Licence en Mathématiques</SelectItem>
                  <SelectItem value="Licence en Informatique">Licence en Informatique</SelectItem>
                  <SelectItem value="Licence en Physique">Licence en Physique</SelectItem>
                  <SelectItem value="Master en Mathématiques">Master en Mathématiques</SelectItem>
                  <SelectItem value="Master en Informatique">Master en Informatique</SelectItem>
                  <SelectItem value="Doctorat en Physique">Doctorat en Physique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Statut de l'inscription</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value as Registration["status"])}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvée</SelectItem>
                  <SelectItem value="rejected">Rejetée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paymentStatus">Statut de paiement</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => handleSelectChange("paymentStatus", value as Registration["paymentStatus"])}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unpaid">Non payé</SelectItem>
                  <SelectItem value="partial">Partiel</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
