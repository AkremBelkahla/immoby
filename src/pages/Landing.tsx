import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Ruler,
  Search,
  MapPin,
  Building,
  DollarSign,
  ChevronDown,
  Heart,
  Home,
  Wrench,
  Calculator,
  BarChart3,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ParallaxCTA } from "@/components/ParallaxCTA";
import { BackToTop } from "@/components/BackToTop";
import { Chatbot } from "@/components/Chatbot";

import city6 from "@/assets/city6.jpg";
import circleText from "@/assets/circle-text.png";
import home1 from "@/assets/home1.jpg";
import home2 from "@/assets/home2.jpg";
import home3 from "@/assets/home3.jpg";
import home4 from "@/assets/home4.jpg";
import home5 from "@/assets/home5.jpg";
import emptyRoom1 from "@/assets/empty-room1.jpg";
import emptyRoom2 from "@/assets/empty-room2.jpg";
import emptyRoom3 from "@/assets/empty-room3.jpg";
import homeDesign3 from "@/assets/home-design3.jpg";
import homeDesign4 from "@/assets/home-design4.jpg";
import buildingImg from "@/assets/building-img.jpg";
import bunglowImg from "@/assets/bunglow-img.jpg";
import officeImg from "@/assets/office-img.png";
import shopImg from "@/assets/shop-img.jpg";
import villaImg from "@/assets/villa-img.png";
import house1 from "@/assets/house1.jpg";
import searchHouse from "@/assets/search-house.png";
import consulting from "@/assets/consulting.png";
import documents from "@/assets/documents.png";
import key from "@/assets/key.png";
import city1 from "@/assets/city1.jpg";
import city2 from "@/assets/city2.jpg";
import city3 from "@/assets/city3.jpg";
import city4 from "@/assets/city4.jpg";
import city5 from "@/assets/city5.jpg";
import logo1 from "@/assets/lorem-logo1.svg";
import logo2 from "@/assets/lorem-logo2.svg";
import logo3 from "@/assets/lorem-logo3.svg";
import logo4 from "@/assets/lorem-logo4.svg";
import logo5 from "@/assets/lorem-logo5.svg";
import logo6 from "@/assets/lorem-logo6.svg";

const cities = ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nice", "Nantes", "Lille"];
const propertyTypes = ["Apartment", "House", "Commercial", "Studio", "Duplex", "Loft"];
const priceRanges = ["Any", "€0 - €800", "€800 - €1,500", "€1,500 - €2,500", "€2,500+"];

const featuredProperties = [
  { images: [home1, emptyRoom1, homeDesign3], tag: "Rent", title: "Royle House", address: "2699 Green Valley, Highland Lake", beds: 3, baths: 2, size: "5x7", price: "€1,500" },
  { images: [home2, emptyRoom2, homeDesign4], tag: "Rent", title: "Sunset Villa", address: "1420 Palm Avenue, Seaside District", beds: 4, baths: 3, size: "6x9", price: "€2,300" },
  { images: [home3, emptyRoom3, home1], tag: "Buy", title: "Maple Residence", address: "87 Old Mill Road, North Quarter", beds: 3, baths: 2, size: "5x8", price: "€310,000" },
  { images: [home4, homeDesign3, emptyRoom1], tag: "Rent", title: "Garden Loft", address: "56 Linden Street, City Center", beds: 2, baths: 1, size: "4x6", price: "€980" },
  { images: [home5, homeDesign4, emptyRoom2], tag: "Buy", title: "Cedar Manor", address: "310 River Bend, Old Town", beds: 5, baths: 4, size: "8x10", price: "€520,000" },
  { images: [emptyRoom1, home2, home3], tag: "Rent", title: "Studio Nova", address: "18 Station Square, Downtown", beds: 1, baths: 1, size: "3x5", price: "€720" },
];

const categories = [
  { image: buildingImg, name: "Building", count: "214 properties" },
  { image: bunglowImg, name: "Bungalow", count: "98 properties" },
  { image: officeImg, name: "Office", count: "76 properties" },
  { image: shopImg, name: "Shop", count: "132 properties" },
  { image: villaImg, name: "Villa", count: "57 properties" },
  { image: house1, name: "House", count: "341 properties" },
];

const steps = [
  { icon: searchHouse, title: "Add Your Properties", text: "Register your properties in a few clicks and centralize all key information: surface, rent, photos, and documents." },
  { icon: consulting, title: "Manage Leases & Tenants", text: "Create leases, track tenants, and automate reminders so you never miss a deadline or a payment." },
  { icon: documents, title: "Track Maintenance", text: "Handle tickets and interventions smoothly with full history, priorities, and contractor management." },
  { icon: key, title: "Monitor Your Finances", text: "Follow rents, expenses, and reports in real time to keep your rental business profitable." },
];

