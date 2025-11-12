import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

const mockEtats = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  bien: `Appartement T${(i % 4) + 1}`,
  locataire: `Locataire ${i + 1}`,
  type: i % 2 === 0 ? "Entrée" : "Sortie",
  date: new Date(2024, 10, i + 1).toLocaleDateString("fr-FR"),
  statut: i % 3 === 0 ? "Validé" : "En attente",
}));

export default function EtatsLieux() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="États des lieux"
        description="Gérez les états des lieux d'entrée et de sortie"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel état des lieux
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bien</TableHead>
                <TableHead>Locataire</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEtats.map((etat) => (
                <TableRow key={etat.id}>
                  <TableCell className="font-medium">{etat.bien}</TableCell>
                  <TableCell>{etat.locataire}</TableCell>
                  <TableCell>
                    <Badge variant={etat.type === "Entrée" ? "default" : "secondary"}>
                      {etat.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{etat.date}</TableCell>
                  <TableCell>
                    <Badge variant={etat.statut === "Validé" ? "default" : "outline"}>
                      {etat.statut}
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
