import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Twitter, Globe, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Rentals", to: "/location" },
  { label: "Features", to: "/fonctionnalites" },
  { label: "Pricing", to: "/tarifs" },
  { label: "About", to: "/a-propos" },
];

export function MarketingLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-card py-2.5 duration-300 xl:py-4",
          scrolled && "py-2.5 shadow-sm"
        )}
      >
        <div className="container flex items-center justify-between gap-5">
          {/* Nav + mobile drawer */}
          <div
            className={cn(
              "fixed top-0 -right-full z-50 flex h-screen w-80 flex-col overflow-x-hidden overflow-y-auto bg-gray-light shadow-md transition-all duration-500",
              "xl:static xl:h-auto xl:w-[45%] xl:max-w-none xl:flex-row xl:items-center xl:overflow-y-visible xl:bg-transparent xl:p-0 xl:shadow-none",
              menuOpen && "right-0"
            )}
          >
            <div className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-gray/15 bg-gray-light px-8 xl:hidden">
              <Link to="/" className="my-2.5 inline-block shrink-0">
                <img src={logo} alt="Immoby" className="h-8 w-auto shrink-0" />
              </Link>
              <button
                type="button"
                className="absolute -top-0.5 right-3.5 cursor-pointer border border-gray/10 hover:text-ink"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-6 shrink-0" />
              </button>
            </div>

            <ul className="inline-flex flex-col gap-1 rounded-xl bg-gray-light py-5 xl:flex-row xl:gap-4 xl:px-4 xl:py-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) => cn("nav-links", isActive && "active")}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="nav-links xl:hidden">
                <Link to="/contact" className="w-full">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Overlay */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Centered logo */}
          <div className="relative flex justify-center xl:mx-auto xl:w-[10%]">
            <Link to="/" className="shrink-0 transition">
              <img src={logo} alt="Immoby" className="h-9 w-auto shrink-0" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 lg:gap-3 xl:w-[45%] xl:gap-5">
            <ThemeToggle />
            <Link to="/dashboard" className="btn btn-outline hidden sm:inline-flex">
              Dashboard
            </Link>
            <Link to="/contact" className="btn">
              Contact us
            </Link>
            <button
              type="button"
              className="cursor-pointer text-ink hover:opacity-80 xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-6 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-b from-card to-transparent pt-16 pb-5 font-medium">
        <div className="container">
          <div className="grid gap-7 pb-10 sm:grid-cols-2 sm:gap-10 xl:grid-cols-4 xl:gap-20">
            <div className="flex w-full max-w-96 flex-col divide-y divide-gray/20">
              <div className="space-y-3.5 pb-5">
                <img src={logo} alt="Immoby" className="h-10 w-auto shrink-0" />
                <p>
                  Simplify the management of your properties, leases, and
                  tenants with a single user-friendly platform.
                </p>
              </div>
              <div className="space-y-2.5 pt-5 xl:pt-8">
                <label className="inline-block text-lg font-semibold uppercase text-ink">
                  Newsletter
                </label>
                <form
                  className="flex"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input w-full !rounded-r-none border border-gray/40 bg-card !py-2.5 text-sm"
                  />
                  <button className="btn rounded-l-none px-2 text-sm" type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-3 xl:space-y-4">
              <h3 className="text-lg font-semibold uppercase text-ink">
                Contact us
              </h3>
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <h4 className="inline-block text-sm font-medium text-primary underline underline-offset-4">
                    Address :
                  </h4>
                  <p>12 Rue de la Gare, 75010 Paris, France</p>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <h4 className="inline-block text-sm font-medium text-primary underline underline-offset-4">
                    Phone number :
                  </h4>
                  <a href="tel:+33123456789" className="transition hover:text-ink">
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <h4 className="inline-block text-sm font-medium text-primary underline underline-offset-4">
                    Email :
                  </h4>
                  <a href="mailto:contact@immoby.app" className="transition hover:text-ink">
                    contact@immoby.app
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 xl:space-y-4">
              <h3 className="text-lg font-semibold uppercase text-ink">
                Categories
              </h3>
              <ul className="grid grid-cols-2 flex-col gap-x-10 gap-y-4 sm:flex">
                <li>
                  <Link to="/dashboard" className="inline-block hover:text-primary">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/location" className="inline-block hover:text-primary">
                    Rentals
                  </Link>
                </li>
                <li>
                  <Link to="/fonctionnalites" className="inline-block hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/tarifs" className="inline-block hover:text-primary">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="divide-y divide-gray/20">
              <div className="space-y-4 pb-5">
                <h3 className="text-lg font-semibold uppercase text-ink">
                  Links
                </h3>
                <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:gap-x-20">
                  <Link to="/a-propos" className="inline-block hover:text-primary">
                    About us
                  </Link>
                  <Link to="/contact" className="inline-block hover:text-primary">
                    Contact us
                  </Link>
                  <Link to="/mentions-legales" className="inline-block hover:text-primary">
                    Terms & Conditions
                  </Link>
                  <Link to="/politique-de-confidentialite" className="inline-block hover:text-primary">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="space-y-4 pt-5">
                <h3 className="text-lg font-semibold uppercase text-ink">
                  Follow us
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-5 text-gray">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-content-center rounded-md border border-gray/20 transition hover:text-primary"
                  >
                    <span className="sr-only">Facebook</span>
                    <Facebook className="size-5 shrink-0" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-content-center rounded-md border border-gray/20 transition hover:text-primary"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="size-5 shrink-0" />
                  </a>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-content-center rounded-md border border-gray/20 transition hover:text-primary"
                  >
                    <span className="sr-only">Google</span>
                    <Globe className="size-5 shrink-0" />
                  </a>
                  <a
                    href="https://www.pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-content-center rounded-md border border-gray/20 transition hover:text-primary"
                  >
                    <span className="sr-only">Pinterest</span>
                    <Pin className="size-5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray/15 pt-5 text-center">
            <p className="text-ink">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" className="text-primary transition hover:text-gray">
                Immoby
              </Link>
              . All rights reserved. Developed by{" "}
              <a
                href="https://infinityweb.tn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition hover:text-gray"
              >
                InfinityWeb.tn
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
