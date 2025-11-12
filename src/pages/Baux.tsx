import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Kpi } from "@/components/Kpi";
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
import { PlusCircle, Pencil, Trash2, FileText, TrendingUp } from "lucide-react";
import { Bail, Bien } from "@/types/immo";
import { useLocalStore } from "@/hooks/useLocalStore";
import { seedBaux, seedBiens } from "@/lib/seedData";
import { toast } from "sonner";

export default function Baux() {
  const [baux, setBaux] = useLocalStore<Bail[]>("immo:baux", seedBaux);
  const [biens] = useLocalStore<Bien[]>("immo:biens", seedBiens);
  const [filterStatut, setFilterStatut] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBail, setEditingBail] = useState<Bail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBaux = baux.filter((bail) => {
    return filterStatut === "all" || bail.statut === filterStatut;
  });

  const bauxActifs = baux.filter((b) => b.statut === "Actif");
  const loyerMoyen = bauxActifs.length
    ? Math.round(bauxActifs.reduce((sum, b) => sum + b.loyer, 0) / bauxActifs.length)
    : 0;

  const handleAdd = () => {
    setEditingBail(null);
    setDialogOpen(true);
  };

  const handleEdit = (bail: Bail) => {
    setEditingBail(bail);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce bail ?")) {
      setBaux(baux.filter((b) => b.id !== id));
      toast.success("Bail supprimé avec succès");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const bailData: Bail = {
      id: editingBail?.id || Date.now().toString(),
      bienId: formData.get("bienId") as string,
      locataire: formData.get("locataire") as string,
      debut: formData.get("debut") as string,
      fin: (formData.get("fin") as string) || undefined,
      loyer: Number(formData.get("loyer")),
      depot: Number(formData.get("depot")),
      statut: formData.get("statut") as "Actif" | "Clos",
    };

    if (editingBail) {
      setBaux(baux.map((b) => (b.id === editingBail.id ? bailData : b)));
      toast.success("Bail modifié avec succès");
    } else {
      setBaux([...baux, bailData]);
      toast.success("Bail ajouté avec succès");
    }

    setDialogOpen(false);
  };

  const getBienTitre = (bienId: string) => {
    const bien = biens.find((b) => b.id === bienId);
    return bien?.titre || "Inconnu";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des baux"
        description="Suivez vos contrats de location"
        actions={
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un bail
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2">
        <Kpi
          title="Baux actifs"
          value={bauxActifs.length}
          icon={FileText}
          description="Contrats en cours"
        />
        <Kpi
          title="Loyer moyen"
          value={`${loyerMoyen}€`}
          icon={TrendingUp}
          description="Par bien loué"
        />
      </div>

      {/* Filtre */}
      <div className="flex gap-4">
        <Select value={filterStatut} onValueChange={setFilterStatut}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="Actif">Actif</SelectItem>
            <SelectItem value="Clos">Clos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bien</TableHead>
              <TableHead>Locataire</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Loyer</TableHead>
              <TableHead>Dépôt</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBaux
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((bail) => (
                <TableRow key={bail.id}>
                  <TableCell className="font-medium">{getBienTitre(bail.bienId)}</TableCell>
                  <TableCell>{bail.locataire}</TableCell>
                  <TableCell>{new Date(bail.debut).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {bail.fin ? new Date(bail.fin).toLocaleDateString() : "En cours"}
                  </TableCell>
                  <TableCell>{bail.loyer} €</TableCell>
                  <TableCell>{bail.depot} €</TableCell>
                  <TableCell>
                    <Badge variant={bail.statut === "Actif" ? "default" : "secondary"}>
                      {bail.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(bail)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(bail.id)}
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
      {filteredBaux.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredBaux.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage(Math.min(Math.ceil(filteredBaux.length / itemsPerPage), currentPage + 1))}
                className={currentPage === Math.ceil(filteredBaux.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
              {editingBail ? "Modifier le bail" : "Ajouter un bail"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du contrat de location
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bienId">Bien</Label>
              <Select name="bienId" defaultValue={editingBail?.bienId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un bien" />
                </SelectTrigger>
                <SelectContent>
                  {biens.map((bien) => (
                    <SelectItem key={bien.id} value={bien.id}>
                      {bien.titre} - {bien.ville}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="locataire">Locataire</Label>
              <Input
                id="locataire"
                name="locataire"
                defaultValue={editingBail?.locataire}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debut">Date de début</Label>
                <Input
                  id="debut"
                  name="debut"
                  type="date"
                  defaultValue={editingBail?.debut}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fin">Date de fin</Label>
                <Input id="fin" name="fin" type="date" defaultValue={editingBail?.fin} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loyer">Loyer (€)</Label>
                <Input
                  id="loyer"
                  name="loyer"
                  type="number"
                  defaultValue={editingBail?.loyer}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depot">Dépôt de garantie (€)</Label>
                <Input
                  id="depot"
                  name="depot"
                  type="number"
                  defaultValue={editingBail?.depot}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select name="statut" defaultValue={editingBail?.statut || "Actif"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Clos">Clos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {editingBail ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
