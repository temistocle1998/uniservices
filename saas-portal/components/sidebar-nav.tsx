"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Home,
  Settings,
  Users,
  UserCheck,
  Building2,
  FileText,
  TrendingUp,
  UserPlus,
  User,
} from "lucide-react"

interface SidebarNavProps {
  collapsed?: boolean
}

const navigation = [
  {
    name: "Tableau de bord",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Étudiants",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "Départements",
    href: "/departments",
    icon: Building2,
  },
  {
    name: "Cours",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Inscriptions",
    href: "/enrollments",
    icon: UserPlus,
  },
  {
    name: "Registrations",
    href: "/registrations",
    icon: UserCheck,
  },
  {
    name: "Années académiques",
    href: "/academic-years",
    icon: Calendar,
  },
  {
    name: "Présences",
    href: "/attendance",
    icon: ClipboardCheck,
  },
  {
    name: "Statistiques",
    href: "/statistics",
    icon: BarChart3,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
  },
]

const adminNavigation = [
  {
    name: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Rôles",
    href: "/admin/roles",
    icon: UserCheck,
  },
  {
    name: "Justificatifs",
    href: "/admin/excuses",
    icon: FileText,
  },
  {
    name: "Mon Profil",
    href: "/profile",
    icon: User,
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
]

function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const pathname = usePathname()

  const NavItem = ({ item, collapsed }: { item: (typeof navigation)[0]; collapsed: boolean }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    const Icon = item.icon

    const content = (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "transition-all duration-200",
          collapsed ? "h-10 w-10 p-0 flex items-center justify-center" : "w-full h-10 justify-start px-3",
          isActive && "bg-secondary text-secondary-foreground",
          !isActive && "hover:bg-accent hover:text-accent-foreground",
        )}
        asChild
      >
        <Link href={item.href}>
          <Icon className={cn("h-4 w-4 flex-shrink-0", !collapsed && "mr-2")} />
          {!collapsed && <span className="truncate">{item.name}</span>}
        </Link>
      </Button>
    )

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }

  return (
    <ScrollArea className="flex-1">
      <nav className={cn("space-y-1 py-2", collapsed ? "px-2" : "px-3")}>
        {/* Navigation principale */}
        <div className="space-y-1">
          <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className={cn("my-4", collapsed ? "mx-2" : "mx-3")}>
          <div className="h-px bg-border" />
        </div>

        {/* Administration */}
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 py-2">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">Administration</h2>
            </div>
          )}
          <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
            {adminNavigation.map((item) => (
              <NavItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </nav>
    </ScrollArea>
  )
}

export default SidebarNav
