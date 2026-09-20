import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Building2 } from "lucide-react";

const mockProprietaires = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  nom: `Owner ${i + 1}`,
  email: `owner${i + 1}@email.com`,
  telephone: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
  nbBiens: Math.floor(Math.random() * 5) + 1,
}));

export default function Proprietaires() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Owners list"
        description="Manage your property owners"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New owner
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Number of properties</TableHead>
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
