"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

const universityFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  shortName: z.string().min(2, {
    message: "L'acronyme doit contenir au moins 2 caractères.",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères.",
  }),
  postalCode: z.string().min(2, {
    message: "Le code postal doit contenir au moins 2 caractères.",
  }),
  country: z.string().min(2, {
    message: "Le pays doit contenir au moins 2 caractères.",
  }),
  phone: z.string().min(5, {
    message: "Le numéro de téléphone doit contenir au moins 5 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  website: z.string().url({
    message: "Veuillez entrer une URL valide.",
  }),
  description: z.string().optional(),
})

const contactFormSchema = z.object({
  contactName: z.string().min(2, {
    message: "Le nom du contact doit contenir au moins 2 caractères.",
  }),
  contactEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  contactPhone: z.string().min(5, {
    message: "Le numéro de téléphone doit contenir au moins 5 caractères.",
  }),
  contactPosition: z.string().min(2, {
    message: "La position doit contenir au moins 2 caractères.",
  }),
})

const appearanceFormSchema = z.object({
  primaryColor: z.string().min(4, {
    message: "Veuillez entrer une couleur valide.",
  }),
  secondaryColor: z.string().min(4, {
    message: "Veuillez entrer une couleur valide.",
  }),
  accentColor: z.string().min(4, {
    message: "Veuillez entrer une couleur valide.",
  }),
})

type UniversityFormValues = z.infer<typeof universityFormSchema>
type ContactFormValues = z.infer<typeof contactFormSchema>
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// Données fictives pour l'exemple
const defaultUniversityValues: UniversityFormValues = {
  name: "Université Test",
  shortName: "UT",
  address: "12 Rue de l'Université",
  city: "Dakar",
  postalCode: "21001",
  country: "Senegal",
  phone: "+221 77 337 3841",
  email: "contact@univ-test.sn",
  website: "https://www.univ-test.sn",
  description: "Lorem Ipsum.",
}

const defaultContactValues: ContactFormValues = {
  contactName: "Test directeur",
  contactEmail: "test.directeur@univ-test.sn",
  contactPhone: "+221 77 337 3841",
  contactPosition: "Directeur administratif",
}

const defaultAppearanceValues: AppearanceFormValues = {
  primaryColor: "#3b82f6",
  secondaryColor: "#6366f1",
  accentColor: "#ec4899",
}

export function UniversitySettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>("/placeholder.svg?height=100&width=100")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const universityForm = useForm<UniversityFormValues>({
    resolver: zodResolver(universityFormSchema),
    defaultValues: defaultUniversityValues,
  })

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactValues,
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultAppearanceValues,
  })

  function onUniversitySubmit(data: UniversityFormValues) {
    setIsSubmitting(true)
    // Simuler un appel API
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Paramètres enregistrés",
        description: "Les informations de l'université ont été mises à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  function onContactSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    // Simuler un appel API
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Paramètres enregistrés",
        description: "Les informations de contact ont été mises à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsSubmitting(true)
    // Simuler un appel API
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres d'apparence ont été mis à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">Informations générales</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="appearance">Apparence</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'université</CardTitle>
            <CardDescription>
              Modifiez les informations générales de votre université. Ces informations seront affichées sur les
              documents officiels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium">Logo de l'université</h3>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo de l'université"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-fit" asChild>
                    <label className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Télécharger un logo
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                    </label>
                  </Button>
                  <p className="text-sm text-muted-foreground">Format recommandé: PNG ou SVG, 512x512px minimum</p>
                </div>
              </div>
            </div>

            <Separator />

            <Form {...universityForm}>
              <form onSubmit={universityForm.handleSubmit(onUniversitySubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={universityForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'université</FormLabel>
                        <FormControl>
                          <Input placeholder="Université de Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={universityForm.control}
                    name="shortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Acronyme / Nom court</FormLabel>
                        <FormControl>
                          <Input placeholder="UP" {...field} />
                        </FormControl>
                        <FormDescription>
                          Utilisé dans les en-têtes et les documents où l'espace est limité
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={universityForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="12 Rue de l'Université" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={universityForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={universityForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input placeholder="75005" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={universityForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={universityForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 1 23 45 67 89" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={universityForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@univ-paris.fr" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={universityForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site web</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.univ-paris.fr" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={universityForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description de l'université..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        Une brève description de votre université qui apparaîtra sur les documents officiels.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact">
        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
            <CardDescription>Définissez les informations de contact principales pour votre université.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...contactForm}>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={contactForm.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du contact principal</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactForm.control}
                    name="contactPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fonction / Poste</FormLabel>
                        <FormControl>
                          <Input placeholder="Directeur administratif" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={contactForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email du contact</FormLabel>
                        <FormControl>
                          <Input placeholder="jean.dupont@univ-paris.fr" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactForm.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone du contact</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 1 23 45 67 89" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>
              Personnalisez l'apparence de votre interface avec les couleurs de votre université.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...appearanceForm}>
              <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={appearanceForm.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur principale</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Utilisée pour les éléments principaux de l'interface</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="secondaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur secondaire</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Utilisée pour les éléments secondaires</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="accentColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur d'accent</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Utilisée pour mettre en évidence certains éléments</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Aperçu des couleurs</h3>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex h-20 w-32 items-center justify-center rounded-md text-white"
                      style={{ backgroundColor: appearanceForm.watch("primaryColor") }}
                    >
                      Principale
                    </div>
                    <div
                      className="flex h-20 w-32 items-center justify-center rounded-md text-white"
                      style={{ backgroundColor: appearanceForm.watch("secondaryColor") }}
                    >
                      Secondaire
                    </div>
                    <div
                      className="flex h-20 w-32 items-center justify-center rounded-md text-white"
                      style={{ backgroundColor: appearanceForm.watch("accentColor") }}
                    >
                      Accent
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
