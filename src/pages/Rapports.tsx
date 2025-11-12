import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenusData = [
  { mois: "Jan", revenus: 12000 },
  { mois: "Fév", revenus: 15000 },
  { mois: "Mar", revenus: 13000 },
  { mois: "Avr", revenus: 16000 },
  { mois: "Mai", revenus: 14000 },
  { mois: "Juin", revenus: 17000 },
];

const retardsData = [
  { mois: "Jan", retards: 2 },
  { mois: "Fév", retards: 1 },
  { mois: "Mar", retards: 3 },
  { mois: "Avr", retards: 1 },
  { mois: "Mai", retards: 2 },
  { mois: "Juin", retards: 0 },
];

const savData = [
  { name: "Ouvert", value: 5 },
  { name: "En cours", value: 8 },
  { name: "Clôturé", value: 15 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function Rapports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Rapports"
        description="Consultez vos statistiques et rapports"
      />

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Statistiques globales</TabsTrigger>
          <TabsTrigger value="revenus">Revenus & loyers</TabsTrigger>
          <TabsTrigger value="retards">Retards & impayés</TabsTrigger>
          <TabsTrigger value="sav">Activité SAV</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total biens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 000€</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tickets SAV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenus">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenus" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retards">
          <Card>
            <CardHeader>
              <CardTitle>Retards de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retardsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="retards" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sav">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des tickets SAV</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={savData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {savData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
