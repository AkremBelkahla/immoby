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

  // Charger les données au montage
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

  const bauxActifs = baux.filter((b) => b.statut === "Actif").length;
  const ticketsOuverts = tickets.filter((t) => t.statut !== "Clôturé").length;
  const totalMouvements = ecritures.reduce((sum, e) => sum + e.debit + e.credit, 0);

  // Données pour les graphiques
  const biensParType = [
    { name: "Appartements", value: biens.filter(b => b.type === "Appartement").length },
    { name: "Maisons", value: biens.filter(b => b.type === "Maison").length },
    { name: "Locaux", value: biens.filter(b => b.type === "Local").length },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const loyersParMois = biens.slice(0, 6).map((bien, i) => ({
    mois: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"][i],
    loyer: bien.loyer,
  }));

  const ticketsParStatut = [
    { name: "Ouverts", value: tickets.filter(t => t.statut === "Ouvert").length },
    { name: "En cours", value: tickets.filter(t => t.statut === "En cours").length },
    { name: "Clôturés", value: tickets.filter(t => t.statut === "Clôturé").length },
  ];

  const mouvementsFinanciers = ecritures.slice(0, 7).map((e, i) => ({
    jour: `J${i + 1}`,
    credit: e.credit,
    debit: e.debit,
  }));

  const modules = [
    {
      title: "Biens immobiliers",
      description: "Gérer mes biens",
      icon: Building2,
      href: "/locatif/biens",
      count: biens.length,
    },
    {
      title: "Baux",
      description: "Gérer les contrats",
      icon: FileText,
      href: "/locatif/baux",
      count: baux.length,
    },
    {
      title: "Tickets SAV",
      description: "Suivre les interventions",
      icon: Wrench,
      href: "/sav/tickets",
      count: tickets.length,
    },
    {
      title: "Comptabilité",
      description: "Gérer les écritures",
      icon: Calculator,
      href: "/compta/ecritures",
      count: ecritures.length,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Vue d'ensemble de votre activité immobilière
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi
          title="Biens"
          value={biens.length}
          icon={Building2}
          description="Biens gérés"
        />
        <Kpi
          title="Baux actifs"
          value={bauxActifs}
          icon={FileText}
          description={`${bauxActifs} contrats en cours`}
        />
        <Kpi
          title="Tickets ouverts"
          value={ticketsOuverts}
          icon={Wrench}
          description="Interventions en attente"
        />
        <Kpi
          title="Mouvements"
          value={`${totalMouvements.toLocaleString()}€`}
          icon={Calculator}
          description="Total comptable"
        />
      </div>

      {/* Graphiques */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Statistiques</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des biens</CardTitle>
              <CardDescription>Par type de bien</CardDescription>
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
              <CardTitle>Loyers mensuels</CardTitle>
              <CardDescription>Évolution sur 6 mois</CardDescription>
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
              <CardTitle>Tickets SAV</CardTitle>
              <CardDescription>Répartition par statut</CardDescription>
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
              <CardTitle>Mouvements financiers</CardTitle>
              <CardDescription>Débits et crédits sur 7 jours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mouvementsFinanciers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="credit" fill="hsl(142 76% 36%)" name="Crédit" />
                  <Bar dataKey="debit" fill="hsl(0 84% 60%)" name="Débit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Raccourcis modules */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Accès rapide</h2>
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
                    Accéder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tableaux détaillés */}
      <div className="space-y-6">
        {/* Tableau des biens */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Liste des biens</CardTitle>
              <CardDescription>Gérez tous vos biens immobiliers</CardDescription>
            </div>
            <Link to="/locatif/biens">
              <Button>Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Surface</TableHead>
                  <TableHead>Loyer</TableHead>
                  <TableHead>Statut</TableHead>
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
                            bien.statut === "Loué"
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

        {/* Tableau des tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tickets SAV</CardTitle>
              <CardDescription>Suivez toutes les demandes d'intervention</CardDescription>
            </div>
            <Link to="/sav/tickets">
              <Button>Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
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
                            ticket.priorite === "Haute"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              : ticket.priorite === "Moyenne"
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
