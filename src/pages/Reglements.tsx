import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockReglements = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  reference: `REG-${String(i + 1).padStart(5, '0')}`,
  payeur: `Locataire ${(i % 10) + 1}`,
  montant: Math.floor(Math.random() * 1500) + 500,
  date: new Date(2024, 10, i + 1).toLocaleDateString("fr-FR"),
  moyen: ["Virement", "Chèque", "Espèces", "Prélèvement"][i % 4],
  statut: i % 4 === 0 ? "Validé" : "En attente",
}));

export default function Reglements() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Règlements"
        description="Suivez les paiements reçus"
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Payeur</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Moyen de paiement</TableHead>
                <TableHead>Statut</TableHead>
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
                    <Badge variant={reglement.statut === "Validé" ? "default" : "secondary"}>
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
