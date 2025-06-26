import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "UniServices a transformé notre façon de gérer l'université. Nous avons gagné un temps précieux et amélioré la satisfaction de nos étudiants et professeurs.",
      author: "Marie Dubois",
      role: "Directrice administrative",
      company: "Université de Lyon",
      avatar: "MD",
    },
    {
      quote:
        "L'interface intuitive et les fonctionnalités complètes nous ont permis de centraliser toutes nos opérations. Un outil indispensable pour toute université moderne.",
      author: "Thomas Bernard",
      role: "Doyen",
      company: "Université de Bordeaux",
      avatar: "TB",
    },
    {
      quote:
        "Le support client est exceptionnel et l'équipe est toujours à l'écoute de nos besoins. Nous avons pu personnaliser la plateforme selon nos exigences spécifiques.",
      author: "Sophie Martin",
      role: "DSI",
      company: "École Polytechnique",
      avatar: "SM",
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 lg:py-24 bg-muted" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Témoignages</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Ce que disent nos clients</h2>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
              Découvrez comment UniServices a transformé la gestion administrative de nombreuses universités.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 sm:py-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 pt-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