const services = [
  { icon: Home, title: "Rental Management", text: "Manage properties, leases, tenants, and inspections from a single, intuitive interface." },
  { icon: Wrench, title: "Maintenance Tracking", text: "Create tickets, schedule interventions, and coordinate contractors with full traceability." },
  { icon: Calculator, title: "Accounting", text: "Keep your books clean with entries, invoices, payments, and one-click accounting exports." },
  { icon: BarChart3, title: "Reports & Analytics", text: "Analyze occupancy, revenue per property, and performance with ready-made dashboards." },
  { icon: FolderOpen, title: "Document Management", text: "Store leases, inspections, and invoices in a secure, organized document library." },
];

const popularCities = [
  { image: city1, name: "Paris", count: "154 properties" },
  { image: city2, name: "Lyon", count: "242 properties" },
  { image: city3, name: "Marseille", count: "213 properties" },
  { image: city4, name: "Bordeaux", count: "167 properties" },
  { image: city5, name: "Nice", count: "189 properties" },
  { image: city6, name: "Nantes", count: "121 properties" },
];

const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6];

const faqLeft = [
  { q: "How can I track my rental income?", a: "The dashboard gives you a real-time overview of collected rents, pending payments, and revenue per property, so you always know where you stand." },
  { q: "Can I manage several properties at once?", a: "Yes. Immoby is built for portfolios of any size — from a single studio to hundreds of units, with filters and bulk actions to stay efficient." },
  { q: "Does Immoby handle maintenance requests?", a: "Tenants' tickets can be prioritized, assigned to contractors, and tracked until resolution, with a complete history per property." },
];
const faqRight = [
  { q: "Is my data secure?", a: "Your data is stored locally in your browser and protected. Automatic backups keep your information safe at all times." },
  { q: "Can I export my accounting data?", a: "Absolutely. Export entries, invoices, and payments to standard formats compatible with your accountant's tools." },
  { q: "Do you offer support during onboarding?", a: "Our team guides you through setup, data import, and best practices so you get value from day one." },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-black lg:text-4xl/snug">{children}</h2>
      <span className="mt-2.5 block h-0.5 w-36 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
    </div>
  );
}

