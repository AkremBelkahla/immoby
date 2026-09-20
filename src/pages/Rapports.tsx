import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenusData = [
  { mois: "Jan", revenus: 12000 },
  { mois: "Feb", revenus: 15000 },
  { mois: "Mar", revenus: 13000 },
  { mois: "Apr", revenus: 16000 },
  { mois: "May", revenus: 14000 },
  { mois: "Jun", revenus: 17000 },
];

const retardsData = [
  { mois: "Jan", retards: 2 },
  { mois: "Feb", retards: 1 },
  { mois: "Mar", retards: 3 },
  { mois: "Apr", retards: 1 },
  { mois: "May", retards: 2 },
  { mois: "Jun", retards: 0 },
];

const savData = [
  { name: "Open", value: 5 },
  { name: "In progress", value: 8 },
  { name: "Closed", value: 15 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function Rapports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="View your statistics and reports"
      />

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Global statistics</TabsTrigger>
          <TabsTrigger value="revenus">Revenue & rents</TabsTrigger>
          <TabsTrigger value="retards">Late & unpaid</TabsTrigger>
          <TabsTrigger value="sav">Support activity</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Occupancy rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Monthly revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 000€</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Support tickets</CardTitle>
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
              <CardTitle>Revenue trend</CardTitle>
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
              <CardTitle>Payment delays</CardTitle>
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
              <CardTitle>Support tickets breakdown</CardTitle>
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
