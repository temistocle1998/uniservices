"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ClipboardCheck, Edit, FileText, Trash } from "lucide-react"
import type { Student } from "@/lib/data"
import EditStudentDialog from "./edit-student-dialog"
import DeleteStudentDialog from "./delete-student-dialog"

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  const router = useRouter()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "graduated":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "suspended":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`https://avatar.vercel.sh/${student.id}.png`}
              alt={`${student.firstName} ${student.lastName}`}
            />
            <AvatarFallback>
              {student.firstName[0]}
              {student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="outline" className="text-red-500" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className={getStatusColor(student.status)}>
          {student.status === "active" && "Actif"}
          {student.status === "inactive" && "Inactif"}
          {student.status === "graduated" && "Diplômé"}
          {student.status === "suspended" && "Suspendu"}
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
          {student.programName}
        </Badge>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="registrations">Inscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Date de naissance</div>
                <div>{new Date(student.dateOfBirth).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Genre</div>
                <div>
                  {student.gender === "male" && "Masculin"}
                  {student.gender === "female" && "Féminin"}
                  {student.gender === "other" && "Autre"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Adresse</div>
                <div>{student.address}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Téléphone</div>
                <div>{student.phoneNumber}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Date d'inscription</div>
                <div>{new Date(student.enrollmentDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Filière</div>
                <div>{student.programName}</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Assiduité</CardTitle>
                <CardDescription>Suivi des présences et absences</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center">
                  <ClipboardCheck className="h-8 w-8 text-muted-foreground mr-4" />
                  <div>
                    <div className="text-xl font-bold">Voir les absences</div>
                    <div className="text-sm text-muted-foreground">Historique complet</div>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/students/${student.id}/attendance`}>Consulter</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Justificatifs</CardTitle>
                <CardDescription>Gestion des justificatifs d'absence</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-muted-foreground mr-4" />
                  <div>
                    <div className="text-xl font-bold">Justificatifs</div>
                    <div className="text-sm text-muted-foreground">Soumettre et consulter</div>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/students/${student.id}/excuses`}>Gérer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inscriptions</CardTitle>
                <CardDescription>Historique des inscriptions</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center">
                  <CalendarDays className="h-8 w-8 text-muted-foreground mr-4" />
                  <div>
                    <div className="text-xl font-bold">Voir les inscriptions</div>
                    <div className="text-sm text-muted-foreground">Historique complet</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="registrations"]')?.click()}
                >
                  Consulter
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Historique des inscriptions</CardTitle>
              <CardDescription>Toutes les inscriptions de l'étudiant</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ici, vous pouvez ajouter un tableau des inscriptions de l'étudiant */}
              <p className="text-muted-foreground">Fonctionnalité à implémenter</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditStudentDialog
        student={student}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onStudentUpdated={(updatedStudent) => {
          // Dans une application réelle, vous mettriez à jour l'état ou rechargeriez les données
          router.refresh()
        }}
      />

      <DeleteStudentDialog
        student={student}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onStudentDeleted={() => {
          router.push("/students")
        }}
      />
    </div>
  )
}
