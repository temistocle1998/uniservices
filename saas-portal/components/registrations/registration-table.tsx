"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, ArrowUpDown, Download } from "lucide-react"
import ViewRegistrationDialog from "./view-registration-dialog"
import EditRegistrationDialog from "./edit-registration-dialog"
import CancelRegistrationDialog from "./cancel-registration-dialog"

// Type pour une inscription
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

interface RegistrationTableProps {
  filter: "all" | "new" | "reenrollment" | "pending"
}

export default function RegistrationTable({ filter }: RegistrationTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Registration>("registrationDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [academicYearFilter, setAcademicYearFilter] = useState<string>("2023-2024")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>(filter === "pending" ? "pending" : "all")

  // Données simulées des inscriptions
  const registrations: Registration[] = [
    {
      id: "1",
      studentId: "20230001",
      studentName: "Marie Dupont",
      studentEmail: "marie.dupont@etudiant.fr",
      academicYear: "2023-2024",
      department: "Sciences",
      program: "Licence en Mathématiques",
      registrationType: "new",
      status: "approved",
      registrationDate: "2023-07-15",
      paymentStatus: "paid",
    },
    {
      id: "2",
      studentId: "20230002",
      studentName: "Thomas Martin",
      studentEmail: "thomas.martin@etudiant.fr",
      academicYear: "2023-2024",
      department: "Lettres",
      program: "Licence en Histoire",
      registrationType: "new",
      status: "approved",
      registrationDate: "2023-07-18",
      paymentStatus: "paid",
    },
    {
      id: "3",
      studentId: "20220015",
      studentName: "Sophie Bernard",
      studentEmail: "sophie.bernard@etudiant.fr",
      academicYear: "2023-2024",
      department: "Droit",
      program: "Master en Droit des Affaires",
      registrationType: "reenrollment",
      status: "approved",
      registrationDate: "2023-07-10",
      paymentStatus: "paid",
    },
    {
      id: "4",
      studentId: "20230045",
      studentName: "Lucas Petit",
      studentEmail: "lucas.petit@etudiant.fr",
      academicYear: "2023-2024",
      department: "Sciences",
      program: "Master en Physique",
      registrationType: "new",
      status: "pending",
      registrationDate: "2023-08-05",
      paymentStatus: "partial",
    },
    {
      id: "5",
      studentId: "20230010",
      studentName: "Emma Leroy",
      studentEmail: "emma.leroy@etudiant.fr",
      academicYear: "2023-2024",
      department: "Économie",
      program: "Licence en Économie",
      registrationType: "new",
      status: "pending",
      registrationDate: "2023-08-12",
      paymentStatus: "unpaid",
    },
    {
      id: "6",
      studentId: "20210078",
      studentName: "Hugo Moreau",
      studentEmail: "hugo.moreau@etudiant.fr",
      academicYear: "2023-2024",
      department: "Sciences",
      program: "Licence en Informatique",
      registrationType: "reenrollment",
      status: "approved",
      registrationDate: "2023-07-22",
      paymentStatus: "paid",
    },
    {
      id: "7",
      studentId: "20220089",
      studentName: "Chloé Dubois",
      studentEmail: "chloe.dubois@etudiant.fr",
      academicYear: "2023-2024",
      department: "Lettres",
      program: "Licence en Langues Étrangères",
      registrationType: "reenrollment",
      status: "rejected",
      registrationDate: "2023-07-30",
      paymentStatus: "unpaid",
    },
  ]

  // Liste des départements uniques pour le filtre
  const departments = Array.from(new Set(registrations.map((registration) => registration.department)))

  // Liste des années académiques pour le filtre
  const academicYears = ["2023-2024", "2022-2023", "2021-2022"]

  // Fonction pour trier les inscriptions
  const sortedRegistrations = [...registrations].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Fonction pour filtrer les inscriptions
  const filteredRegistrations = sortedRegistrations.filter((registration) => {
    const matchesSearch =
      registration.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.program.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAcademicYear = academicYearFilter === "all" || registration.academicYear === academicYearFilter
    const matchesDepartment = departmentFilter === "all" || registration.department === departmentFilter
    const matchesStatus = statusFilter === "all" || registration.status === statusFilter

    let matchesType = true
    if (filter === "new") {
      matchesType = registration.registrationType === "new"
    } else if (filter === "reenrollment") {
      matchesType = registration.registrationType === "reenrollment"
    } else if (filter === "pending") {
      matchesType = registration.status === "pending"
    }

    return matchesSearch && matchesAcademicYear && matchesDepartment && matchesStatus && matchesType
  })

  // Fonction pour changer le tri
  const toggleSort = (column: keyof Registration) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

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

  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    // En-têtes CSV
    const headers = [
      "ID",
      "Numéro étudiant",
      "Nom",
      "Email",
      "Année académique",
      "Département",
      "Programme",
      "Type d'inscription",
      "Statut",
      "Date d'inscription",
      "Statut de paiement",
    ]

    // Données CSV
    const csvData = filteredRegistrations.map((registration) => [
      registration.id,
      registration.studentId,
      registration.studentName,
      registration.studentEmail,
      registration.academicYear,
      registration.department,
      registration.program,
      registration.registrationType === "new" ? "Nouvelle" : "Réinscription",
      getStatusLabel(registration.status),
      registration.registrationDate,
      getPaymentStatusLabel(registration.paymentStatus),
    ])

    // Créer le contenu CSV
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "inscriptions.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={academicYearFilter} onValueChange={setAcademicYearFilter}>
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Année académique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les années</SelectItem>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les départements</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="approved">Approuvée</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="rejected">Rejetée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("studentName")}>
                <span>Étudiant</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("studentId")}>
                <span>Numéro</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("department")}>
                <span>Département</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("program")}>
                <span>Programme</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("registrationType")}>
                <span>Type</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("registrationDate")}>
                <span>Date</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("status")}>
                <span>Statut</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("paymentStatus")}>
                <span>Paiement</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRegistrations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center h-24">
                Aucune inscription trouvée.
              </TableCell>
            </TableRow>
          ) : (
            filteredRegistrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell className="font-medium">{registration.studentName}</TableCell>
                <TableCell>{registration.studentId}</TableCell>
                <TableCell>{registration.department}</TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={registration.program}>
                    {registration.program}
                  </div>
                </TableCell>
                <TableCell>{registration.registrationType === "new" ? "Nouvelle" : "Réinscription"}</TableCell>
                <TableCell>{formatDate(registration.registrationDate)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(registration.status)}>
                    {getStatusLabel(registration.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentStatusBadgeVariant(registration.paymentStatus)}>
                    {getPaymentStatusLabel(registration.paymentStatus)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <ViewRegistrationDialog registration={registration} />
                      <DropdownMenuSeparator />
                      <EditRegistrationDialog registration={registration} />
                      <CancelRegistrationDialog registration={registration} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="text-sm text-muted-foreground">
        {filteredRegistrations.length} inscription{filteredRegistrations.length !== 1 ? "s" : ""} trouvée
        {filteredRegistrations.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
