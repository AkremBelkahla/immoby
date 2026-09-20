import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users, Award } from "lucide-react";

export default function APropos() {
  const values = [
    {
      icon: Building2,
      title: "Innovation",
      description: "We use the latest technologies to simplify property management.",
    },
    {
      icon: Target,
      title: "Efficiency",
      description: "Our solution optimizes your time and day-to-day management processes.",
    },
    {
      icon: Users,
      title: "Support",
      description: "A dedicated team to help you get the most out of our platform.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every feature we build.",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeaderBg 
        title="About Immoby" 
        subtitle="Discover our mission and values"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Immoby was created with a clear vision: to simplify property management 
                for professionals and individuals.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We understand the daily challenges you face: managing properties, 
                tracking leases, accounting, and after-sales service. That's why we 
                built an all-in-one, intuitive and powerful solution.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to save you time and increase your efficiency, while giving 
                you a clear and complete view of your real estate portfolio.
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
                        <p className="text-sm text-muted-foreground">Active users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">10K+</p>
                        <p className="text-sm text-muted-foreground">Managed properties</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-sm text-muted-foreground">Customer satisfaction</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Our values</h2>
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
