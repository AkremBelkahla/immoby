import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Download } from "lucide-react";

const mockDocs = {
  baux: Array.from({ length: 5 }, (_, i) => ({ id: i, nom: `Bail_${i + 1}.pdf`, date: "15/11/2024" })),
  etats: Array.from({ length: 4 }, (_, i) => ({ id: i, nom: `EDL_${i + 1}.pdf`, date: "10/11/2024" })),
  factures: Array.from({ length: 6 }, (_, i) => ({ id: i, nom: `Facture_${i + 1}.pdf`, date: "20/11/2024" })),
  autres: Array.from({ length: 3 }, (_, i) => ({ id: i, nom: `Document_${i + 1}.pdf`, date: "05/11/2024" })),
};

export default function Documents() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Gérez tous vos documents"
        actions={
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Importer un document
          </Button>
        }
      />

      <Tabs defaultValue="baux" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="baux">Baux & annexes</TabsTrigger>
          <TabsTrigger value="etats">États des lieux</TabsTrigger>
          <TabsTrigger value="factures">Factures</TabsTrigger>
          <TabsTrigger value="autres">Autres</TabsTrigger>
        </TabsList>

        {Object.entries(mockDocs).map(([key, docs]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {docs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{doc.nom}</div>
                          <div className="text-sm text-muted-foreground">{doc.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
