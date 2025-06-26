"use client"

import { useState } from "react"
import Link from "next/link"
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
import EditStudentDialog from "./edit-student-dialog"
import DeleteStudentDialog from "./delete-student-dialog"

// Type pour un étudiant
interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  studentId: string
  department: string
  program: string
  year: string
  status: "active" | "inactive" | "suspended" | "graduated"
  enrollmentDate: string
}

export default function StudentTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Student>("lastName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Données simulées des étudiants (ajoutons plus de données)
  const students: Student[] = [
    {
      id: "1",
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie.dupont@etudiant.fr",
      studentId: "20210001",
      department: "Sciences",
      program: "Licence en Mathématiques",
      year: "3ème année",
      status: "active",
      enrollmentDate: "2021-09-01",
    },
    {
      id: "2",
      firstName: "Thomas",
      lastName: "Martin",
      email: "thomas.martin@etudiant.fr",
      studentId: "20210002",
      department: "Lettres",
      program: "Licence en Histoire",
      year: "2ème année",
      status: "active",
      enrollmentDate: "2021-09-01",
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@etudiant.fr",
      studentId: "20200015",
      department: "Droit",
      program: "Master en Droit des Affaires",
      year: "1ère année",
      status: "active",
      enrollmentDate: "2020-09-01",
    },
    {
      id: "4",
      firstName: "Lucas",
      lastName: "Petit",
      email: "lucas.petit@etudiant.fr",
      studentId: "20190045",
      department: "Sciences",
      program: "Master en Physique",
      year: "2ème année",
      status: "graduated",
      enrollmentDate: "2019-09-01",
    },
    {
      id: "5",
      firstName: "Emma",
      lastName: "Leroy",
      email: "emma.leroy@etudiant.fr",
      studentId: "20220010",
      department: "Économie",
      program: "Licence en Économie",
      year: "1ère année",
      status: "active",
      enrollmentDate: "2022-09-01",
    },
    {
      id: "6",
      firstName: "Hugo",
      lastName: "Moreau",
      email: "hugo.moreau@etudiant.fr",
      studentId: "20210078",
      department: "Sciences",
      program: "Licence en Informatique",
      year: "2ème année",
      status: "suspended",
      enrollmentDate: "2021-09-01",
    },
    {
      id: "7",
      firstName: "Chloé",
      lastName: "Dubois",
      email: "chloe.dubois@etudiant.fr",
      studentId: "20220089",
      department: "Lettres",
      program: "Licence en Langues Étrangères",
      year: "1ère année",
      status: "inactive",
      enrollmentDate: "2022-09-01",
    },
    // Ajoutons plus d'étudiants pour tester la pagination
    ...Array.from({ length: 35 }, (_, i) => ({
      id: `${i + 8}`,
      firstName: `Prénom${i + 8}`,
      lastName: `Nom${i + 8}`,
      email: `etudiant${i + 8}@etudiant.fr`,
      studentId: `2023${String(i + 8).padStart(4, "0")}`,
      department: ["Sciences", "Lettres", "Droit", "Économie"][i % 4],
      program: `Programme ${i + 8}`,
      year: ["1ère année", "2ème année", "3ème année"][i % 3],
      status: ["active", "inactive", "suspended", "graduated"][i % 4] as
        | "active"
        | "inactive"
        | "suspended"
        | "graduated",
      enrollmentDate: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 9) + 1}-01`,
    })),
  ]

  // Liste des départements uniques pour le filtre
  const departments = Array.from(new Set(students.map((student) => student.department)))

  // Fonction pour trier les étudiants
  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Fonction pour filtrer les étudiants
  const filteredStudents = sortedStudents.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

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
  const toggleSort = (column: keyof Student) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeVariant = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      case "graduated":
        return "outline"
      default:
        return "default"
    }
  }

  // Fonction pour traduire le statut
  const getStatusLabel = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      case "suspended":
        return "Suspendu"
      case "graduated":
        return "Diplômé"
      default:
        return status
    }
  }

  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    // En-têtes CSV
    const headers = [
      "ID",
      "Prénom",
      "Nom",
      "Email",
      "Numéro étudiant",
      "Département",
      "Programme",
      "Année",
      "Statut",
      "Date d'inscription",
    ]

    // Données CSV
    const csvData = filteredStudents.map((student) => [
      student.id,
      student.firstName,
      student.lastName,
      student.email,
      student.studentId,
      student.department,
      student.program,
      student.year,
      getStatusLabel(student.status),
      student.enrollmentDate,
    ])

    // Créer le contenu CSV
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "etudiants.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full">
      {/* Filtres et recherche */}
      <div className="p-4 border-b space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-9 w-full max-w-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={departmentFilter} onValueChange={handleFilterChange(setDepartmentFilter)}>
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
              <SelectTrigger className="h-9 w-[120px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
                <SelectItem value="graduated">Diplômé</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau avec scroll horizontal */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[160px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("lastName")}>
                  <span>Nom</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="min-w-[120px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("studentId")}>
                  <span>N° étudiant</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="min-w-[200px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("email")}>
                  <span>Email</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="min-w-[100px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("department")}>
                  <span>Département</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="min-w-[180px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("program")}>
                  <span>Programme</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="min-w-[100px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("status")}>
                  <span>Statut</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  Aucun étudiant trouvé.
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <Link href={`/students/${student.id}`} className="hover:underline">
                      <div className="max-w-[150px] truncate">
                        {student.lastName} {student.firstName}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[110px] truncate">{student.studentId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[190px] truncate" title={student.email}>
                      {student.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[90px] truncate">{student.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[170px] truncate" title={student.program}>
                      {student.program}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(student.status)}>{getStatusLabel(student.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/students/${student.id}`)}>
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <EditStudentDialog student={student} />
                        <DeleteStudentDialog student={student} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredStudents.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
