import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Users, Bell, Link2, FileText } from "lucide-react";

export default function Parametres() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        description="Configurez votre application"
      />

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Utilisateurs & rôles
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link2 className="mr-2 h-4 w-4" />
            Intégrations
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Modèles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>Gérez les utilisateurs et leurs rôles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Admin Principal</div>
                    <div className="text-sm text-muted-foreground">admin@immoby.com</div>
                  </div>
                  <Button variant="outline" size="sm">Gérer</Button>
                </div>
                <Button className="w-full">Inviter un utilisateur</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>Configurez vos notifications par email et dans l'app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-tickets">Nouveaux tickets SAV</Label>
                <Switch id="notif-tickets" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-paiements">Paiements reçus</Label>
                <Switch id="notif-paiements" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-retards">Retards de paiement</Label>
                <Switch id="notif-retards" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-echeances">Échéances de baux</Label>
                <Switch id="notif-echeances" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>Connectez vos outils préférés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Google Calendar</div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Synchronisez vos événements avec Google Calendar
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">API REST</div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
                <div className="space-y-2">
                  <Label>Clé API</Label>
                  <Input type="password" placeholder="••••••••••••••••" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de documents</CardTitle>
              <CardDescription>Personnalisez vos modèles de documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Modèle de bail", "Modèle d'état des lieux", "Modèle de quittance", "Modèle de facture"].map((template, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{template}</span>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
