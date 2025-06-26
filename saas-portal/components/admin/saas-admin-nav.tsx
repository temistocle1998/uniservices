"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Home, LayoutDashboard, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SaasAdminNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function SaasAdminNav({ className, items, ...props }: SaasAdminNavProps) {
  const pathname = usePathname()

  const defaultItems = [
    {
      href: "/saas-admin",
      title: "Tableau de bord",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/saas-admin/universities",
      title: "Universités",
      icon: <Building2 className="mr-2 h-4 w-4" />,
    },
    {
      href: "/saas-admin/users",
      title: "Utilisateurs",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/saas-admin/settings",
      title: "Paramètres",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  const navItems = items || defaultItems

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      <Button asChild variant="ghost" className="justify-start mb-6 hover:bg-transparent">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Retour au site
        </Link>
      </Button>

      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="justify-start"
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
