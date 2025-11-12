import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Ticket } from "@/types/immo";
import { useLocalStore } from "@/hooks/useLocalStore";
import { seedTickets } from "@/lib/seedData";
import { toast } from "sonner";

export default function Tickets() {
  const [tickets, setTickets] = useLocalStore<Ticket[]>("immo:tickets", seedTickets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Grouper par statut pour vue Kanban
  const ticketsOuverts = tickets.filter((t) => t.statut === "Ouvert");
  const ticketsEnCours = tickets.filter((t) => t.statut === "En cours");
  const ticketsClotures = tickets.filter((t) => t.statut === "Clôturé");

  const handleAdd = () => {
    setEditingTicket(null);
    setDialogOpen(true);
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
      setTickets(tickets.filter((t) => t.id !== id));
      toast.success("Ticket supprimé avec succès");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const ticketData: Ticket = {
      id: editingTicket?.id || Date.now().toString(),
      titre: formData.get("titre") as string,
      description: (formData.get("description") as string) || undefined,
      priorite: formData.get("priorite") as "Basse" | "Moyenne" | "Haute",
      statut: formData.get("statut") as "Ouvert" | "En cours" | "Clôturé",
      createdAt: editingTicket?.createdAt || new Date().toISOString(),
    };

    if (editingTicket) {
      setTickets(tickets.map((t) => (t.id === editingTicket.id ? ticketData : t)));
      toast.success("Ticket modifié avec succès");
    } else {
      setTickets([...tickets, ticketData]);
      toast.success("Ticket créé avec succès");
    }

    setDialogOpen(false);
  };

  const getPrioriteVariant = (priorite: string) => {
    switch (priorite) {
      case "Haute":
        return "destructive";
      case "Moyenne":
        return "default";
      default:
        return "secondary";
    }
  };

  const TicketCard = ({ ticket }: { ticket: Ticket }) => (
    <Card className="mb-3">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{ticket.titre}</CardTitle>
          <Badge variant={getPrioriteVariant(ticket.priorite)}>
            {ticket.priorite}
          </Badge>
        </div>
        {ticket.description && (
          <CardDescription className="text-sm">{ticket.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(ticket)}>
            <Pencil className="h-3 w-3 mr-1" />
            Modifier
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(ticket.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tickets SAV"
        description="Gérez les demandes d'intervention"
        actions={
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un ticket
          </Button>
        }
      />

      {/* Vue Kanban */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Ouvert</h3>
            <Badge variant="secondary">{ticketsOuverts.length}</Badge>
          </div>
          <div className="space-y-3">
            {ticketsOuverts.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">En cours</h3>
            <Badge variant="secondary">{ticketsEnCours.length}</Badge>
          </div>
          <div className="space-y-3">
            {ticketsEnCours.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Clôturé</h3>
            <Badge variant="secondary">{ticketsClotures.length}</Badge>
          </div>
          <div className="space-y-3">
            {ticketsClotures.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTicket ? "Modifier le ticket" : "Créer un ticket"}
            </DialogTitle>
            <DialogDescription>
              Renseignez les informations de la demande d'intervention
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                defaultValue={editingTicket?.titre}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingTicket?.description}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priorite">Priorité</Label>
                <Select
                  name="priorite"
                  defaultValue={editingTicket?.priorite || "Moyenne"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basse">Basse</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Haute">Haute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select name="statut" defaultValue={editingTicket?.statut || "Ouvert"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ouvert">Ouvert</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Clôturé">Clôturé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {editingTicket ? "Modifier" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
