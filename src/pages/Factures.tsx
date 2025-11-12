import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

const mockFactures = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  numero: `FAC-2024-${String(i + 1).padStart(4, '0')}`,
  destinataire: i % 2 === 0 ? `Locataire ${i + 1}` : `Propriétaire ${i + 1}`,
  type: i % 2 === 0 ? "Loyer" : "Travaux",
  montant: Math.floor(Math.random() * 2000) + 500,
  date: new Date(2024, 10, i + 1).toLocaleDateString("fr-FR"),
  statut: i % 3 === 0 ? "Payée" : i % 3 === 1 ? "En attente" : "En retard",
}));

export default function Factures() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Factures"
        description="Gérez vos factures"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle facture
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFactures.map((facture) => (
                <TableRow key={facture.id}>
                  <TableCell className="font-medium">{facture.numero}</TableCell>
                  <TableCell>{facture.destinataire}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{facture.type}</Badge>
                  </TableCell>
                  <TableCell className="font-bold">{facture.montant} €</TableCell>
                  <TableCell>{facture.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        facture.statut === "Payée"
                          ? "default"
                          : facture.statut === "En retard"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {facture.statut}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
