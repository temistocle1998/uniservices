"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  enablePublicApi: z.boolean(),
  apiRateLimit: z.coerce.number().min(10).max(1000),
  apiKey: z.string(),
  apiSecret: z.string(),
  webhookUrl: z.string().url().optional().or(z.literal("")),
  enableWebhooks: z.boolean(),
})

export function SaasApiSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enablePublicApi: true,
      apiRateLimit: 100,
      apiKey: "pk_live_51HG8h7JMNRAgL0RQVZqeKWEn",
      apiSecret: "sk_live_51HG8h7JMNRAgL0RQVZqeKWEn",
      webhookUrl: "",
      enableWebhooks: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simuler un appel API
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres API ont été mis à jour avec succès.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  function regenerateApiKeys() {
    setIsRegenerating(true)

    // Simuler la régénération des clés API
    setTimeout(() => {
      const newApiKey = "pk_live_" + Math.random().toString(36).substring(2, 15)
      const newApiSecret = "sk_live_" + Math.random().toString(36).substring(2, 15)

      form.setValue("apiKey", newApiKey)
      form.setValue("apiSecret", newApiSecret)

      toast({
        title: "Clés API régénérées",
        description: "Vos clés API ont été régénérées avec succès.",
      })
      setIsRegenerating(false)
    }, 1500)
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text)
    toast({
      title: `${label} copié`,
      description: `Le ${label.toLowerCase()} a été copié dans le presse-papiers.`,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="enablePublicApi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Activer l'API publique</FormLabel>
                <FormDescription>
                  Permettre aux universités d'accéder à l'API pour intégrer leurs systèmes.
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
          name="apiRateLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limite de requêtes API (par minute)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Nombre maximum de requêtes API autorisées par minute et par université.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Clés API</h3>

          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clé API publique</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(field.value, "Clé API")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription>Cette clé peut être partagée publiquement.</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clé API secrète</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input {...field} type="password" readOnly />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(field.value, "Secret API")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription>Ne partagez jamais cette clé. Elle doit rester confidentielle.</FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            onClick={regenerateApiKeys}
            disabled={isRegenerating}
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isRegenerating ? "Régénération..." : "Régénérer les clés API"}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Webhooks</h3>

          <FormField
            control={form.control}
            name="enableWebhooks"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activer les webhooks</FormLabel>
                  <FormDescription>
                    Envoyer des notifications en temps réel à une URL externe lors d'événements.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("enableWebhooks") && (
            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du webhook</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com/webhook" />
                  </FormControl>
                  <FormDescription>URL à laquelle les événements seront envoyés.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer les paramètres"}
        </Button>
      </form>
    </Form>
  )
}
