"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle, Clock, Download, Eye, Search, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { ExcuseDocument, ExcuseStatus } from "@/lib/excuse-data"
import { students } from "@/lib/data"

interface AdminExcuseTableProps {
  excuses: ExcuseDocument[]
}

export default function AdminExcuseTable({ excuses: initialExcuses }: AdminExcuseTableProps) {
  const router = useRouter()
  const [excuses, setExcuses] = useState<ExcuseDocument[]>(initialExcuses)
  const [selectedExcuse, setSelectedExcuse] = useState<ExcuseDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleViewExcuse = (excuse: ExcuseDocument) => {
    setSelectedExcuse(excuse)
    setReviewNotes(excuse.reviewNotes || "")
    setIsDialogOpen(true)
  }

  const handleApprove = async () => {
    if (!selectedExcuse) return
    setIsProcessing(true)

    try {
      // Dans une application réelle, ceci serait un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mettre à jour l'état local
      const updatedExcuses = excuses.map((excuse) =>
        excuse.id === selectedExcuse.id
          ? {
              ...excuse,
              status: "approved" as ExcuseStatus,
              reviewNotes: reviewNotes,
              reviewedBy: "Admin",
              reviewDate: new Date().toISOString(),
            }
          : excuse,
      )
      setExcuses(updatedExcuses)

      toast({
        title: "Justificatif approuvé",
        description: "Le justificatif a été approuvé avec succès.",
      })

      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error approving excuse:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'approbation du justificatif.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedExcuse) return
    setIsProcessing(true)

    try {
      // Dans une application réelle, ceci serait un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mettre à jour l'état local
      const updatedExcuses = excuses.map((excuse) =>
        excuse.id === selectedExcuse.id
          ? {
              ...excuse,
              status: "rejected" as ExcuseStatus,
              reviewNotes: reviewNotes,
              reviewedBy: "Admin",
              reviewDate: new Date().toISOString(),
            }
          : excuse,
      )
      setExcuses(updatedExcuses)

      toast({
        title: "Justificatif refusé",
        description: "Le justificatif a été refusé.",
      })

      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error rejecting excuse:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du refus du justificatif.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approuvé
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Refusé
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case "medical":
        return "Raison médicale"
      case "family":
        return "Raison familiale"
      case "administrative":
        return "Démarches administratives"
      case "professional":
        return "Raison professionnelle"
      case "transportation":
        return "Problème de transport"
      case "other":
        return "Autre raison"
      default:
        return reason
    }
  }

  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    return student ? `${student.firstName} ${student.lastName}` : studentId
  }

  // Filtrer les justificatifs
  const filteredExcuses = excuses.filter((excuse) => {
    const studentName = getStudentName(excuse.studentId).toLowerCase()
    const matchesSearch = searchTerm === "" || studentName.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || excuse.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par nom d'étudiant..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="rejected">Refusés</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredExcuses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center border rounded-md">
            <p className="text-muted-foreground mb-4">Aucun justificatif trouvé</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Date de soumission</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExcuses.map((excuse) => (
                  <TableRow key={excuse.id}>
                    <TableCell className="font-medium">{getStudentName(excuse.studentId)}</TableCell>
                    <TableCell>{format(new Date(excuse.submissionDate), "dd/MM/yyyy", { locale: fr })}</TableCell>
                    <TableCell>
                      {format(new Date(excuse.startDate), "dd/MM/yyyy")} -{" "}
                      {format(new Date(excuse.endDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{getReasonLabel(excuse.reason)}</TableCell>
                    <TableCell>{getStatusBadge(excuse.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewExcuse(excuse)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={excuse.documentUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedExcuse && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Évaluation du justificatif</DialogTitle>
              <DialogDescription>
                Soumis par {getStudentName(selectedExcuse.studentId)} le{" "}
                {format(new Date(selectedExcuse.submissionDate), "PPP", { locale: fr })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Période</h4>
                  <p>
                    Du {format(new Date(selectedExcuse.startDate), "dd/MM/yyyy")} au{" "}
                    {format(new Date(selectedExcuse.endDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Statut actuel</h4>
                  <div className="mt-1">{getStatusBadge(selectedExcuse.status)}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Raison</h4>
                <p>{getReasonLabel(selectedExcuse.reason)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p>{selectedExcuse.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Document</h4>
                <div className="flex items-center mt-1">
                  <span className="text-sm">{selectedExcuse.documentName}</span>
                  <Button variant="ghost" size="sm" className="ml-2" asChild>
                    <a href={selectedExcuse.documentUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Commentaire</h4>
                <Textarea
                  placeholder="Ajouter un commentaire sur ce justificatif..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  disabled={selectedExcuse.status !== "pending"}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              {selectedExcuse.status === "pending" ? (
                <>
                  <Button variant="outline" onClick={handleReject} disabled={isProcessing} className="text-red-500">
                    Refuser
                  </Button>
                  <Button onClick={handleApprove} disabled={isProcessing}>
                    Approuver
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsDialogOpen(false)}>Fermer</Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
