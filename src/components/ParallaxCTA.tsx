import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

export function ParallaxCTA() {
  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${ctaBg})` }}
      >
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Content */}
      <div className="relative h-full container flex items-center justify-center text-center">
        <div className="space-y-6 text-white animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à simplifier votre gestion immobilière ?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez les centaines de gestionnaires qui utilisent déjà Immoby
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg h-12">
                Essayer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg h-12 bg-white/10 text-white border-white hover:bg-white hover:text-primary backdrop-blur-sm">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
