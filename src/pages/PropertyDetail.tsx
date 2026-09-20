import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BedDouble, Bath, Ruler, MapPin, Check, CalendarDays, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRentalProperty, rentalProperties } from "@/lib/rentalData";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = getRentalProperty(id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-semibold text-ink">Property not found</h1>
        <p className="mt-3 text-gray">The listing you are looking for does not exist or is no longer available.</p>
        <Link to="/location" className="btn mt-8">
          <ArrowLeft /> Back to rentals
        </Link>
      </div>
    );
  }

  const similar = rentalProperties
    .filter((b) => b.id !== property.id && (b.ville === property.ville || b.type === property.type))
    .slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request sent", {
      description: "Our team will contact you shortly about this property.",
    });
  };

  return (
    <>
      <PageHeaderBg
        title={property.titre}
        subtitle={`${property.type} for rent in ${property.ville}`}
      />

      <div className="container pb-16 lg:pb-24">
        <Link
          to="/location"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
        >
          <ArrowLeft className="size-4" /> Back to rentals
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-10 lg:col-span-2">
            {/* Gallery */}
            <div>
              <div className="group relative h-[280px] overflow-hidden rounded-2xl sm:h-[420px]">
                <img
                  src={property.images[activeImage]}
                  alt={property.titre}
                  className="h-full w-full object-cover duration-300"
                />
                <span className="absolute top-3 left-3 rounded border border-gray/30 bg-white/50 px-2 py-1 text-sm/4 font-semibold text-black backdrop-blur-xl">
                  {property.type}
                </span>
                <span className="absolute top-3 right-3 rounded bg-primary px-2 py-1 text-sm/4 font-semibold text-white">
                  For rent
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "h-20 overflow-hidden rounded-lg border-2 transition sm:h-24",
                      activeImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${property.titre} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Specs band */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl bg-gray-light p-4 sm:p-5">
              {property.beds > 0 && (
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <BedDouble className="size-5 text-primary" /> {property.beds} Bedrooms
                </span>
              )}
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Bath className="size-5 text-primary" /> {property.baths} Bathroom{property.baths > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Ruler className="size-5 text-primary" /> {property.surface} m²
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin className="size-5 text-primary" /> {property.ville}
              </span>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-ink lg:text-2xl">Description</h2>
              <span className="mt-2 block h-0.5 w-24 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
              <p className="mt-4 leading-7 text-gray">{property.description}</p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-semibold text-ink lg:text-2xl">Amenities</h2>
              <span className="mt-2 block h-0.5 w-24 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 rounded-lg border border-gray/20 bg-card px-4 py-3 text-sm font-medium text-ink">
                    <span className="grid size-6 shrink-0 place-content-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" />
                    </span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="rounded-2xl border-gray/20 bg-card">
              <CardContent className="p-6">
                <p className="text-sm font-medium uppercase tracking-wider text-gray">Monthly rent</p>
                <p className="mt-2 text-3xl font-semibold text-primary">
                  {property.loyer}€<span className="text-base font-normal text-gray">/month</span>
                </p>
                <div className="mt-5 space-y-3 border-t border-gray/15 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray">Type</span>
                    <span className="font-semibold text-ink">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Surface</span>
                    <span className="font-semibold text-ink">{property.surface} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">City</span>
                    <span className="font-semibold text-ink">{property.ville}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Reference</span>
                    <span className="font-semibold text-ink">REF-{property.id.padStart(4, "0")}</span>
                  </div>
                </div>
                <Button className="btn mt-6 w-full">
                  <CalendarDays /> Schedule a visit
                </Button>
              </CardContent>
            </Card>

            {/* Contact form */}
            <Card className="rounded-2xl border-gray/20 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-ink">Request information</h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <input type="text" required placeholder="Your name" className="form-input" />
                  <input type="email" required placeholder="Your email" className="form-input" />
                  <input type="tel" placeholder="Your phone" className="form-input" />
                  <textarea
                    rows={4}
                    required
                    placeholder={`Hello, I am interested in "${property.titre}" in ${property.ville}...`}
                    className="form-textarea"
                    defaultValue={`Hello, I am interested in "${property.titre}" in ${property.ville}.`}
                  />
                  <Button type="submit" className="btn w-full">
                    <Mail /> Send request
                  </Button>
                </form>
                <div className="mt-5 flex items-center gap-3 border-t border-gray/15 pt-5 text-sm text-gray">
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+33 1 23 45 67 89</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-semibold text-ink lg:text-4xl/snug">Similar properties</h2>
            <span className="mt-2.5 block h-0.5 w-36 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((bien) => (
                <div key={bien.id} className="w-full overflow-hidden rounded-2xl border border-gray/20 bg-card p-1.5">
                  <div className="group relative h-52 overflow-hidden rounded-lg">
                    <img
                      src={bien.image}
                      alt={bien.titre}
                      className="h-full w-full object-cover duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-2 rounded border border-gray/30 bg-white/50 px-2 py-1 text-sm/4 font-semibold text-black backdrop-blur-xl">
                      {bien.type}
                    </span>
                  </div>
                  <div className="p-2 pt-4">
                    <span className="mb-1.5 inline-block line-clamp-1 text-lg/6 font-semibold text-ink">
                      {bien.titre}
                    </span>
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-gray-light p-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-5 shrink-0 text-primary" />
                        <span className="text-sm font-semibold">{bien.ville}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="size-5 shrink-0 text-primary" />
                        <span className="text-sm font-semibold">{bien.surface}&nbsp;m²</span>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-end justify-between">
                      <p className="text-base/5 font-semibold text-primary md:text-lg/5">
                        {bien.loyer}€<span className="text-sm font-normal text-gray">/month</span>
                      </p>
                      <Link to={`/location/${bien.id}`}>
                        <Button className="btn h-7">
                          View property <ArrowUpRight className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
