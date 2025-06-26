"use client"

import { useState } from "react"
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
import { MoreHorizontal, Search, ArrowUpDown } from "lucide-react"
import EditProgramDialog from "./edit-program-dialog"
import DeleteProgramDialog from "./delete-program-dialog"

// Type pour une filière
interface Program {
  id: string
  name: string
  level: string
  coordinator: string
  studentCount: number
  courseCount: number
  status: "active" | "inactive" | "pending"
}

interface ProgramTableProps {
  departmentId: string
}

export default function ProgramTable({ departmentId }: ProgramTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Program>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Données simulées des filières pour le département
  const programs: Program[] = [
    {
      id: "1",
      name: "Licence en Mathématiques",
      level: "Licence",
      coordinator: "Dr. Pierre Martin",
      studentCount: 120,
      courseCount: 24,
      status: "active",
    },
    {
      id: "2",
      name: "Master en Physique Quantique",
      level: "Master",
      coordinator: "Dr. Sophie Dubois",
      studentCount: 45,
      courseCount: 16,
      status: "active",
    },
    {
      id: "3",
      name: "Doctorat en Astrophysique",
      level: "Doctorat",
      coordinator: "Dr. Jean Moreau",
      studentCount: 12,
      courseCount: 8,
      status: "active",
    },
    {
      id: "4",
      name: "Licence en Informatique",
      level: "Licence",
      coordinator: "Dr. Marie Laurent",
      studentCount: 150,
      courseCount: 28,
      status: "active",
    },
    {
      id: "5",
      name: "Master en Intelligence Artificielle",
      level: "Master",
      coordinator: "Dr. Thomas Bernard",
      studentCount: 60,
      courseCount: 18,
      status: "active",
    },
    {
      id: "6",
      name: "Licence en Biologie",
      level: "Licence",
      coordinator: "Dr. Claire Dupont",
      studentCount: 110,
      courseCount: 26,
      status: "active",
    },
    {
      id: "7",
      name: "Master en Chimie Organique",
      level: "Master",
      coordinator: "Dr. Paul Leroy",
      studentCount: 35,
      courseCount: 14,
      status: "pending",
    },
    {
      id: "8",
      name: "Doctorat en Génétique",
      level: "Doctorat",
      coordinator: "Dr. Anne Petit",
      studentCount: 8,
      courseCount: 6,
      status: "inactive",
    },
  ]

  // Fonction pour trier les filières
  const sortedPrograms = [...programs].sort((a, b) => {
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

  // Fonction pour filtrer les filières
  const filteredPrograms = sortedPrograms.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour changer le tri
  const toggleSort = (column: keyof Program) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeVariant = (status: Program["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "default"
    }
  }

  // Fonction pour traduire le statut
  const getStatusLabel = (status: Program["status"]) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une filière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px]"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("name")}>
                <span>Nom de la filière</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("level")}>
                <span>Niveau</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("coordinator")}>
                <span>Coordinateur</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                className="flex items-center justify-end gap-1 cursor-pointer"
                onClick={() => toggleSort("studentCount")}
              >
                <span>Étudiants</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                className="flex items-center justify-end gap-1 cursor-pointer"
                onClick={() => toggleSort("courseCount")}
              >
                <span>Cours</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("status")}>
                <span>Statut</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPrograms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                Aucune filière trouvée.
              </TableCell>
            </TableRow>
          ) : (
            filteredPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell>{program.level}</TableCell>
                <TableCell>{program.coordinator}</TableCell>
                <TableCell className="text-right">{program.studentCount}</TableCell>
                <TableCell className="text-right">{program.courseCount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(program.status)}>{getStatusLabel(program.status)}</Badge>
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
                      <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <EditProgramDialog program={program} departmentId={departmentId} />
                      <DeleteProgramDialog program={program} departmentId={departmentId} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
