"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { FileText } from "lucide-react"

interface Enrollment {
  id: string
  studentId: string
  studentName: string
  academicYear: string
  department: string
  program: string
  enrollmentType: "new" | "renewal"
  enrollmentDate: string
  paymentStatus: "paid" | "partial" | "pending" | "waived"
  paymentAmount: number
  receiptNumber: string
}

interface EnrollmentReceiptDialogProps {
  enrollment: Enrollment
}

export default function EnrollmentReceiptDialog({ enrollment }: EnrollmentReceiptDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Afficher le reçu</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reçu d'inscription</DialogTitle>
          <DialogDescription>
            Afficher et imprimer le reçu d'inscription pour {enrollment.studentName}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Numéro de reçu: {enrollment.receiptNumber || "N/A"}</p>
          <p>Étudiant: {enrollment.studentName}</p>
          <p>Montant payé: {enrollment.paymentAmount}</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
          <Button>
            Imprimer le reçu
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
