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
    role: "Property manager",
    avatar: "SM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Immoby has transformed the way I manage my properties. The interface is intuitive and the features are exactly what I needed.",
  },
  {
    name: "Pierre Dubois",
    role: "Property owner",
    avatar: "PD",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5,
    comment: "An essential tool for tracking my rentals. The accounting module is particularly well designed.",
  },
  {
    name: "Marie Laurent",
    role: "Real estate agent",
    avatar: "ML",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Managing support tickets and interventions is a real plus. My clients have been more satisfied since I started using Immoby.",
  },
  {
    name: "Thomas Rousseau",
    role: "Investor",
    avatar: "TR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    comment: "The detailed reports help me make better investment decisions. A modern and efficient interface.",
  },
  {
    name: "Claire Moreau",
    role: "Wealth manager",
    avatar: "CM",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Excellent management tool! Automatic sync and offline mode are features I really appreciate.",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-black lg:text-4xl/snug">What Our Clients Say</h2>
          <span className="mt-2.5 block h-0.5 w-36 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
          <p className="mt-4 text-gray">
            Discover testimonials from professionals who use Immoby every day
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
                  <Card className="h-full rounded-2xl border-gray/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.image} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-black">{testimonial.name}</p>
                          <p className="text-sm text-gray">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray leading-relaxed">
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
