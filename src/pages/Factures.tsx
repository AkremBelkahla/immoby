import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

const mockFactures = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  numero: `INV-2024-${String(i + 1).padStart(4, '0')}`,
  destinataire: i % 2 === 0 ? `Tenant ${i + 1}` : `Owner ${i + 1}`,
  type: i % 2 === 0 ? "Rent" : "Works",
  montant: Math.floor(Math.random() * 2000) + 500,
  date: new Date(2024, 10, i + 1).toLocaleDateString("en-US"),
  statut: i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Pending" : "Overdue",
}));

export default function Factures() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage your invoices"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New invoice
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
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
                        facture.statut === "Paid"
                          ? "default"
                          : facture.statut === "Overdue"
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
