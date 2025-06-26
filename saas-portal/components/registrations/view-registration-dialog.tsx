"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"

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

interface ViewRegistrationDialogProps {
  registration: Registration
}

export default function ViewRegistrationDialog({ registration }: ViewRegistrationDialogProps) {
  const [open, setOpen] = useState(false)

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeVariant = (status: Registration["status"]) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "cancelled":
        return "outline"
      default:
        return "default"
    }
  }

  // Fonction pour traduire le statut
  const getStatusLabel = (status: Registration["status"]) => {
    switch (status) {
      case "approved":
        return "Approuvée"
      case "pending":
        return "En attente"
      case "rejected":
        return "Rejetée"
      case "cancelled":
        return "Annulée"
      default:
        return status
    }
  }

  // Fonction pour obtenir la couleur du badge selon le statut de paiement
  const getPaymentStatusBadgeVariant = (paymentStatus: Registration["paymentStatus"]) => {
    switch (paymentStatus) {
      case "paid":
        return "default"
      case "partial":
        return "secondary"
      case "unpaid":
        return "destructive"
      default:
        return "default"
    }
  }

  // Fonction pour traduire le statut de paiement
  const getPaymentStatusLabel = (paymentStatus: Registration["paymentStatus"]) => {
    switch (paymentStatus) {
      case "paid":
        return "Payé"
      case "partial":
        return "Partiel"
      case "unpaid":
        return "Non payé"
      default:
        return paymentStatus
    }
  }

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Voir les détails</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de l'inscription</DialogTitle>
          <DialogDescription>
            Informations détaillées sur l'inscription de {registration.studentName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{registration.studentName}</h3>
              <p className="text-sm text-muted-foreground">{registration.studentEmail}</p>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant={getStatusBadgeVariant(registration.status)}>{getStatusLabel(registration.status)}</Badge>
              <span className="text-xs text-muted-foreground mt-1">ID: {registration.id}</span>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Numéro étudiant</p>
              <p>{registration.studentId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Année académique</p>
              <p>{registration.academicYear}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Département</p>
              <p>{registration.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Programme</p>
              <p>{registration.program}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Type d'inscription</p>
              <p>{registration.registrationType === "new" ? "Nouvelle inscription" : "Réinscription"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date d'inscription</p>
              <p>{formatDate(registration.registrationDate)}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Statut de paiement</p>
            <div className="flex items-center justify-between">
              <Badge variant={getPaymentStatusBadgeVariant(registration.paymentStatus)}>
                {getPaymentStatusLabel(registration.paymentStatus)}
              </Badge>
              <div className="text-sm">
                {registration.paymentStatus === "paid"
                  ? "Payé intégralement"
                  : registration.paymentStatus === "partial"
                    ? "Acompte de 30% payé"
                    : "Aucun paiement effectué"}
              </div>
            </div>
          </div>

          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Frais d'inscription</p>
                  <p className="text-lg font-bold">500 €</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Frais de scolarité</p>
                  <p className="text-lg font-bold">3 500 €</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-lg font-bold">4 000 €</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
            </div>
            <Button onClick={() => setOpen(false)}>Fermer</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
