import Link from "next/link"
import { Button } from "@/components/ui/button"
import MarketingNavbar from "@/components/marketing-navbar"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import FaqSection from "@/components/faq-section"
import { ArrowRight, CheckCircle, Play } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted">
                  🎓 Nouvelle version disponible
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Simplifiez la gestion de votre{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    université
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl mx-auto lg:mx-0">
                  UniServices est une plateforme complète qui centralise et optimise tous vos services universitaires en
                  un seul endroit. Gagnez du temps et améliorez l'expérience de vos étudiants.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Commencer maintenant <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base">
                    <Play className="h-4 w-4" />
                    Voir la démo
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Installation facile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Support 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Mises à jour régulières</span>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative rounded-xl border bg-background p-2 shadow-2xl">
                <div className="rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Dashboard preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 h-16 w-16 sm:h-24 sm:w-24 rounded-full border bg-background p-2 shadow-lg hidden sm:block">
                <div className="h-full w-full rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary text-sm sm:text-base">+200%</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 h-12 w-12 sm:h-16 sm:w-16 rounded-lg border bg-background p-2 shadow-lg hidden md:block">
                <div className="h-full w-full rounded-md bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Chiffres clés</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Adopté par les meilleures universités
              </h2>
              <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
                Notre plateforme est utilisée par des universités du monde entier pour améliorer leur efficacité
                administrative.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-8 sm:py-12">
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">150+</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Universités</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">2.5M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Étudiants</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Satisfaction</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">35%</div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Gain de temps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 lg:py-24 bg-muted" id="demo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Prêt à transformer votre gestion universitaire ?
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl">
                Rejoignez les centaines d'universités qui ont déjà adopté UniServices.
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  className="flex h-11 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="nom@universite.fr"
                  type="email"
                />
                <Button type="submit" size="lg" className="sm:w-auto">
                  Demander une démo
                </Button>
              </form>
              <p className="text-xs text-muted-foreground px-4">
                En soumettant ce formulaire, vous acceptez nos{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-foreground">
                  Conditions d'utilisation
                </Link>{" "}
                et notre{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-foreground">
                  Politique de confidentialité
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 sm:py-12 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">U</span>
                </div>
                <div className="font-bold text-xl">UniServices</div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Une solution complète pour la gestion des services universitaires.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 md:col-span-2 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-3">
                  <div className="font-medium">Produit</div>
                  <nav className="grid gap-2">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Fonctionnalités
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Tarifs
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      FAQ
                    </Link>
                  </nav>
                </div>
                <div className="grid gap-3">
                  <div className="font-medium">Entreprise</div>
                  <nav className="grid gap-2">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      À propos
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Carrières
                    </Link>
                  </nav>
                </div>
                <div className="grid gap-3">
                  <div className="font-medium">Légal</div>
                  <nav className="grid gap-2">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Conditions d'utilisation
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Politique de confidentialité
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Cookies
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} UniServices. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
