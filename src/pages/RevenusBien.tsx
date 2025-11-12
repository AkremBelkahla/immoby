import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockRevenus = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  bien: `Appartement T${(i % 4) + 1} - Paris`,
  proprietaire: `Propriétaire ${(i % 5) + 1}`,
  loyerMensuel: 800 + (i * 100),
  revenuAnnuel: (800 + (i * 100)) * 12,
  tauxOccupation: 90 + (i % 10),
}));

export default function RevenusBien() {
  const totalRevenus = mockRevenus.reduce((acc, r) => acc + r.revenuAnnuel, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenus par bien"
        description="Suivez les revenus de chaque bien"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Revenus annuels totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenus.toLocaleString()} €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Nombre de biens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRevenus.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taux d'occupation moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockRevenus.reduce((acc, r) => acc + r.tauxOccupation, 0) / mockRevenus.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bien</TableHead>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Loyer mensuel</TableHead>
                <TableHead>Revenu annuel</TableHead>
                <TableHead>Taux d'occupation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRevenus.map((revenu) => (
                <TableRow key={revenu.id}>
                  <TableCell className="font-medium">{revenu.bien}</TableCell>
                  <TableCell>{revenu.proprietaire}</TableCell>
                  <TableCell>{revenu.loyerMensuel} €</TableCell>
                  <TableCell className="font-bold">{revenu.revenuAnnuel.toLocaleString()} €</TableCell>
                  <TableCell>
                    <Badge variant={revenu.tauxOccupation > 95 ? "default" : "secondary"}>
                      {revenu.tauxOccupation}%
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
