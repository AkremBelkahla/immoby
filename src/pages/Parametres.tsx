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
        title="Settings"
        description="Configure your application"
      />

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users & roles
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link2 className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Main Admin</div>
                    <div className="text-sm text-muted-foreground">admin@immoby.com</div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <Button className="w-full">Invite user</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Configure your email and in-app notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-tickets">New support tickets</Label>
                <Switch id="notif-tickets" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-paiements">Payments received</Label>
                <Switch id="notif-paiements" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-retards">Late payments</Label>
                <Switch id="notif-retards" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-echeances">Lease deadlines</Label>
                <Switch id="notif-echeances" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your favorite tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Google Calendar</div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Sync your events with Google Calendar
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">API REST</div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="space-y-2">
                  <Label>API key</Label>
                  <Input type="password" placeholder="••••••••••••••••" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document templates</CardTitle>
              <CardDescription>Customize your document templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Lease template", "Inspection report template", "Rent receipt template", "Invoice template"].map((template, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{template}</span>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
