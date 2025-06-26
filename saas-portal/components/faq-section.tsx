import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Combien de temps prend l'implémentation de la plateforme ?",
      answer:
        "L'implémentation complète prend généralement entre 2 et 4 semaines, selon la taille de votre établissement et la complexité de vos besoins. Notre équipe vous accompagne à chaque étape du processus.",
    },
    {
      question: "Est-il possible d'importer nos données existantes ?",
      answer:
        "Oui, nous proposons des outils d'importation pour migrer facilement vos données depuis vos systèmes actuels. Nous prenons en charge les formats Excel, CSV et pouvons nous connecter à la plupart des bases de données existantes.",
    },
    {
      question: "La plateforme est-elle conforme au RGPD ?",
      answer:
        "Absolument. UniServices est entièrement conforme au Règlement Général sur la Protection des Données (RGPD) et à d'autres réglementations internationales sur la protection des données. Nous mettons en place des mesures strictes pour garantir la sécurité et la confidentialité des informations.",
    },
    {
      question: "Proposez-vous des formations pour notre personnel ?",
      answer:
        "Oui, nous offrons des sessions de formation complètes pour tous les utilisateurs de la plateforme. Ces formations peuvent être dispensées en ligne ou sur site, selon vos préférences. Nous fournissons également une documentation détaillée et des tutoriels vidéo.",
    },
    {
      question: "Peut-on personnaliser l'interface selon notre charte graphique ?",
      answer:
        "Oui, UniServices est entièrement personnalisable. Vous pouvez adapter l'interface à votre charte graphique, ajouter votre logo et personnaliser les couleurs pour refléter l'identité visuelle de votre établissement.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="faq">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Questions fréquentes</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tout ce que vous devez savoir sur notre plateforme de gestion universitaire.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
