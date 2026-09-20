import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockReglements = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  reference: `PAY-${String(i + 1).padStart(5, '0')}`,
  payeur: `Tenant ${(i % 10) + 1}`,
  montant: Math.floor(Math.random() * 1500) + 500,
  date: new Date(2024, 10, i + 1).toLocaleDateString("en-US"),
  moyen: ["Bank transfer", "Check", "Cash", "Direct debit"][i % 4],
  statut: i % 4 === 0 ? "Validated" : "Pending",
}));

export default function Reglements() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Track received payments"
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReglements.map((reglement) => (
                <TableRow key={reglement.id}>
                  <TableCell className="font-medium">{reglement.reference}</TableCell>
                  <TableCell>{reglement.payeur}</TableCell>
                  <TableCell className="font-bold">{reglement.montant} €</TableCell>
                  <TableCell>{reglement.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{reglement.moyen}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={reglement.statut === "Validated" ? "default" : "secondary"}>
                      {reglement.statut}
                    </Badge>
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
