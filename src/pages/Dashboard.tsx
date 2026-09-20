import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Kpi } from "@/components/Kpi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Wrench, Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";
import logo from "@/assets/logo.png";
import { Bien, Bail, Ticket, Ecriture } from "@/types/immo";
import { getItem } from "@/lib/storage";
import { seedBiens, seedBaux, seedTickets, seedEcritures } from "@/lib/seedData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [baux, setBaux] = useState<Bail[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ecritures, setEcritures] = useState<Ecriture[]>([]);
  const [biensPage, setBiensPage] = useState(1);
  const [ticketsPage, setTicketsPage] = useState(1);
  const itemsPerPage = 10;

  // Load data on mount
  useEffect(() => {
    const loadedBiens = getItem<Bien[]>("immo:biens") || seedBiens;
    const loadedBaux = getItem<Bail[]>("immo:baux") || seedBaux;
    const loadedTickets = getItem<Ticket[]>("immo:tickets") || seedTickets;
    const loadedEcritures = getItem<Ecriture[]>("immo:ecritures") || seedEcritures;

    setBiens(loadedBiens);
    setBaux(loadedBaux);
    setTickets(loadedTickets);
    setEcritures(loadedEcritures);
  }, []);

  const bauxActifs = baux.filter((b) => b.statut === "Active").length;
  const ticketsOuverts = tickets.filter((t) => t.statut !== "Closed").length;
  const totalMouvements = ecritures.reduce((sum, e) => sum + e.debit + e.credit, 0);

  // Chart data
  const biensParType = [
    { name: "Apartments", value: biens.filter(b => b.type === "Apartment").length },
    { name: "Houses", value: biens.filter(b => b.type === "House").length },
    { name: "Commercial", value: biens.filter(b => b.type === "Commercial").length },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const loyersParMois = biens.slice(0, 6).map((bien, i) => ({
    mois: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
    loyer: bien.loyer,
  }));

  const ticketsParStatut = [
    { name: "Open", value: tickets.filter(t => t.statut === "Open").length },
    { name: "In progress", value: tickets.filter(t => t.statut === "In progress").length },
    { name: "Closed", value: tickets.filter(t => t.statut === "Closed").length },
  ];

  const mouvementsFinanciers = ecritures.slice(0, 7).map((e, i) => ({
    jour: `J${i + 1}`,
    credit: e.credit,
    debit: e.debit,
  }));

  const modules = [
    {
      title: "Properties",
      description: "Manage my properties",
      icon: Building2,
      href: "/locatif/biens",
      count: biens.length,
    },
    {
      title: "Leases",
      description: "Manage contracts",
      icon: FileText,
      href: "/locatif/baux",
      count: baux.length,
    },
    {
      title: "Support tickets",
      description: "Track interventions",
      icon: Wrench,
      href: "/sav/tickets",
      count: tickets.length,
    },
    {
      title: "Accounting",
      description: "Manage entries",
      icon: Calculator,
      href: "/compta/ecritures",
      count: ecritures.length,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your real estate activity
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi
          title="Properties"
          value={biens.length}
          icon={Building2}
          description="Managed properties"
        />
        <Kpi
          title="Active leases"
          value={bauxActifs}
          icon={FileText}
          description={`${bauxActifs} ongoing contracts`}
        />
        <Kpi
          title="Open tickets"
          value={ticketsOuverts}
          icon={Wrench}
          description="Pending interventions"
        />
        <Kpi
          title="Transactions"
          value={`${totalMouvements.toLocaleString()}€`}
          icon={Calculator}
          description="Accounting total"
        />
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Property breakdown</CardTitle>
              <CardDescription>By property type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={biensParType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {biensParType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly rents</CardTitle>
              <CardDescription>6-month trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={loyersParMois}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loyer" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support tickets</CardTitle>
              <CardDescription>Breakdown by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ticketsParStatut}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial transactions</CardTitle>
              <CardDescription>Debits and credits over 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mouvementsFinanciers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="credit" fill="hsl(142 76% 36%)" name="Credit" />
                  <Bar dataKey="debit" fill="hsl(0 84% 60%)" name="Debit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Module shortcuts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <Card key={module.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <module.icon className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold">{module.count}</span>
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={module.href}>
                  <Button variant="outline" className="w-full">
                    Open
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed tables */}
      <div className="space-y-6">
        {/* Properties table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Properties list</CardTitle>
              <CardDescription>Manage all your real estate properties</CardDescription>
            </div>
            <Link to="/locatif/biens">
              <Button>View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biens
                  .slice((biensPage - 1) * itemsPerPage, biensPage * itemsPerPage)
                  .map((bien) => (
                    <TableRow key={bien.id}>
                      <TableCell className="font-medium">{bien.titre}</TableCell>
                      <TableCell>{bien.type}</TableCell>
                      <TableCell>{bien.ville}</TableCell>
                      <TableCell>{bien.surface} m²</TableCell>
                      <TableCell>{bien.loyer}€</TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            bien.statut === "Rented"
                              ? "bg-primary/10 text-primary"
                              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          }`}
                        >
                          {bien.statut}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {biens.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setBiensPage(Math.max(1, biensPage - 1))}
                        className={biensPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(biens.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setBiensPage(page)}
                          isActive={page === biensPage}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setBiensPage(Math.min(Math.ceil(biens.length / itemsPerPage), biensPage + 1))}
                        className={biensPage === Math.ceil(biens.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tickets table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Support tickets</CardTitle>
              <CardDescription>Track all intervention requests</CardDescription>
            </div>
            <Link to="/sav/tickets">
              <Button>View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets
                  .slice((ticketsPage - 1) * itemsPerPage, ticketsPage * itemsPerPage)
                  .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.titre}</TableCell>
                      <TableCell className="max-w-xs truncate">{ticket.description}</TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            ticket.priorite === "High"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              : ticket.priorite === "Medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {ticket.priorite}
                        </span>
                      </TableCell>
                      <TableCell>{ticket.statut}</TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {tickets.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setTicketsPage(Math.max(1, ticketsPage - 1))}
                        className={ticketsPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(tickets.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setTicketsPage(page)}
                          isActive={page === ticketsPage}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setTicketsPage(Math.min(Math.ceil(tickets.length / itemsPerPage), ticketsPage + 1))}
                        className={ticketsPage === Math.ceil(tickets.length / itemsPerPage) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <BackToTop />
    </div>
  );
}
