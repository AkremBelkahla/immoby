import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Building2 } from "lucide-react";

const mockProprietaires = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  nom: `Propriétaire ${i + 1}`,
  email: `proprio${i + 1}@email.com`,
  telephone: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
  nbBiens: Math.floor(Math.random() * 5) + 1,
}));

export default function Proprietaires() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Liste des propriétaires"
        description="Gérez vos propriétaires"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau propriétaire
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Nombre de biens</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProprietaires.map((proprio) => (
                <TableRow key={proprio.id}>
                  <TableCell className="font-medium">{proprio.nom}</TableCell>
                  <TableCell>{proprio.email}</TableCell>
                  <TableCell>{proprio.telephone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {proprio.nbBiens}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Voir</Button>
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
