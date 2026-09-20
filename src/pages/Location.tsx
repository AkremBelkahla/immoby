import { useState } from "react";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MapPin, Maximize2 } from "lucide-react";

type BienLocation = {
  id: string;
  titre: string;
  ville: string;
  type: "Apartment" | "House" | "Commercial";
  surface: number;
  loyer: number;
  image: string;
};

const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];

const biensLocation: BienLocation[] = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: `${i % 3 === 0 ? "Apartment" : i % 3 === 1 ? "House" : "Commercial"} ${i < 10 ? (i % 5 + 1) + "BR" : i < 20 ? "with terrace" : "Downtown"}`,
  ville: villes[i % villes.length],
  type: i % 3 === 0 ? "Apartment" : i % 3 === 1 ? "House" : "Commercial",
  surface: 30 + (i * 15) % 150,
  loyer: 500 + (i * 120) % 2500,
  image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop",
}));

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
                <CardTitle className="text-lg text-black">Filters</CardTitle>
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
                <div key={bien.id} className="w-full overflow-hidden rounded-2xl border border-gray/20 bg-white p-1.5">
                  <div className="group relative h-48 overflow-hidden rounded-lg">
                    <img
                      src={bien.image}
                      alt={bien.titre}
                      className="h-full w-full object-cover duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop";
                      }}
                    />
                    <span className="absolute top-3 left-2 rounded border border-gray/30 bg-white/50 px-2 py-1 text-sm/4 font-semibold text-black backdrop-blur-xl">
                      {bien.type}
                    </span>
                  </div>

                  <div className="p-2 pt-4">
                    <div className="pb-2.5">
                      <span className="mb-1.5 inline-block line-clamp-1 text-lg/6 font-semibold text-black">
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
                      <Button className="btn h-7">View property</Button>
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
