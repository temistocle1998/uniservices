"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle, Clock, Download, Eye, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { ExcuseDocument } from "@/lib/excuse-data"

interface StudentExcuseTableProps {
  studentId: string
  excuses: ExcuseDocument[]
}

export default function StudentExcuseTable({ studentId, excuses }: StudentExcuseTableProps) {
  const [selectedExcuse, setSelectedExcuse] = useState<ExcuseDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewExcuse = (excuse: ExcuseDocument) => {
    setSelectedExcuse(excuse)
    setIsDialogOpen(true)
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mes justificatifs</CardTitle>
          <CardDescription>Historique des justificatifs soumis</CardDescription>
        </CardHeader>
        <CardContent>
          {excuses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted-foreground mb-4">Vous n'avez soumis aucun justificatif d'absence</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Raison</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {excuses.map((excuse) => (
                    <TableRow key={excuse.id}>
                      <TableCell>{format(new Date(excuse.submissionDate), "PPP", { locale: fr })}</TableCell>
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
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedExcuse && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Détails du justificatif</DialogTitle>
              <DialogDescription>
                Soumis le {format(new Date(selectedExcuse.submissionDate), "PPP", { locale: fr })}
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
                  <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
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

              {selectedExcuse.status !== "pending" && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Commentaire</h4>
                  <p>{selectedExcuse.reviewNotes || "Aucun commentaire"}</p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
