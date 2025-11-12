import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSpreadsheet } from "lucide-react";

export default function ExportComptable() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Export comptable"
        description="Exportez vos données comptables"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exporter les écritures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Période</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mois en cours</SelectItem>
                  <SelectItem value="quarter">Trimestre en cours</SelectItem>
                  <SelectItem value="year">Année en cours</SelectItem>
                  <SelectItem value="custom">Personnalisée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Format</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Exporter les écritures
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exporter les factures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Type de factures</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="paid">Payées</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="overdue">En retard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Période</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mois en cours</SelectItem>
                  <SelectItem value="quarter">Trimestre en cours</SelectItem>
                  <SelectItem value="year">Année en cours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exporter les factures
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exports récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Écritures_Novembre_2024.csv", "Factures_Q4_2024.xlsx", "Export_Annuel_2024.pdf"].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{file}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
