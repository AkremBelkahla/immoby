import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MapPin, Maximize2 } from "lucide-react";
import { rentalProperties, villes } from "@/lib/rentalData";

const biensLocation = rentalProperties;

export default function Location() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [villeFilter, setVilleFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loyerMax, setLoyerMax] = useState([3000]);

  const itemsPerPage = 12;

  // Filtering
  const filteredBiens = biensLocation.filter((bien) => {
    const matchSearch = bien.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       bien.ville.toLowerCase().includes(searchTerm.toLowerCase());
    const matchVille = villeFilter === "all" || bien.ville === villeFilter;
    const matchType = typeFilter === "all" || bien.type === typeFilter;
    const matchLoyer = bien.loyer <= loyerMax[0];
    
    return matchSearch && matchVille && matchType && matchLoyer;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBiens = filteredBiens.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setVilleFilter("all");
    setTypeFilter("all");
    setLoyerMax([3000]);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeaderBg title="Available rentals" subtitle="Find your ideal property among our 30 listings" />
      
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card className="rounded-2xl border-gray/20">
              <CardHeader>
                <CardTitle className="text-lg text-ink">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Title, city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ville">City</Label>
                  <Select value={villeFilter} onValueChange={setVilleFilter}>
                    <SelectTrigger id="ville" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All cities</SelectItem>
                      {villes.map((ville) => (
                        <SelectItem key={ville} value={ville}>
                          {ville}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Property type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loyer">Max rent: {loyerMax[0]}€</Label>
                  <Slider
                    id="loyer"
                    min={500}
                    max={3000}
                    step={100}
                    value={loyerMax}
                    onValueChange={setLoyerMax}
                    className="mt-2"
                  />
                </div>

                <Button variant="outline" onClick={resetFilters} className="btn-outline w-full">
                  Reset
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-primary/20 bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="text-sm">
                  <strong>{filteredBiens.length}</strong> propert{filteredBiens.length > 1 ? "ies" : "y"} available
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Properties grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {currentBiens.map((bien) => (
                <div key={bien.id} className="w-full overflow-hidden rounded-2xl border border-gray/20 bg-card p-1.5">
                  <div className="group relative h-48 overflow-hidden rounded-lg">
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
                    <div className="pb-2.5">
                      <span className="mb-1.5 inline-block line-clamp-1 text-lg/6 font-semibold text-ink">
                        {bien.titre}
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-gray-light p-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-5 shrink-0 text-primary" />
                          <span className="text-sm font-semibold">{bien.ville}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 className="size-5 shrink-0 text-primary" />
                          <span className="text-sm font-semibold">{bien.surface}&nbsp;m²</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-end justify-between">
                      <p className="text-base/5 font-semibold text-primary md:text-lg/5">
                        {bien.loyer}€<span className="text-sm font-normal text-gray">/month</span>
                      </p>
                      <Link to={`/location/${bien.id}`}>
                        <Button className="btn h-7">View property</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
