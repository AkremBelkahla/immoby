import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

export function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src={logo} alt="Immoby" className="h-8 w-auto" />
            <span>Immoby</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/location" className="text-sm font-medium hover:text-primary transition-colors">
              Location
            </Link>
            <Link to="/fonctionnalites" className="text-sm font-medium hover:text-primary transition-colors">
              Fonctionnalités
            </Link>
            <Link to="/tarifs" className="text-sm font-medium hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Immoby" className="h-6 w-auto" />
              <span className="font-semibold">Immoby</span>
            </div>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/a-propos" className="hover:text-primary transition-colors">
                À propos
              </Link>
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-de-confidentialite" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2024 Immoby. Tous droits réservés.</p>
              <p>Développé avec ❤️ par <a href="https://infinityweb.tn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">InfinityWeb.tn</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
