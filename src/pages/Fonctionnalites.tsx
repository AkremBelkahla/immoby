import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, Wrench, Calculator, Users, BarChart3, Bell, Cloud } from "lucide-react";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";

const features = [
  {
    icon: Building2,
    title: "Gestion des biens",
    description: "Centralisez toutes les informations de vos biens immobiliers : appartements, maisons, locaux commerciaux.",
    benefits: [
      "Fiches détaillées par bien",
      "Photos et documents associés",
      "Historique des modifications",
      "Statut en temps réel",
    ],
  },
  {
    icon: FileText,
    title: "Gestion des baux",
    description: "Suivez vos contrats de location, échéances et renouvellements.",
    benefits: [
      "Création de baux en quelques clics",
      "Alertes d'échéances",
      "Gestion des dépôts de garantie",
      "Quittances automatiques",
    ],
  },
  {
    icon: Wrench,
    title: "Service après-vente",
    description: "Gérez les demandes d'intervention et la maintenance de vos biens.",
    benefits: [
      "Système de tickets",
      "Priorisation des urgences",
      "Suivi des interventions",
      "Communication avec les locataires",
    ],
  },
  {
    icon: Calculator,
    title: "Comptabilité intégrée",
    description: "Pilotez vos finances avec des outils comptables complets.",
    benefits: [
      "Écritures comptables",
      "Rapprochement bancaire",
      "Exports comptables",
      "Tableaux de bord financiers",
    ],
  },
  {
    icon: Users,
    title: "Multi-utilisateurs",
    description: "Collaborez efficacement avec votre équipe.",
    benefits: [
      "Gestion des rôles et permissions",
      "Historique des actions",
      "Notifications en temps réel",
      "Assignation de tâches",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting avancé",
    description: "Analysez vos performances avec des rapports détaillés.",
    benefits: [
      "KPIs en temps réel",
      "Graphiques personnalisables",
      "Export de données",
      "Prévisions financières",
    ],
  },
  {
    icon: Bell,
    title: "Notifications intelligentes",
    description: "Restez informé des événements importants.",
    benefits: [
      "Alertes personnalisables",
      "Rappels automatiques",
      "Notifications par email",
      "Résumés quotidiens",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Offline",
    description: "Accédez à vos données partout, même hors ligne.",
    benefits: [
      "Synchronisation automatique",
      "Mode hors ligne",
      "Sauvegarde automatique",
      "Sécurité renforcée",
    ],
  },
];

export default function Fonctionnalites() {
  return (
    <div>
      <PageHeaderBg 
        title="Fonctionnalités" 
        subtitle="Une plateforme complète pour votre gestion immobilière"
      />
      
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="mt-1">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="mr-2 text-primary">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <ParallaxCTA />
    </div>
  );
}
