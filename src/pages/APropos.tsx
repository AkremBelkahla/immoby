import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users, Award } from "lucide-react";

export default function APropos() {
  const values = [
    {
      icon: Building2,
      title: "Innovation",
      description: "Nous utilisons les dernières technologies pour simplifier la gestion immobilière.",
    },
    {
      icon: Target,
      title: "Efficacité",
      description: "Notre solution optimise votre temps et vos processus de gestion au quotidien.",
    },
    {
      icon: Users,
      title: "Accompagnement",
      description: "Une équipe dédiée pour vous accompagner dans l'utilisation de notre plateforme.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque fonctionnalité que nous développons.",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeaderBg 
        title="À propos d'Immoby" 
        subtitle="Découvrez notre mission et nos valeurs"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Immoby a été créé avec une vision claire : simplifier la gestion immobilière 
                pour les professionnels et les particuliers.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Nous comprenons les défis quotidiens auxquels vous faites face : la gestion 
                des biens, le suivi des baux, la comptabilité, et le service après-vente. 
                C'est pourquoi nous avons développé une solution tout-en-un, intuitive et puissante.
              </p>
              <p className="text-lg text-muted-foreground">
                Notre objectif est de vous faire gagner du temps et de l'efficacité, tout en 
                vous offrant une vision claire et complète de votre patrimoine immobilier.
              </p>
            </div>
            <div className="relative">
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">500+</p>
                        <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">10K+</p>
                        <p className="text-sm text-muted-foreground">Biens gérés</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction client</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ParallaxCTA />
    </div>
  );
}
