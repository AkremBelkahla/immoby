import { useState } from "react";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Building2, Home, MapPin, Maximize2 } from "lucide-react";

type BienLocation = {
  id: string;
  titre: string;
  ville: string;
  type: "Appartement" | "Maison" | "Local";
  surface: number;
  loyer: number;
  image: string;
};

const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];

const biensLocation: BienLocation[] = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: `${i % 3 === 0 ? "Appartement" : i % 3 === 1 ? "Maison" : "Local"} ${i < 10 ? "T" + (i % 5 + 1) : i < 20 ? "avec terrasse" : "Centre-ville"}`,
  ville: villes[i % villes.length],
  type: i % 3 === 0 ? "Appartement" : i % 3 === 1 ? "Maison" : "Local",
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

  // Filtrage
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
      <PageHeaderBg title="Locations disponibles" subtitle="Trouvez votre bien idéal parmi nos 30 propriétés" />
      
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filtres */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Rechercher</Label>
                  <Input
                    id="search"
                    placeholder="Titre, ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ville">Ville</Label>
                  <Select value={villeFilter} onValueChange={setVilleFilter}>
                    <SelectTrigger id="ville" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {villes.map((ville) => (
                        <SelectItem key={ville} value={ville}>
                          {ville}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Type de bien</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loyer">Loyer max: {loyerMax[0]}€</Label>
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

                <Button variant="outline" onClick={resetFilters} className="w-full">
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="text-sm">
                  <strong>{filteredBiens.length}</strong> bien{filteredBiens.length > 1 ? "s" : ""} disponible{filteredBiens.length > 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Grille des biens */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {currentBiens.map((bien) => (
                <Card key={bien.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={bien.image}
                      alt={bien.titre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop";
                      }}
                    />
                    <Badge className="absolute top-2 right-2">
                      {bien.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">{bien.titre}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {bien.ville}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Maximize2 className="h-4 w-4" />
                      {bien.surface} m²
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {bien.loyer}€<span className="text-sm font-normal text-muted-foreground">/mois</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full">Voir le bien</Button>
                  </CardFooter>
                </Card>
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
