import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";

const plans = [
  {
    name: "Starter",
    price: "29€",
    description: "Parfait pour débuter",
    features: [
      "Jusqu'à 10 biens",
      "Gestion locative complète",
      "SAV basique",
      "Support par email",
      "1 utilisateur",
    ],
  },
  {
    name: "Pro",
    price: "79€",
    description: "Pour les professionnels",
    popular: true,
    features: [
      "Jusqu'à 50 biens",
      "Toutes les fonctionnalités",
      "SAV avancé",
      "Support prioritaire",
      "5 utilisateurs",
      "Rapports personnalisés",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    description: "Pour les grandes structures",
    features: [
      "Biens illimités",
      "Toutes les fonctionnalités",
      "Support dédié 24/7",
      "Utilisateurs illimités",
      "Formation personnalisée",
      "Intégrations sur mesure",
      "SLA garanti",
    ],
  },
];

export default function Tarifs() {
  return (
    <div>
      <PageHeaderBg 
        title="Tarifs transparents" 
        subtitle="Choisissez le plan qui correspond à vos besoins"
      />
      
      <div className="container py-12">

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${
              plan.popular ? "border-primary shadow-lg scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                  Populaire
                </span>
              </div>
            )}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Sur mesure" && (
                  <span className="text-muted-foreground">/mois</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.price === "Sur mesure" ? "Nous contacter" : "Commencer l'essai"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 mb-16 text-center">
        <p className="text-muted-foreground">
          Besoin d'aide pour choisir ?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contactez notre équipe
          </Link>
        </p>
      </div>
      </div>
      
      <ParallaxCTA />
    </div>
  );
}