function PropertyCard({ property }: { property: (typeof featuredProperties)[number] }) {
  const [slide, setSlide] = useState(0);
  const total = property.images.length;
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray/20 bg-white p-1.5">
      <div className="group relative h-[250px] overflow-hidden rounded-lg">
        <div
          className="flex h-full w-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {property.images.map((img, i) => (
            <Link key={i} to="/location" className="h-full w-full shrink-0">
              <img src={img} alt="Property image" className="h-full w-full object-cover" loading="lazy" />
            </Link>
          ))}
        </div>
        <span className="absolute top-3 left-2 rounded border border-gray/30 bg-white/50 px-2 py-1 text-sm/4 font-semibold text-black backdrop-blur-xl">
          {property.tag}
        </span>
        <button
          type="button"
          onClick={() => setSlide((s) => (s - 1 + total) % total)}
          className="absolute top-1/2 left-2 z-10 grid size-6 -translate-y-1/2 cursor-pointer place-content-center rounded-full bg-white/60 backdrop-blur-md duration-300 hover:bg-white/40"
          aria-label="Previous image"
        >
          <ChevronDown className="size-3.5 rotate-90" />
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % total)}
          className="absolute top-1/2 right-2 z-10 grid size-6 -translate-y-1/2 cursor-pointer place-content-center rounded-full bg-white/60 backdrop-blur-md duration-300 hover:bg-white/40"
          aria-label="Next image"
        >
          <ChevronDown className="size-3.5 -rotate-90" />
        </button>
        <button
          type="button"
          className="group/favorite absolute top-1.5 right-1.5 z-20 ml-auto grid size-8 cursor-pointer place-content-center rounded-full bg-black/30 backdrop-blur-sm"
          aria-label="Favorite"
        >
          <Heart className="size-[18px] text-white transition group-hover/favorite:fill-primary group-hover/favorite:text-primary" />
        </button>
      </div>
      <div className="p-2 pt-4">
        <div className="pb-2.5">
          <Link to="/location" className="mb-1.5 inline-block text-lg/6 font-semibold text-black transition hover:text-primary">
            <span className="line-clamp-1">{property.title}</span>
          </Link>
          <p className="line-clamp-2 min-h-10 text-sm/5 font-medium">{property.address}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-gray-light p-2">
          <div className="flex items-center gap-2">
            <BedDouble className="size-5 shrink-0 text-primary" />
            <span className="text-sm font-semibold">{property.beds}&nbsp;Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="size-5 shrink-0 text-primary" />
            <span className="text-sm font-semibold">{property.baths}&nbsp;Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="size-5 shrink-0 text-primary" />
            <span className="text-sm font-semibold">{property.size}&nbsp;m²</span>
          </div>
        </div>
        <div className="mt-2.5 flex items-end justify-between">
          <p className="text-base/5 font-semibold text-primary md:text-lg/5">{property.price}</p>
          <Link to="/location" className="btn h-7" aria-label="View details">
            <ArrowUpRight className="size-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  icon: Icon,
  value,
  placeholder,
  options,
  onChange,
}: {
  icon: React.ElementType;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative line-clamp-1 flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray/20 bg-white px-3 py-2.5 pl-8 text-left text-sm/5 shadow-sm lg:border-transparent lg:px-5 lg:py-3.5 lg:pl-11 lg:shadow-none"
      >
        <span className="absolute top-1/2 left-2 -translate-y-1/2 lg:left-5">
          <Icon className="size-[18px] shrink-0 text-primary" />
        </span>
        <span className={cn("text-sm font-normal", !value && "text-gray")}>
          {value || placeholder}
        </span>
        <ChevronDown className="size-4 text-black" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-1 max-h-52 space-y-1 overflow-y-auto rounded-lg border border-gray/30 bg-white p-1.5 text-sm/5 font-medium text-gray shadow-sm">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "relative flex w-full rounded-md px-4 py-1.5 transition hover:bg-gray-light",
                value === opt && "bg-gray-light text-black"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const propertiesRef = useRef<HTMLDivElement>(null);

  const scrollProperties = (dir: 1 | -1) => {
    propertiesRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="grow">
      {/* Hero */}
      <div className="bg-gradient-to-b from-white to-transparent py-14 lg:pb-5">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative w-full max-w-screen-md text-center lg:py-14 lg:text-left xl:py-20">
              <span className="absolute -top-8 right-10 hidden sm:block lg:top-0 lg:-right-44">
                <img src={circleText} alt="Circle text" className="size-16 animate-[spin_10s_linear_infinite] lg:size-28" />
                <Link to="/location">
                  <ArrowUpRight className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-primary duration-300 hover:rotate-45 lg:size-8" />
                </Link>
              </span>
              <span className="rounded-md bg-primary px-2 py-1 text-xs tracking-wider text-white uppercase">
                Property management
              </span>
              <h1 className="mt-3 text-[28px]/9 font-semibold text-black sm:text-4xl/normal lg:text-5xl/snug">
                Manage Your Properties:
                <br />
                <span className="text-primary">Simply &amp; Efficiently</span>
              </h1>
              <p className="mx-auto mt-4 max-w-[516px] text-sm text-gray lg:mx-0 lg:mt-6 lg:text-base">
                Centralize rentals, leases, tenants, maintenance, and accounting
                in one platform. Grow your real estate business with ease.
              </p>
              <div className="mx-auto mt-10 space-y-2 md:max-w-screen-sm lg:mx-0 lg:mt-16 lg:max-w-screen-lg">
                <div className="inline-flex gap-1 overflow-hidden rounded-lg border border-gray/20 p-1 lg:px-2.5 lg:py-2">
                  {(["rent", "buy"] as const).map((m) => (
                    <label
                      key={m}
                      className={cn(
                        "relative inline-flex min-w-24 cursor-pointer justify-center rounded-md px-4 py-1.5 text-black hover:bg-primary hover:text-white",
                        mode === m && "bg-primary text-white"
                      )}
                    >
                      <input
                        type="radio"
                        className="absolute inset-0 cursor-pointer appearance-none"
                        name="property-type"
                        value={m}
                        checked={mode === m}
                        onChange={() => setMode(m)}
                      />
                      {m === "rent" ? "Rent" : "Buy"}
                    </label>
                  ))}
                </div>
                <form
                  className="relative flex w-full flex-col gap-5 lg:flex-row lg:items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/location");
                  }}
                >
                  <div className="flex grow flex-wrap items-center gap-2.5 rounded-xl bg-primary/10 p-3.5 backdrop-blur-lg lg:-mr-60 lg:flex-nowrap lg:shadow-sm">
                    <FilterSelect icon={MapPin} value={city} placeholder="Location" options={cities} onChange={setCity} />
                    <span className="hidden h-10 w-px shrink-0 rounded-full bg-white/70 lg:block" />
                    <FilterSelect icon={Building} value={type} placeholder="Property type" options={propertyTypes} onChange={setType} />
                    <span className="hidden h-10 w-px shrink-0 rounded-full bg-white/70 lg:block" />
                    <FilterSelect icon={DollarSign} value={price} placeholder="Price" options={priceRanges} onChange={setPrice} />
                    <span className="hidden h-10 w-px shrink-0 rounded-full bg-white/50 lg:block" />
                    <div className="mx-auto mt-2 lg:mt-0">
                      <button className="btn bg-white text-primary shadow-sm hover:opacity-90 lg:p-[13px]" type="submit">
                        <Search className="size-5 lg:size-6" />
                        <span className="block lg:hidden">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-auto hidden h-[650px] w-full max-w-screen-md overflow-hidden rounded-tl-full lg:block">
              <img src={city6} alt="Home design" className="h-full w-full rounded-[2rem] object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Most searched properties */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grow">
              <h2 className="text-2xl font-semibold text-black lg:text-4xl/snug">
                Most Searched Properties
              </h2>
              <span className="mt-2.5 block h-0.5 w-36 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
            </div>
            <div className="ml-auto flex shrink-0 gap-3">
              <button type="button" className="btn cursor-pointer px-3" onClick={() => scrollProperties(-1)} aria-label="Previous">
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" className="btn cursor-pointer px-3" onClick={() => scrollProperties(1)} aria-label="Next">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
          <div
            ref={propertiesRef}
            className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredProperties.map((p) => (
              <div key={p.title} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted partners */}
      <div className="bg-white py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Trusted Global Partners</SectionTitle>
          <div className="overflow-hidden">
            <div className="mt-12 flex animate-[marquee_40s_linear_infinite] gap-20 text-sm font-medium whitespace-nowrap text-black">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((l, i) => (
                <img key={i} src={l} loading="lazy" alt="Partner logo" className="w-40 duration-300 hover:scale-110" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Popular Real Estate Categories</SectionTitle>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {categories.map((c) => (
              <div
                key={c.name}
                className="group relative overflow-hidden rounded-2xl border border-gray/10 bg-white from-primary/5 to-transparent transition-all duration-300 hover:bg-gradient-to-t"
              >
                <Link to="/location" className="absolute inset-0" aria-label={c.name} />
                <div className="aspect-[4/2] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="size-full object-cover duration-300 group-hover:translate-x-3 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-2 p-4 lg:p-5">
                  <h3 className="text-xl/6 font-semibold text-black group-hover:text-primary">{c.name}</h3>
                  <span className="mt-1 inline-block size-1 rotate-45 bg-primary" />
                  <p className="mt-1 text-xs/4 font-medium">{c.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Simple Steps to Get Started</SectionTitle>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-0 xl:grid-cols-4 xl:overflow-hidden xl:rounded-3xl">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  "relative flex flex-col items-start gap-6 border-primary/5 px-6 py-6 sm:px-8",
                  i % 2 === 0 ? "bg-primary/5" : "border bg-transparent",
                  "rounded-2xl xl:rounded-none",
                  i === 3 && "sm:bg-primary/5 sm:border-0 xl:bg-transparent xl:border"
                )}
              >
                <img src={s.icon} alt="" aria-hidden="true" className="absolute top-3 right-3 size-24 opacity-[3%] sm:size-32" />
                <span className="relative text-5xl font-bold text-primary lg:text-6xl">
                  {i + 1}
                  <span className="absolute top-5 left-1 inline-block size-10 bg-primary/10" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-black lg:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm font-medium">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Our Property Services</SectionTitle>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group relative rounded-2xl bg-gradient-to-b from-white to-transparent p-6 pt-16 shadow-sm">
                <div className="absolute top-0 right-0">
                  <span className="grid size-16 place-content-center rounded-tr-2xl rounded-bl-2xl bg-primary text-white ring-[10px] ring-[#fafafa]">
                    <s.icon className="size-8 shrink-0" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-black lg:text-2xl">{s.title}</h3>
                  <p className="mt-2.5 text-sm">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular cities */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Popular Cities</SectionTitle>
          <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {popularCities.map((c) => (
              <div key={c.name} className="group relative h-[420px] w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[320px] lg:h-[500px]">
                <img src={c.image} alt={c.name} className="size-full object-cover duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Link to="/location" className="absolute inset-0 z-[1]" aria-label={c.name} />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl p-4 backdrop-blur-md">
                  <div>
                    <h3 className="text-2xl font-medium text-white transition group-hover:text-white/80">{c.name}</h3>
                    <p className="mt-1.5 text-white/80">{c.count}</p>
                  </div>
                  <ArrowUpRight className="size-8 shrink-0 rotate-45 text-white duration-300 group-hover:rotate-0" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 lg:py-20">
        <div className="container">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
            {[faqLeft, faqRight].map((col, ci) => (
              <Accordion key={ci} type="single" collapsible className="grid gap-6">
                {col.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${ci}-${i}`}
                    className="overflow-hidden rounded-xl border border-gray/20"
                  >
                    <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between gap-5 px-4 py-4 text-left text-base/6 text-black transition hover:text-primary hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary lg:text-lg">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 leading-6 text-gray">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA */}
      <ParallaxCTA />

      <BackToTop />
      <Chatbot />
    </div>
  );
}
