import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react";
import { Bien } from "@/types/immo";
import { useLocalStore } from "@/hooks/useLocalStore";
import { seedBiens } from "@/lib/seedData";
import { toast } from "sonner";

export default function Biens() {
  const [biens, setBiens] = useLocalStore<Bien[]>("immo:biens", seedBiens);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBien, setEditingBien] = useState<Bien | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBiens = biens.filter((bien) => {
    const matchesSearch =
      bien.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.ville.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut =
      filterStatut === "all" || bien.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  const handleAdd = () => {
    setEditingBien(null);
    setDialogOpen(true);
  };

  const handleEdit = (bien: Bien) => {
    setEditingBien(bien);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce bien ?")) {
      setBiens(biens.filter((b) => b.id !== id));
      toast.success("Bien supprimé avec succès");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const bienData: Bien = {
      id: editingBien?.id || Date.now().toString(),
      titre: formData.get("titre") as string,
      ville: formData.get("ville") as string,
      type: formData.get("type") as "Appartement" | "Maison" | "Local",
      surface: Number(formData.get("surface")),
      loyer: Number(formData.get("loyer")),
      statut: formData.get("statut") as "Disponible" | "Loué",
      createdAt: editingBien?.createdAt || new Date().toISOString(),
    };

    if (editingBien) {
      setBiens(biens.map((b) => (b.id === editingBien.id ? bienData : b)));
      toast.success("Bien modifié avec succès");
    } else {
      setBiens([...biens, bienData]);
      toast.success("Bien ajouté avec succès");
    }

    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des biens"
        description="Gérez votre patrimoine immobilier"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              localStorage.removeItem("immo:biens");
              window.location.reload();
            }}>
              Réinitialiser les données
            </Button>
            <Button onClick={handleAdd}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un bien
            </Button>
          </div>
        }
      />

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatut} onValueChange={setFilterStatut}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="Disponible">Disponible</SelectItem>
            <SelectItem value="Loué">Loué</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Surface</TableHead>
              <TableHead>Loyer</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBiens
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((bien) => (
                <TableRow key={bien.id}>
                  <TableCell className="font-medium">{bien.titre}</TableCell>
                  <TableCell>{bien.ville}</TableCell>
                  <TableCell>{bien.type}</TableCell>
                  <TableCell>{bien.surface} m²</TableCell>
                  <TableCell>{bien.loyer} €</TableCell>
                  <TableCell>
                    <Badge
                      variant={bien.statut === "Loué" ? "default" : "secondary"}
                    >
                      {bien.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(bien)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(bien.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredBiens.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredBiens.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(Math.ceil(filteredBiens.length / itemsPerPage), currentPage + 1))}
                className={currentPage === Math.ceil(filteredBiens.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBien ? "Modifier le bien" : "Ajouter un bien"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du bien immobilier
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                defaultValue={editingBien?.titre}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  name="ville"
                  defaultValue={editingBien?.ville}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue={editingBien?.type || "Appartement"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appartement">Appartement</SelectItem>
                    <SelectItem value="Maison">Maison</SelectItem>
                    <SelectItem value="Local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surface">Surface (m²)</Label>
                <Input
                  id="surface"
                  name="surface"
                  type="number"
                  defaultValue={editingBien?.surface}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loyer">Loyer (€)</Label>
                <Input
                  id="loyer"
                  name="loyer"
                  type="number"
                  defaultValue={editingBien?.loyer}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select name="statut" defaultValue={editingBien?.statut || "Disponible"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Loué">Loué</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {editingBien ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
