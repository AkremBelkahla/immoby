import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { Ecriture } from "@/types/immo";
import { useLocalStore } from "@/hooks/useLocalStore";
import { seedEcritures } from "@/lib/seedData";
import { toast } from "sonner";

export default function Ecritures() {
  const [ecritures, setEcritures] = useLocalStore<Ecriture[]>(
    "immo:ecritures",
    seedEcritures
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterJournal, setFilterJournal] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEcritures = ecritures.filter((ecriture) => {
    return filterJournal === "all" || ecriture.journal === filterJournal;
  });

  // Calculer les totaux
  const totalDebit = filteredEcritures.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = filteredEcritures.reduce((sum, e) => sum + e.credit, 0);
  const solde = totalCredit - totalDebit;

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette écriture ?")) {
      setEcritures(ecritures.filter((e) => e.id !== id));
      toast.success("Écriture supprimée avec succès");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const ecritureData: Ecriture = {
      id: Date.now().toString(),
      date: formData.get("date") as string,
      libelle: formData.get("libelle") as string,
      debit: Number(formData.get("debit")) || 0,
      credit: Number(formData.get("credit")) || 0,
      journal: formData.get("journal") as "Banque" | "Ventes" | "Achats" | "OD",
    };

    setEcritures([ecritureData, ...ecritures]);
    toast.success("Écriture ajoutée avec succès");
    setDialogOpen(false);
  };

  const getJournalBadge = (journal: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      Banque: "default",
      Ventes: "secondary",
      Achats: "outline",
      OD: "outline",
    };
    return variants[journal] || "outline";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Écritures comptables"
        description="Suivez vos mouvements financiers"
        actions={
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une écriture
          </Button>
        }
      />

      {/* Indicateurs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Débit</p>
          <p className="text-2xl font-bold text-red-600">{totalDebit.toLocaleString()} €</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Crédit</p>
          <p className="text-2xl font-bold text-green-600">{totalCredit.toLocaleString()} €</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Solde</p>
          <p
            className={`text-2xl font-bold ${
              solde >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {solde.toLocaleString()} €
          </p>
        </div>
      </div>

      {/* Filtre */}
      <div className="flex gap-4">
        <Select value={filterJournal} onValueChange={setFilterJournal}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Journal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les journaux</SelectItem>
            <SelectItem value="Banque">Banque</SelectItem>
            <SelectItem value="Ventes">Ventes</SelectItem>
            <SelectItem value="Achats">Achats</SelectItem>
            <SelectItem value="OD">OD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Journal</TableHead>
              <TableHead className="text-right">Débit</TableHead>
              <TableHead className="text-right">Crédit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEcritures
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((ecriture) => (
                <TableRow key={ecriture.id}>
                  <TableCell>
                    {new Date(ecriture.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{ecriture.libelle}</TableCell>
                  <TableCell>
                    <Badge variant={getJournalBadge(ecriture.journal)}>
                      {ecriture.journal}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {ecriture.debit > 0 ? `${ecriture.debit.toLocaleString()} €` : "-"}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {ecriture.credit > 0 ? `${ecriture.credit.toLocaleString()} €` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(ecriture.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                Totaux
              </TableCell>
              <TableCell className="text-right font-bold text-red-600">
                {totalDebit.toLocaleString()} €
              </TableCell>
              <TableCell className="text-right font-bold text-green-600">
                {totalCredit.toLocaleString()} €
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination */}
      {filteredEcritures.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredEcritures.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage(Math.min(Math.ceil(filteredEcritures.length / itemsPerPage), currentPage + 1))}
                className={currentPage === Math.ceil(filteredEcritures.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une écriture</DialogTitle>
            <DialogDescription>
              Saisissez les informations de l'écriture comptable
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="libelle">Libellé</Label>
              <Input id="libelle" name="libelle" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="journal">Journal</Label>
              <Select name="journal" defaultValue="Banque" required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Banque">Banque</SelectItem>
                  <SelectItem value="Ventes">Ventes</SelectItem>
                  <SelectItem value="Achats">Achats</SelectItem>
                  <SelectItem value="OD">OD (Opérations diverses)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debit">Débit (€)</Label>
                <Input
                  id="debit"
                  name="debit"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credit">Crédit (€)</Label>
                <Input
                  id="credit"
                  name="credit"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
