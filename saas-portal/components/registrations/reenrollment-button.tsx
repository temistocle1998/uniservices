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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function ReenrollmentButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    department: "",
    program: "",
    academicYear: "2023-2024",
  })

  // Données simulées des étudiants pour la recherche
  const students = [
    {
      id: "1",
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie.dupont@etudiant.fr",
      studentId: "20220001",
      lastAcademicYear: "2022-2023",
      lastProgram: "Licence en Mathématiques",
      lastDepartment: "Sciences",
    },
    {
      id: "2",
      firstName: "Thomas",
      lastName: "Martin",
      email: "thomas.martin@etudiant.fr",
      studentId: "20220002",
      lastAcademicYear: "2022-2023",
      lastProgram: "Licence en Histoire",
      lastDepartment: "Lettres",
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@etudiant.fr",
      studentId: "20210015",
      lastAcademicYear: "2022-2023",
      lastProgram: "Master en Droit des Affaires",
      lastDepartment: "Droit",
    },
  ]

  // Filtrer les étudiants en fonction du terme de recherche
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectStudent = (student: (typeof students)[0]) => {
    setSelectedStudent(student.id)
    setFormData({
      department: student.lastDepartment,
      program: student.lastProgram,
      academicYear: "2023-2024",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler la réinscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success("Réinscription effectuée avec succès")

      // Fermer la boîte de dialogue et réinitialiser le formulaire
      setOpen(false)
      setSearchTerm("")
      setSelectedStudent(null)
      setFormData({
        department: "",
        program: "",
        academicYear: "2023-2024",
      })

      // Rafraîchir la page pour afficher la nouvelle inscription
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la réinscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Réinscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Réinscription d'un étudiant</DialogTitle>
          <DialogDescription>Réinscrivez un étudiant existant pour la nouvelle année académique.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un étudiant par nom, email ou numéro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto border rounded-md">
            {filteredStudents.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">Aucun étudiant trouvé</div>
            ) : (
              <div className="divide-y">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${
                      selectedStudent === student.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div>
                      <div className="font-medium">
                        {student.lastName} {student.firstName}
                      </div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                      <div className="text-xs text-muted-foreground">
                        Dernière inscription: {student.lastAcademicYear} - {student.lastProgram}
                      </div>
                    </div>
                    <div className="text-sm">{student.studentId}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedStudent && (
            <form className="space-y-4">
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
                <Select
                  value={formData.program}
                  onValueChange={(value) => handleSelectChange("program", value)}
                  required
                >
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
                <Label htmlFor="academicYear">Année académique</Label>
                <Select
                  value={formData.academicYear}
                  onValueChange={(value) => handleSelectChange("academicYear", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une année académique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2021-2022">2021-2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading || !selectedStudent || !formData.department || !formData.program || !formData.academicYear
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Réinscription en cours..." : "Réinscrire l'étudiant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
