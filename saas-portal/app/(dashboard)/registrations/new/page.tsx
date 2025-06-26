"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data - in a real app, this would come from an API
const academicYears = [
  { id: "1", name: "2023-2024" },
  { id: "2", name: "2022-2023" },
]

const departments = [
  { id: "1", name: "Informatique" },
  { id: "2", name: "Gestion" },
  { id: "3", name: "Droit" },
]

const programs = [
  { id: "1", name: "Licence en Informatique", departmentId: "1" },
  { id: "2", name: "Master en Informatique", departmentId: "1" },
  { id: "3", name: "Licence en Gestion", departmentId: "2" },
  { id: "4", name: "Master en Gestion", departmentId: "2" },
  { id: "5", name: "Licence en Droit", departmentId: "3" },
  { id: "6", name: "Master en Droit", departmentId: "3" },
]

const formSchema = z.object({
  academicYearId: z.string({
    required_error: "Veuillez sélectionner une année académique",
  }),
  studentInfo: z.object({
    firstName: z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    }),
    email: z.string().email({
      message: "Veuillez entrer une adresse email valide",
    }),
    phone: z.string().min(8, {
      message: "Le numéro de téléphone doit contenir au moins 8 caractères",
    }),
    dateOfBirth: z.string().min(1, {
      message: "Veuillez entrer une date de naissance",
    }),
    address: z.string().min(5, {
      message: "L'adresse doit contenir au moins 5 caractères",
    }),
  }),
  programInfo: z.object({
    departmentId: z.string({
      required_error: "Veuillez sélectionner un département",
    }),
    programId: z.string({
      required_error: "Veuillez sélectionner un programme",
    }),
    level: z.string({
      required_error: "Veuillez sélectionner un niveau",
    }),
  }),
  paymentInfo: z.object({
    registrationFee: z.boolean().default(false),
    tuitionFee: z.boolean().default(false),
    paymentMethod: z.string().optional(),
    paymentReference: z.string().optional(),
  }),
})

export default function NewRegistrationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filteredPrograms, setFilteredPrograms] = useState(programs)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
      },
      programInfo: {
        departmentId: "",
        programId: "",
        level: "",
      },
      paymentInfo: {
        registrationFee: false,
        tuitionFee: false,
        paymentMethod: "",
        paymentReference: "",
      },
    },
  })

  const watchDepartmentId = form.watch("programInfo.departmentId")

  // Filter programs when department changes
  useState(() => {
    if (watchDepartmentId) {
      setFilteredPrograms(programs.filter((program) => program.departmentId === watchDepartmentId))
    } else {
      setFilteredPrograms([])
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
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
        <h1 className="text-2xl font-bold">Nouvelle Inscription</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Année Académique</CardTitle>
              <CardDescription>Sélectionnez l&apos;année académique pour cette inscription</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de l&apos;Étudiant</CardTitle>
              <CardDescription>Entrez les informations personnelles de l&apos;étudiant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentInfo.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentInfo.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+123 456 789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentInfo.dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de naissance</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="studentInfo.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Programme d&apos;Études</CardTitle>
              <CardDescription>Sélectionnez le département et le programme d&apos;études</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="programInfo.departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Département</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.setValue("programInfo.programId", "")
                        setFilteredPrograms(programs.filter((program) => program.departmentId === value))
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un département" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programInfo.programId"
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
                        {filteredPrograms.map((program) => (
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
                control={form.control}
                name="programInfo.level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Première année</SelectItem>
                        <SelectItem value="2">Deuxième année</SelectItem>
                        <SelectItem value="3">Troisième année</SelectItem>
                        <SelectItem value="4">Quatrième année</SelectItem>
                        <SelectItem value="5">Cinquième année</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de Paiement</CardTitle>
              <CardDescription>Enregistrez les détails du paiement pour cette inscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="paymentInfo.registrationFee"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Frais d&apos;inscription payés</FormLabel>
                        <FormDescription>Cochez si les frais d&apos;inscription ont été payés</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentInfo.tuitionFee"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Frais de scolarité payés</FormLabel>
                        <FormDescription>Cochez si les frais de scolarité ont été payés</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="paymentInfo.paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Méthode de paiement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une méthode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cash">Espèces</SelectItem>
                          <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                          <SelectItem value="check">Chèque</SelectItem>
                          <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentInfo.paymentReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Référence de paiement</FormLabel>
                      <FormControl>
                        <Input placeholder="Numéro de reçu, référence..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer l&apos;inscription
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
