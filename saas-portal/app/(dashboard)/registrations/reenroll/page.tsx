"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data - in a real app, this would come from an API
const academicYears = [
  { id: "1", name: "2023-2024" },
  { id: "2", name: "2022-2023" },
]

const programs = [
  { id: "1", name: "Licence en Informatique", departmentId: "1" },
  { id: "2", name: "Master en Informatique", departmentId: "1" },
  { id: "3", name: "Licence en Gestion", departmentId: "2" },
  { id: "4", name: "Master en Gestion", departmentId: "2" },
  { id: "5", name: "Licence en Droit", departmentId: "3" },
  { id: "6", name: "Master en Droit", departmentId: "3" },
]

// Mock student data
const mockStudents = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+123456789",
    dateOfBirth: "1998-05-15",
    address: "123 Rue de l'Université, Ville",
    currentProgram: "Licence en Informatique",
    currentLevel: "2",
    lastAcademicYear: "2022-2023",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@example.com",
    phone: "+987654321",
    dateOfBirth: "1999-08-22",
    address: "456 Avenue des Sciences, Ville",
    currentProgram: "Master en Gestion",
    currentLevel: "1",
    lastAcademicYear: "2022-2023",
  },
]

const searchSchema = z.object({
  searchTerm: z.string().min(3, {
    message: "Le terme de recherche doit contenir au moins 3 caractères",
  }),
})

const reenrollmentSchema = z.object({
  academicYearId: z.string({
    required_error: "Veuillez sélectionner une année académique",
  }),
  programId: z.string({
    required_error: "Veuillez sélectionner un programme",
  }),
  level: z.string({
    required_error: "Veuillez sélectionner un niveau",
  }),
  paymentInfo: z.object({
    registrationFee: z.boolean().default(false),
    tuitionFee: z.boolean().default(false),
    paymentMethod: z.string().optional(),
    paymentReference: z.string().optional(),
  }),
})

export default function ReenrollmentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockStudents | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)

  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
  })

  const reenrollmentForm = useForm<z.infer<typeof reenrollmentSchema>>({
    resolver: zodResolver(reenrollmentSchema),
    defaultValues: {
      programId: "",
      level: "",
      paymentInfo: {
        registrationFee: false,
        tuitionFee: false,
        paymentMethod: "",
        paymentReference: "",
      },
    },
  })

  function onSearch(values: z.infer<typeof searchSchema>) {
    // Simulate API search
    const results = mockStudents.filter(
      (student) =>
        student.firstName.toLowerCase().includes(values.searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(values.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(values.searchTerm.toLowerCase()),
    )

    if (results.length === 0) {
      setSearchError("Aucun étudiant trouvé avec ces critères")
      setSearchResults(null)
    } else {
      setSearchResults(results)
      setSearchError(null)
    }

    setSelectedStudent(null)
  }

  function selectStudent(student: (typeof mockStudents)[0]) {
    setSelectedStudent(student)

    // Pre-fill some form fields based on student data
    const nextLevel = String(Number(student.currentLevel) + 1)

    reenrollmentForm.setValue("level", nextLevel)

    // Find the program ID based on name
    const programId = programs.find((p) => p.name === student.currentProgram)?.id
    if (programId) {
      reenrollmentForm.setValue("programId", programId)
    }
  }

  function onSubmit(values: z.infer<typeof reenrollmentSchema>) {
    if (!selectedStudent) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log({
        studentId: selectedStudent.id,
        ...values,
      })
      setIsSubmitting(false)
      router.push("/registrations")
    }, 1500)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Réinscription d&apos;un Étudiant</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rechercher un Étudiant</CardTitle>
          <CardDescription>
            Recherchez un étudiant par nom, prénom ou email pour procéder à sa réinscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(onSearch)} className="flex items-end gap-2">
              <FormField
                control={searchForm.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Terme de recherche</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom, prénom ou email de l'étudiant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </form>
          </Form>

          {searchError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Erreur de recherche</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}

          {searchResults && searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Résultats de la recherche</h3>
              <div className="space-y-2">
                {searchResults.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                      selectedStudent?.id === student.id ? "border-primary bg-primary/10" : ""
                    }`}
                    onClick={() => selectStudent(student)}
                  >
                    <div className="font-medium">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                    <div className="text-sm text-muted-foreground">
                      Programme actuel: {student.currentProgram} (Niveau {student.currentLevel})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStudent && (
        <Form {...reenrollmentForm}>
          <form onSubmit={reenrollmentForm.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l&apos;Étudiant</CardTitle>
                <CardDescription>Détails de l&apos;étudiant sélectionné</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nom complet</p>
                    <p className="text-sm">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm">{selectedStudent.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-sm">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date de naissance</p>
                    <p className="text-sm">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm">{selectedStudent.address}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Programme actuel</p>
                    <p className="text-sm">{selectedStudent.currentProgram}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Niveau actuel</p>
                    <p className="text-sm">{selectedStudent.currentLevel}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Dernière année académique</p>
                  <p className="text-sm">{selectedStudent.lastAcademicYear}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détails de la Réinscription</CardTitle>
                <CardDescription>
                  Sélectionnez l&apos;année académique et le programme pour la réinscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={reenrollmentForm.control}
                  name="academicYearId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année Académique</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une année académique" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {academicYears.map((year) => (
                            <SelectItem key={year.id} value={year.id}>
                              {year.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="programId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un programme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program.id} value={program.id}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau</FormLabel>
                      <Input placeholder="Niveau de l'étudiant" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="paymentInfo.registrationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frais d'inscription</FormLabel>
                      <Input type="checkbox" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="paymentInfo.tuitionFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frais de scolarité</FormLabel>
                      <Input type="checkbox" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="paymentInfo.paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Méthode de paiement</FormLabel>
                      <Input placeholder="Méthode de paiement" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reenrollmentForm.control}
                  name="paymentInfo.paymentReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Référence de paiement</FormLabel>
                      <Input placeholder="Référence de paiement" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      )}
    </div>
  )
}
