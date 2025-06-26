"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { Role, Permission } from "@/lib/admin-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { permissions } from "@/lib/admin-data"

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
  permissionIds: z.array(z.string()).min(1, "Sélectionnez au moins une permission"),
})

interface AddRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRoleAdded: (role: Role) => void
}

export function AddRoleDialog({ open, onOpenChange, onRoleAdded }: AddRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const selectedPermissions = permissions.filter((permission) => values.permissionIds.includes(permission.id))

      const newRole: Role = {
        id: `new-${Date.now()}`,
        name: values.name,
        description: values.description,
        permissions: selectedPermissions,
      }

      onRoleAdded(newRole)
      toast({
        title: "Rôle ajouté",
        description: `Le rôle ${values.name} a été ajouté avec succès.`,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du rôle.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Grouper les permissions par ressource
  const groupedPermissions: Record<string, Permission[]> = {}
  permissions.forEach((permission) => {
    if (!groupedPermissions[permission.resource]) {
      groupedPermissions[permission.resource] = []
    }
    groupedPermissions[permission.resource].push(permission)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un rôle</DialogTitle>
          <DialogDescription>Créez un nouveau rôle avec des permissions spécifiques.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du rôle</FormLabel>
                  <FormControl>
                    <Input placeholder="Gestionnaire des étudiants" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Ce rôle permet de gérer les étudiants et leurs inscriptions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissionIds"
              render={() => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => (
                      <div key={resource} className="space-y-2">
                        <h4 className="font-medium capitalize text-sm">{resource}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {resourcePermissions.map((permission) => (
                            <FormField
                              key={permission.id}
                              control={form.control}
                              name="permissionIds"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={permission.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, permission.id])
                                            : field.onChange(field.value?.filter((value) => value !== permission.id))
                                        }}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <label className="text-sm font-normal">{permission.name}</label>
                                    </div>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Ajout en cours..." : "Ajouter le rôle"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
