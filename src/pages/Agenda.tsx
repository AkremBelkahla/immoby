import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react";

const echeances = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  bail: `Bail Appartement T${i + 1}`,
  locataire: `Locataire ${i + 1}`,
  date: new Date(2025, i, 15).toLocaleDateString("fr-FR"),
  type: i % 2 === 0 ? "Fin de bail" : "Renouvellement",
}));

const interventions = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  titre: `Intervention ${i + 1}`,
  bien: `Appartement T${(i % 3) + 1}`,
  date: new Date(2024, 11, i + 10).toLocaleDateString("fr-FR"),
  heure: `${10 + i}:00`,
}));

const visites = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  bien: `Appartement T${i + 2}`,
  visiteur: `Prospect ${i + 1}`,
  date: new Date(2024, 11, i + 5).toLocaleDateString("fr-FR"),
  heure: `${14 + i}:00`,
}));

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agenda"
        description="Gérez vos événements et échéances"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        }
      />

      <Tabs defaultValue="calendrier" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendrier">Vue calendrier</TabsTrigger>
          <TabsTrigger value="liste">Liste des événements</TabsTrigger>
        </TabsList>

        <TabsContent value="calendrier">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Événements du jour</h3>
                  <div className="text-sm text-muted-foreground">
                    Aucun événement prévu pour cette date.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="liste">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Échéances de baux
                </h3>
                <div className="space-y-3">
                  {echeances.map((echeance) => (
                    <div key={echeance.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{echeance.bail}</div>
                          <div className="text-sm text-muted-foreground">{echeance.locataire}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={echeance.type === "Fin de bail" ? "destructive" : "default"}>
                          {echeance.type}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{echeance.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Interventions planifiées
                </h3>
                <div className="space-y-3">
                  {interventions.map((intervention) => (
                    <div key={intervention.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{intervention.titre}</div>
                          <div className="text-sm text-muted-foreground">{intervention.bien}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{intervention.date}</div>
                        <div className="text-sm text-muted-foreground">{intervention.heure}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Visites & rendez-vous
                </h3>
                <div className="space-y-3">
                  {visites.map((visite) => (
                    <div key={visite.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{visite.bien}</div>
                          <div className="text-sm text-muted-foreground">{visite.visiteur}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{visite.date}</div>
                        <div className="text-sm text-muted-foreground">{visite.heure}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
