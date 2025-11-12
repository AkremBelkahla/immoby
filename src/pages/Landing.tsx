import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Users, Shield, Check, TrendingUp, Clock, Award } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { BackToTop } from "@/components/BackToTop";
import { Chatbot } from "@/components/Chatbot";

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Benefits Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Immoby ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
              <CardHeader>
                <Wifi className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle>Offline-ready</CardTitle>
                <CardDescription>
                  Travaillez sans connexion, vos données se synchronisent automatiquement
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle>Sécurisé</CardTitle>
                <CardDescription>
                  Vos données sont protégées et sauvegardées automatiquement
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle>Multi-utilisateurs</CardTitle>
                <CardDescription>
                  Collaborez avec votre équipe en temps réel
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Modules clés</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Gestion locative",
              description: "Gérez vos biens et baux en toute simplicité",
              features: ["Biens immobiliers", "Contrats de bail", "Suivi des paiements"],
            },
            {
              title: "Maintenance",
              description: "Suivez les demandes d'intervention",
              features: ["Tickets SAV", "Priorisation", "Historique complet"],
            },
            {
              title: "Comptabilité",
              description: "Pilotez vos finances efficacement",
              features: ["Écritures comptables", "Rapports financiers", "Analytique"],
            },
            {
              title: "Reporting",
              description: "Analysez vos performances",
              features: ["Tableaux de bord", "Indicateurs clés", "Export de données"],
            },
          ].map((module, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <TrendingUp className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-muted-foreground">Gestionnaires actifs</p>
          </div>
          <div className="space-y-2">
            <Clock className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-4xl font-bold">10 000+</h3>
            <p className="text-muted-foreground">Biens gérés</p>
          </div>
          <div className="space-y-2">
            <Award className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-4xl font-bold">98%</h3>
            <p className="text-muted-foreground">Satisfaction client</p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* CTA Section with Parallax */}
      <ParallaxCTA />

      {/* Back to Top & Chatbot */}
      <BackToTop />
      <Chatbot />
    </div>
  );
}
