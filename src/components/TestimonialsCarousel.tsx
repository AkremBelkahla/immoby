import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Gestionnaire immobilier",
    avatar: "SM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Immoby a transformé ma façon de gérer mes biens. L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin.",
  },
  {
    name: "Pierre Dubois",
    role: "Propriétaire",
    avatar: "PD",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Un outil indispensable pour suivre mes locations. Le module de comptabilité est particulièrement bien pensé.",
  },
  {
    name: "Marie Laurent",
    role: "Agent immobilier",
    avatar: "ML",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    comment: "La gestion des tickets SAV et des interventions est un vrai plus. Mes clients sont plus satisfaits depuis que j'utilise Immoby.",
  },
  {
    name: "Thomas Rousseau",
    role: "Investisseur",
    avatar: "TR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Les rapports détaillés me permettent de prendre de meilleures décisions d'investissement. Interface moderne et performante.",
  },
  {
    name: "Claire Moreau",
    role: "Gestionnaire de patrimoine",
    avatar: "CM",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Excellent outil de gestion ! La synchronisation automatique et le mode hors ligne sont des fonctionnalités que j'apprécie énormément.",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-muted-foreground">
            Découvrez les témoignages de professionnels qui utilisent Immoby au quotidien
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.image} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "{testimonial.comment}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
