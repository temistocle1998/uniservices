"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { excuseReasons } from "@/lib/excuse-data"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  startDate: z.date({
    required_error: "Veuillez sélectionner une date de début.",
  }),
  endDate: z.date({
    required_error: "Veuillez sélectionner une date de fin.",
  }),
  reason: z.string({
    required_error: "Veuillez sélectionner une raison.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  document: z.instanceof(File, {
    message: "Veuillez télécharger un document justificatif.",
  }),
})

interface SubmitExcuseFormProps {
  studentId: string
}

export default function SubmitExcuseForm({ studentId }: SubmitExcuseFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Dans une application réelle, ceci serait un appel API pour télécharger le fichier
      // et enregistrer le justificatif
      console.log("Submitting excuse document:", {
        studentId,
        ...values,
        documentName: values.document.name,
      })

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Justificatif soumis avec succès",
        description: "Votre justificatif a été soumis et est en attente d'approbation.",
      })

      // Réinitialiser le formulaire
      form.reset()
      setSelectedFile(null)

      // Rafraîchir la page pour afficher le nouveau justificatif
      router.refresh()
    } catch (error) {
      console.error("Error submitting excuse document:", error)
      toast({
        title: "Erreur lors de la soumission",
        description: "Une erreur est survenue lors de la soumission du justificatif.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    if (file) {
      form.setValue("document", file)
    } else {
      form.setError("document", {
        type: "manual",
        message: "Veuillez télécharger un document justificatif.",
      })
    }
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case "medical":
        return "Raison médicale"
      case "family":
        return "Raison familiale"
      case "administrative":
        return "Démarches administratives"
      case "professional":
        return "Raison professionnelle"
      case "transportation":
        return "Problème de transport"
      case "other":
        return "Autre raison"
      default:
        return reason
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soumettre un justificatif</CardTitle>
        <CardDescription>Téléchargez un document pour justifier votre absence</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de début</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || (form.getValues("startDate") && date < form.getValues("startDate"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raison de l'absence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une raison" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {excuseReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {getReasonLabel(reason)}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez brièvement la raison de votre absence..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Fournissez des détails supplémentaires sur votre absence.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Document justificatif</FormLabel>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        htmlFor="document-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-6 text-center"
                      >
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <div className="text-sm font-medium">
                          {selectedFile ? selectedFile.name : "Cliquez pour télécharger"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max. 5MB)</div>
                        <Input
                          id="document-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          {...field}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Téléchargez un document justificatif (certificat médical, attestation, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Soumission en cours..." : "Soumettre le justificatif"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
