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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, UserPlus } from "lucide-react"
import { toast } from "sonner"

export default function NewRegistrationButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("search")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
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
      studentId: "20230001",
    },
    {
      id: "2",
      firstName: "Thomas",
      lastName: "Martin",
      email: "thomas.martin@etudiant.fr",
      studentId: "20230002",
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@etudiant.fr",
      studentId: "20230003",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler l'ajout d'une inscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      toast.success(
        activeTab === "search"
          ? "Inscription créée avec succès pour l'étudiant existant"
          : "Nouvel étudiant inscrit avec succès",
      )

      // Fermer la boîte de dialogue et réinitialiser le formulaire
      setOpen(false)
      setSearchTerm("")
      setSelectedStudent(null)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        department: "",
        program: "",
        academicYear: "2023-2024",
      })
      setActiveTab("search")

      // Rafraîchir la page pour afficher la nouvelle inscription
      router.refresh()
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvelle inscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle inscription</DialogTitle>
          <DialogDescription>
            Inscrivez un nouvel étudiant ou un étudiant existant pour l'année académique en cours.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Étudiant existant</TabsTrigger>
            <TabsTrigger value="new">Nouvel étudiant</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4 py-4">
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
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <div>
                        <div className="font-medium">
                          {student.lastName} {student.firstName}
                        </div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
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
          </TabsContent>

          <TabsContent value="new" className="space-y-4 py-4">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="prenom.nom@etudiant.fr"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Genre</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Homme">Homme</SelectItem>
                    <SelectItem value="Femme">Femme</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                    <SelectItem value="Non précisé">Non précisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (activeTab === "search" && !selectedStudent) ||
              (activeTab === "new" &&
                (!formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.dateOfBirth ||
                  !formData.gender ||
                  !formData.department ||
                  !formData.program))
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Inscription en cours..." : "Inscrire l'étudiant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
