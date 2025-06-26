import { BookOpen, Calendar, Users, GraduationCap, Building2, BarChart4, MessageSquare, Shield } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Gestion des cours",
      description: "Créez, modifiez et organisez facilement tous vos cours et programmes académiques.",
    },
    {
      icon: Calendar,
      title: "Planification avancée",
      description: "Planifiez les emplois du temps, évitez les conflits et optimisez l'utilisation des ressources.",
    },
    {
      icon: Users,
      title: "Gestion des étudiants",
      description: "Suivez les inscriptions, les présences et les performances des étudiants en temps réel.",
    },
    {
      icon: GraduationCap,
      title: "Gestion des professeurs",
      description: "Gérez les disponibilités, les charges de cours et les évaluations des enseignants.",
    },
    {
      icon: Building2,
      title: "Gestion des salles",
      description: "Optimisez l'utilisation des espaces et réservez facilement les salles pour vos événements.",
    },
    {
      icon: BarChart4,
      title: "Analyses et rapports",
      description: "Accédez à des statistiques détaillées et générez des rapports personnalisés.",
    },
    {
      icon: MessageSquare,
      title: "Communication intégrée",
      description: "Facilitez les échanges entre étudiants, professeurs et administration.",
    },
    {
      icon: Shield,
      title: "Sécurité des données",
      description: "Protégez les informations sensibles avec nos systèmes de sécurité avancés.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 lg:py-24" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Fonctionnalités</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Tout ce dont votre université a besoin
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
              Notre plateforme offre une suite complète d'outils pour simplifier la gestion de votre établissement.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 sm:py-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center space-y-4 rounded-xl border p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:bg-muted/50"
            >
              <div className="rounded-full border p-4 bg-background group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                <feature.icon className="h-6 w-6 group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
