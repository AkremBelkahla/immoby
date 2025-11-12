import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar } from "lucide-react";

const mockInterventions = Array.from({ length: 12 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: `Intervention ${i + 1}`,
  bien: `Appartement T${(i % 4) + 1}`,
  prestataire: `Prestataire ${(i % 5) + 1}`,
  date: new Date(2024, 10, i + 5).toLocaleDateString("fr-FR"),
  statut: i % 3 === 0 ? "Planifiée" : i % 3 === 1 ? "En cours" : "Terminée",
  cout: Math.floor(Math.random() * 500) + 100,
}));

export default function Interventions() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interventions"
        description="Gérez les interventions techniques"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle intervention
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Prestataire</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Coût</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInterventions.map((intervention) => (
                <TableRow key={intervention.id}>
                  <TableCell className="font-medium">{intervention.titre}</TableCell>
                  <TableCell>{intervention.bien}</TableCell>
                  <TableCell>{intervention.prestataire}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {intervention.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        intervention.statut === "Terminée"
                          ? "default"
                          : intervention.statut === "En cours"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {intervention.statut}
                    </Badge>
                  </TableCell>
                  <TableCell>{intervention.cout} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
