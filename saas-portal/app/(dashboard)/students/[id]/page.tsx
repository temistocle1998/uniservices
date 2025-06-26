import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StudentDetails from "@/components/students/student-details"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Détails de l'étudiant | UniServices",
  description: "Informations détaillées sur l'étudiant",
}

// Fonction pour récupérer les données de l'étudiant (simulée)
function getStudentData(id: string) {
  // Simuler des données d'étudiant étendues
  const students = [
    {
      id: "1",
      firstName: "Mamadou Lamine",
      lastName: "BEYE",
      email: "laminebeye007@gmail.com",
      studentId: "20210001",
      dateOfBirth: "1999-05-15",
      gender: "male" as const,
      address: "12 rue des Lilas, 75001 Dakar",
      phoneNumber: "06 12 34 56 78",
      enrollmentDate: "2021-09-01",
      departmentId: "1",
      programId: "1",
      programName: "Licence en Mathématiques",
      year: "3ème année",
      status: "active" as const,
      gpa: 16.5,
      credits: 120,
    },
    {
      id: "2",
      firstName: "Thomas",
      lastName: "Martin",
      email: "thomas.martin@etudiant.fr",
      studentId: "20210002",
      dateOfBirth: "2000-02-20",
      gender: "male" as const,
      address: "45 avenue Victor Hugo, 75016 Paris",
      phoneNumber: "06 23 45 67 89",
      enrollmentDate: "2021-09-01",
      departmentId: "2",
      programId: "2",
      programName: "Licence en Histoire",
      year: "2ème année",
      status: "active" as const,
      gpa: 14.8,
      credits: 60,
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@etudiant.fr",
      studentId: "20200015",
      dateOfBirth: "1998-11-10",
      gender: "female" as const,
      address: "8 rue du Commerce, 75015 Paris",
      phoneNumber: "06 34 56 78 90",
      enrollmentDate: "2020-09-01",
      departmentId: "3",
      programId: "3",
      programName: "Master en Droit des Affaires",
      year: "1ère année",
      status: "active" as const,
      gpa: 15.2,
      credits: 180,
    },
    {
      id: "4",
      firstName: "Lucas",
      lastName: "Petit",
      email: "lucas.petit@etudiant.fr",
      studentId: "20220003",
      dateOfBirth: "1999-01-25",
      gender: "male" as const,
      address: "202 Avenue des Champs-Élysées, Paris",
      phoneNumber: "06 56 78 90 12",
      enrollmentDate: "2022-09-01",
      departmentId: "1",
      programId: "1",
      programName: "Licence en Informatique",
      year: "2ème année",
      status: "active" as const,
      gpa: 15.8,
      credits: 60,
    },
    {
      id: "5",
      firstName: "Emma",
      lastName: "Leroy",
      email: "emma.leroy@etudiant.fr",
      studentId: "20210005",
      dateOfBirth: "1998-09-14",
      gender: "female" as const,
      address: "303 Rue Garibaldi, Lyon",
      phoneNumber: "06 67 89 01 23",
      enrollmentDate: "2021-09-01",
      departmentId: "4",
      programId: "4",
      programName: "Licence en Langues Étrangères",
      year: "3ème année",
      status: "active" as const,
      gpa: 16.2,
      credits: 120,
    },
    {
      id: "6",
      firstName: "Antoine",
      lastName: "Michel",
      email: "antoine.michel@etudiant.fr",
      studentId: "20200006",
      dateOfBirth: "1998-02-18",
      gender: "male" as const,
      address: "606 Boulevard Gambetta, Lille",
      phoneNumber: "06 78 90 12 34",
      enrollmentDate: "2020-09-01",
      departmentId: "2",
      programId: "5",
      programName: "Master en Statistiques",
      year: "2ème année",
      status: "active" as const,
      gpa: 14.5,
      credits: 90,
    },
    {
      id: "7",
      firstName: "Léa",
      lastName: "Robert",
      email: "lea.robert@etudiant.fr",
      studentId: "20190007",
      dateOfBirth: "1997-08-27",
      gender: "female" as const,
      address: "707 Rue Nationale, Bordeaux",
      phoneNumber: "06 89 01 23 45",
      enrollmentDate: "2019-09-01",
      departmentId: "3",
      programId: "6",
      programName: "Licence en Physique",
      year: "4ème année",
      status: "active" as const,
      gpa: 17.1,
      credits: 180,
    },
    {
      id: "8",
      firstName: "Chloé",
      lastName: "Simon",
      email: "chloe.simon@etudiant.fr",
      studentId: "20220008",
      dateOfBirth: "1999-12-10",
      gender: "female" as const,
      address: "505 Avenue Jean Jaurès, Toulouse",
      phoneNumber: "06 90 12 34 56",
      enrollmentDate: "2022-09-01",
      departmentId: "4",
      programId: "7",
      programName: "Licence en Économie",
      year: "1ère année",
      status: "active" as const,
      gpa: 13.8,
      credits: 30,
    },
    {
      id: "9",
      firstName: "Maxime",
      lastName: "Dubois",
      email: "maxime.dubois@etudiant.fr",
      studentId: "20210009",
      dateOfBirth: "1998-06-03",
      gender: "male" as const,
      address: "404 Rue de la Paix, Nice",
      phoneNumber: "06 01 23 45 67",
      enrollmentDate: "2021-09-01",
      departmentId: "1",
      programId: "2",
      programName: "Master en Développement Web",
      year: "2ème année",
      status: "active" as const,
      gpa: 16.8,
      credits: 90,
    },
    {
      id: "10",
      firstName: "Camille",
      lastName: "Moreau",
      email: "camille.moreau@etudiant.fr",
      studentId: "20200010",
      dateOfBirth: "1997-11-22",
      gender: "female" as const,
      address: "808 Boulevard Saint-Germain, Paris",
      phoneNumber: "06 12 34 56 78",
      enrollmentDate: "2020-09-01",
      departmentId: "5",
      programId: "8",
      programName: "Master en Psychologie",
      year: "3ème année",
      status: "graduated" as const,
      gpa: 15.9,
      credits: 180,
    },
  ]

  const student = students.find((s) => s.id === id)
  return student
}

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = getStudentData(params.id)

  if (!student) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-full overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/students">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {student.firstName} {student.lastName}
          </h2>
        </div>

        <div className="grid gap-6">
          <StudentDetails student={student} />

          <Tabs defaultValue="courses" className="w-full">
            <TabsList>
              <TabsTrigger value="courses">Cours</TabsTrigger>
              <TabsTrigger value="grades">Notes</TabsTrigger>
              <TabsTrigger value="attendance">Présence</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cours inscrits</CardTitle>
                  <CardDescription>Liste des cours auxquels l'étudiant est inscrit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">MATH201</CardTitle>
                          <CardDescription>Analyse mathématique avancée</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Semestre: Automne 2024</p>
                          <p className="text-sm text-muted-foreground">Crédits: 4</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">PHYS101</CardTitle>
                          <CardDescription>Mécanique classique</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Semestre: Automne 2024</p>
                          <p className="text-sm text-muted-foreground">Crédits: 3</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grades" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relevé de notes</CardTitle>
                  <CardDescription>Historique des notes de l'étudiant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">MATH201 - Analyse mathématique</p>
                          <p className="text-sm text-muted-foreground">Semestre Automne 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{student.gpa}/20</p>
                          <p className="text-sm text-muted-foreground">Note finale</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Suivi de présence</CardTitle>
                  <CardDescription>Historique des présences et absences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">85%</p>
                        <p className="text-sm text-muted-foreground">Taux de présence</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold">34</p>
                        <p className="text-sm text-muted-foreground">Présences</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-red-600">6</p>
                        <p className="text-sm text-muted-foreground">Absences</p>
                      </div>
                    </div>
                    <Link href={`/students/${student.id}/attendance`}>
                      <Button variant="outline" className="w-full">
                        Voir le détail des présences
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documents administratifs</CardTitle>
                  <CardDescription>Certificats, attestations et autres documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Certificat de scolarité</p>
                          <p className="text-sm text-muted-foreground">Généré le 15/01/2024</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Relevé de notes</p>
                          <p className="text-sm text-muted-foreground">Semestre Automne 2023</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
