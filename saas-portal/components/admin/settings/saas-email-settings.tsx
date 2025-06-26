"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  smtpHost: z.string().min(1, {
    message: "L'hôte SMTP est requis.",
  }),
  smtpPort: z.coerce.number().min(1).max(65535),
  smtpUsername: z.string().min(1, {
    message: "Le nom d'utilisateur SMTP est requis.",
  }),
  smtpPassword: z.string().min(1, {
    message: "Le mot de passe SMTP est requis.",
  }),
  emailFrom: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  emailReplyTo: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  emailEncryption: z.enum(["none", "ssl", "tls"]),
  emailFooter: z.string(),
  sendWelcomeEmail: z.boolean(),
})

export function SaasEmailSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "noreply@uniservices.com",
      smtpPassword: "password",
      emailFrom: "noreply@uniservices.com",
      emailReplyTo: "support@uniservices.com",
      emailEncryption: "tls",
      emailFooter: "© 2023 UniServices. Tous droits réservés.",
      sendWelcomeEmail: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler un appel API
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres d'email ont été mis à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  function testEmailSettings() {
    setIsTesting(true)

    // Simuler un test d'email
    setTimeout(() => {
      toast({
        title: "Email de test envoyé",
        description: "Un email de test a été envoyé avec succès à l'adresse configurée.",
      })
      setIsTesting(false)
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="smtpHost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hôte SMTP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smtpPort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port SMTP</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="smtpUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur SMTP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smtpPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe SMTP</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="emailFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email expéditeur</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Adresse utilisée comme expéditeur des emails.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailReplyTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email de réponse</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Adresse utilisée pour les réponses aux emails.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="emailEncryption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chiffrement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Aucun</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailFooter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pied de page des emails</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormDescription>Ce texte sera ajouté en bas de tous les emails envoyés.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sendWelcomeEmail"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Envoyer un email de bienvenue</FormLabel>
                <FormDescription>
                  Envoyer automatiquement un email de bienvenue aux nouveaux utilisateurs.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={testEmailSettings} disabled={isTesting}>
            {isTesting ? "Envoi en cours..." : "Tester les paramètres"}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer les paramètres"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
