import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";

const mockPrestataires = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  nom: `Contractor ${i + 1}`,
  specialite: ["Plumbing", "Electrical", "Painting", "Locksmith"][i % 4],
  telephone: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
  email: `contractor${i + 1}@email.com`,
  note: (3 + Math.random() * 2).toFixed(1),
  nbInterventions: Math.floor(Math.random() * 20) + 5,
}));

export default function Prestataires() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contractors"
        description="Manage your service providers"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New contractor
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Interventions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPrestataires.map((prestataire) => (
                <TableRow key={prestataire.id}>
                  <TableCell className="font-medium">{prestataire.nom}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{prestataire.specialite}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{prestataire.telephone}</div>
                      <div className="text-muted-foreground">{prestataire.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {prestataire.note}
                    </div>
                  </TableCell>
                  <TableCell>{prestataire.nbInterventions}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
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
