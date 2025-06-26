"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, ArrowUpDown, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import EnrollmentReceiptDialog from "./enrollment-receipt-dialog"

// Type pour une inscription
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

export default function EnrollmentTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Enrollment>("enrollmentDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")
  const [enrollmentTypeFilter, setEnrollmentTypeFilter] = useState<string>("all")

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Données simulées des inscriptions (ajoutons plus de données pour voir la pagination)
  const enrollments: Enrollment[] = [
    {
      id: "1",
      studentId: "20230001",
      studentName: "Marie Dupont",
      academicYear: "2023-2024",
      department: "Sciences",
      program: "Licence en Mathématiques",
      enrollmentType: "new",
      enrollmentDate: "2023-07-15",
      paymentStatus: "paid",
      paymentAmount: 1500,
      receiptNumber: "REC-2023-001",
    },
    {
      id: "2",
      studentId: "20220015",
      studentName: "Thomas Martin",
      academicYear: "2023-2024",
      department: "Lettres",
      program: "Licence en Histoire",
      enrollmentType: "renewal",
      enrollmentDate: "2023-07-20",
      paymentStatus: "paid",
      paymentAmount: 1500,
      receiptNumber: "REC-2023-002",
    },
    {
      id: "3",
      studentId: "20230002",
      studentName: "Sophie Bernard",
      academicYear: "2023-2024",
      department: "Droit",
      program: "Master en Droit des Affaires",
      enrollmentType: "new",
      enrollmentDate: "2023-07-25",
      paymentStatus: "partial",
      paymentAmount: 750,
      receiptNumber: "REC-2023-003",
    },
    {
      id: "4",
      studentId: "20210045",
      studentName: "Lucas Petit",
      academicYear: "2023-2024",
      department: "Sciences",
      program: "Master en Physique",
      enrollmentType: "renewal",
      enrollmentDate: "2023-08-05",
      paymentStatus: "pending",
      paymentAmount: 0,
      receiptNumber: "",
    },
    {
      id: "5",
      studentId: "20230010",
      studentName: "Emma Leroy",
      academicYear: "2023-2024",
      department: "Économie",
      program: "Licence en Économie",
      enrollmentType: "new",
      enrollmentDate: "2023-08-10",
      paymentStatus: "waived",
      paymentAmount: 0,
      receiptNumber: "REC-2023-004",
    },
    // Ajoutons plus de données pour tester la pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      studentId: `2023${String(i + 6).padStart(4, "0")}`,
      studentName: `Étudiant ${i + 6}`,
      academicYear: "2023-2024",
      department: ["Sciences", "Lettres", "Droit", "Économie"][i % 4],
      program: `Programme ${i + 6}`,
      enrollmentType: (i % 2 === 0 ? "new" : "renewal") as "new" | "renewal",
      enrollmentDate: `2023-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
      paymentStatus: ["paid", "partial", "pending", "waived"][i % 4] as "paid" | "partial" | "pending" | "waived",
      paymentAmount: i % 2 === 0 ? 1500 : 750,
      receiptNumber: i % 4 === 2 ? "" : `REC-2023-${String(i + 5).padStart(3, "0")}`,
    })),
  ]

  // Liste des départements uniques pour le filtre
  const departments = Array.from(new Set(enrollments.map((enrollment) => enrollment.department)))

  // Fonction pour trier les inscriptions
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // Fonction pour filtrer les inscriptions
  const filteredEnrollments = sortedEnrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || enrollment.department === departmentFilter
    const matchesPaymentStatus = paymentStatusFilter === "all" || enrollment.paymentStatus === paymentStatusFilter
    const matchesEnrollmentType = enrollmentTypeFilter === "all" || enrollment.enrollmentType === enrollmentTypeFilter

    return matchesSearch && matchesDepartment && matchesPaymentStatus && matchesEnrollmentType
  })

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredEnrollments.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedEnrollments = filteredEnrollments.slice(startIndex, endIndex)

  // Réinitialiser la page quand les filtres changent
  const handleFilterChange = (filterSetter: (value: string) => void) => (value: string) => {
    filterSetter(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  // Fonction pour changer le tri
  const toggleSort = (column: keyof Enrollment) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  // Fonction pour obtenir la couleur du badge selon le statut de paiement
  const getPaymentStatusBadgeVariant = (status: Enrollment["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "default"
      case "partial":
        return "secondary"
      case "pending":
        return "destructive"
      case "waived":
        return "outline"
      default:
        return "default"
    }
  }

  // Fonction pour traduire le statut de paiement
  const getPaymentStatusLabel = (status: Enrollment["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "Payé"
      case "partial":
        return "Partiel"
      case "pending":
        return "En attente"
      case "waived":
        return "Exonéré"
      default:
        return status
    }
  }

  // Fonction pour traduire le type d'inscription
  const getEnrollmentTypeLabel = (type: Enrollment["enrollmentType"]) => {
    switch (type) {
      case "new":
        return "Nouvelle"
      case "renewal":
        return "Réinscription"
      default:
        return type
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
      "Nom de l'étudiant",
      "Année académique",
      "Département",
      "Programme",
      "Type d'inscription",
      "Date d'inscription",
      "Statut de paiement",
      "Montant payé",
      "Numéro de reçu",
    ]

    // Données CSV
    const csvData = filteredEnrollments.map((enrollment) => [
      enrollment.id,
      enrollment.studentId,
      enrollment.studentName,
      enrollment.academicYear,
      enrollment.department,
      enrollment.program,
      getEnrollmentTypeLabel(enrollment.enrollmentType),
      enrollment.enrollmentDate,
      getPaymentStatusLabel(enrollment.paymentStatus),
      enrollment.paymentAmount,
      enrollment.receiptNumber,
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
            placeholder="Rechercher une inscription..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={departmentFilter} onValueChange={handleFilterChange(setDepartmentFilter)}>
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
          <Select value={paymentStatusFilter} onValueChange={handleFilterChange(setPaymentStatusFilter)}>
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
              <SelectItem value="partial">Partiel</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="waived">Exonéré</SelectItem>
            </SelectContent>
          </Select>
          <Select value={enrollmentTypeFilter} onValueChange={handleFilterChange(setEnrollmentTypeFilter)}>
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="new">Nouvelle</SelectItem>
              <SelectItem value="renewal">Réinscription</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
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
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("enrollmentType")}>
                  <span>Type</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("enrollmentDate")}>
                  <span>Date</span>
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
            {paginatedEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  Aucune inscription trouvée.
                </TableCell>
              </TableRow>
            ) : (
              paginatedEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                  <TableCell>{enrollment.studentId}</TableCell>
                  <TableCell>{enrollment.department}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={enrollment.program}>
                      {enrollment.program}
                    </div>
                  </TableCell>
                  <TableCell>{getEnrollmentTypeLabel(enrollment.enrollmentType)}</TableCell>
                  <TableCell>{formatDate(enrollment.enrollmentDate)}</TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusBadgeVariant(enrollment.paymentStatus)}>
                      {getPaymentStatusLabel(enrollment.paymentStatus)}
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
                        <DropdownMenuItem onClick={() => router.push(`/students/${enrollment.studentId}`)}>
                          Voir l'étudiant
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {enrollment.paymentStatus !== "pending" && <EnrollmentReceiptDialog enrollment={enrollment} />}
                        <DropdownMenuItem
                          disabled={enrollment.paymentStatus === "paid" || enrollment.paymentStatus === "waived"}
                        >
                          Enregistrer un paiement
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={enrollment.paymentStatus === "pending"}>
                          Modifier l'inscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredEnrollments.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  )
}
