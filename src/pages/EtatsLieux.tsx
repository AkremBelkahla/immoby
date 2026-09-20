import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

const mockEtats = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  bien: `Apartment ${(i % 4) + 1}BR`,
  locataire: `Tenant ${i + 1}`,
  type: i % 2 === 0 ? "Check-in" : "Check-out",
  date: new Date(2024, 10, i + 1).toLocaleDateString("en-US"),
  statut: i % 3 === 0 ? "Validated" : "Pending",
}));

export default function EtatsLieux() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inspection reports"
        description="Manage check-in and check-out inspections"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New inspection
          </Button>
        }
      />

      <Card>
        <CardHeader />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEtats.map((etat) => (
                <TableRow key={etat.id}>
                  <TableCell className="font-medium">{etat.bien}</TableCell>
                  <TableCell>{etat.locataire}</TableCell>
                  <TableCell>
                    <Badge variant={etat.type === "Check-in" ? "default" : "secondary"}>
                      {etat.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{etat.date}</TableCell>
                  <TableCell>
                    <Badge variant={etat.statut === "Validated" ? "default" : "outline"}>
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
