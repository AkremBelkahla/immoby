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

  // Group by status for Kanban view
  const ticketsOuverts = tickets.filter((t) => t.statut === "Open");
  const ticketsEnCours = tickets.filter((t) => t.statut === "In progress");
  const ticketsClotures = tickets.filter((t) => t.statut === "Closed");

  const handleAdd = () => {
    setEditingTicket(null);
    setDialogOpen(true);
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setTickets(tickets.filter((t) => t.id !== id));
      toast.success("Ticket deleted successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const ticketData: Ticket = {
      id: editingTicket?.id || Date.now().toString(),
      titre: formData.get("titre") as string,
      description: (formData.get("description") as string) || undefined,
      priorite: formData.get("priorite") as "Low" | "Medium" | "High",
      statut: formData.get("statut") as "Open" | "In progress" | "Closed",
      createdAt: editingTicket?.createdAt || new Date().toISOString(),
    };

    if (editingTicket) {
      setTickets(tickets.map((t) => (t.id === editingTicket.id ? ticketData : t)));
      toast.success("Ticket updated successfully");
    } else {
      setTickets([...tickets, ticketData]);
      toast.success("Ticket created successfully");
    }

    setDialogOpen(false);
  };

  const getPrioriteVariant = (priorite: string) => {
    switch (priorite) {
      case "High":
        return "destructive";
      case "Medium":
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
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(ticket.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support tickets"
        description="Manage intervention requests"
        actions={
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create ticket
          </Button>
        }
      />

      {/* Kanban view */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Open</h3>
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
            <h3 className="font-semibold">In progress</h3>
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
            <h3 className="font-semibold">Closed</h3>
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
              {editingTicket ? "Edit ticket" : "Create ticket"}
            </DialogTitle>
            <DialogDescription>
              Fill in the intervention request details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Title</Label>
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
                <Label htmlFor="priorite">Priority</Label>
                <Select
                  name="priorite"
                  defaultValue={editingTicket?.priorite || "Medium"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Status</Label>
                <Select name="statut" defaultValue={editingTicket?.statut || "Open"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In progress">In progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingTicket ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
