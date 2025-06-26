"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  platformName: z.string().min(2, {
    message: "Le nom de la plateforme doit contenir au moins 2 caractères.",
  }),
  supportEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  maxUniversitiesPerPlan: z.object({
    basic: z.coerce.number().min(1),
    premium: z.coerce.number().min(1),
    enterprise: z.coerce.number().min(1),
  }),
  maintenanceMode: z.boolean(),
  allowNewRegistrations: z.boolean(),
})

export function SaasGeneralSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platformName: "UniServices",
      supportEmail: "support@uniservices.com",
      maxUniversitiesPerPlan: {
        basic: 1,
        premium: 5,
        enterprise: 20,
      },
      maintenanceMode: false,
      allowNewRegistrations: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler un appel API
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres généraux ont été mis à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platformName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la plateforme</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Ce nom sera affiché dans les emails et sur les pages publiques.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de support</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Les demandes de support seront envoyées à cette adresse.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Limites par forfait</h3>

          <FormField
            control={form.control}
            name="maxUniversitiesPerPlan.basic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre maximum d'universités (Forfait Basic)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxUniversitiesPerPlan.premium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre maximum d'universités (Forfait Premium)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxUniversitiesPerPlan.enterprise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre maximum d'universités (Forfait Enterprise)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="maintenanceMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Mode maintenance</FormLabel>
                <FormDescription>
                  Activer le mode maintenance rendra la plateforme inaccessible aux utilisateurs.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowNewRegistrations"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Autoriser les nouvelles inscriptions</FormLabel>
                <FormDescription>
                  Désactiver cette option empêchera l'inscription de nouvelles universités.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer les paramètres"}
        </Button>
      </form>
    </Form>
  )
}
