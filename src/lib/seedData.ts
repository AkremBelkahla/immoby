import { Bien, Bail, Ticket, Ecriture } from "@/types/immo";

// Demo data to initialize localStorage

const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];
const types: ("Apartment" | "House" | "Commercial")[] = ["Apartment", "House", "Commercial"];
const statuts: ("Available" | "Rented")[] = ["Available", "Rented"];

export const seedBiens: Bien[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: `${types[i % 3]} ${i < 7 ? (i % 4 + 1) + "BR" : i < 14 ? "with garden" : i < 21 ? "Downtown" : i < 35 ? "Sea view" : "Renovated"}`,
  ville: villes[i % villes.length],
  type: types[i % 3],
  surface: 30 + (i * 10) % 150,
  loyer: 500 + (i * 100) % 2500,
  statut: i % 3 === 0 ? statuts[0] : statuts[1],
  createdAt: new Date(2024, (i % 12), i % 28 + 1).toISOString(),
}));

const locataires = [
  "Marie Dupont", "Jean Martin", "Sophie Bernard", "Pierre Durand", "Lucie Petit",
  "Thomas Robert", "Julie Moreau", "Nicolas Simon", "Emma Laurent", "Alexandre Michel",
  "Camille Lefebvre", "Lucas Leroy", "Chloé Garcia", "Hugo Martinez", "Léa Rodriguez",
  "Maxime David", "Sarah Bertrand", "Antoine Thomas", "Manon Dubois", "Julien Fontaine"
];

export const seedBaux: Bail[] = Array.from({ length: 40 }, (_, i) => ({
  id: (i + 1).toString(),
  bienId: seedBiens[i % seedBiens.length].id,
  locataire: locataires[i % locataires.length],
  debut: new Date(2024, (i % 12), 1).toISOString().split('T')[0],
  fin: i % 4 === 0 ? new Date(2025, (i % 12), 1).toISOString().split('T')[0] : undefined,
  loyer: seedBiens[i % seedBiens.length].loyer,
  depot: seedBiens[i % seedBiens.length].loyer * 2,
  statut: i % 4 === 0 ? "Closed" : "Active",
}));

const ticketsTitres = [
  "Bathroom water leak", "Burnt-out bulb in entrance hall", "Boiler breakdown",
  "Paint touch-up", "Front door stuck", "Broken shutters",
  "Electrical issue", "Kitchen tap leak", "Faulty lock",
  "Window won't close", "Radiator not heating", "Smoke detector to replace",
  "Intercom not working", "Broken mailbox", "Clogged gutter",
  "Water infiltration", "Faulty power outlet", "Noisy ventilation",
  "Damaged blind", "Cracked tiles"
];

const ticketsDescriptions = [
  "Urgent intervention needed", "To be replaced quickly",
  "No hot water since this morning", "Refresh the paint",
  "Cannot open", "After the storm", "Circuit breaker keeps tripping",
  "Major leak", "Hard to lock", "Sealing issue",
  "No heating", "Low battery", "No longer rings",
  "Following vandalism", "Standing water", "Damp ceiling",
  "Potential hazard", "Abnormal noise", "Won't go up", "Needs repair"
];

const priorites: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
const statutsTickets: ("Open" | "In progress" | "Closed")[] = ["Open", "In progress", "Closed"];

export const seedTickets: Ticket[] = Array.from({ length: 35 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: ticketsTitres[i % ticketsTitres.length],
  description: ticketsDescriptions[i % ticketsDescriptions.length],
  priorite: priorites[i % 3],
  statut: statutsTickets[i % 3],
  createdAt: new Date(2024, 9, 28 - (i % 28)).toISOString(),
}));

const libelles = [
  "October rent", "November rent", "December rent",
  "Plumbing repair", "Property tax", "Home insurance",
  "Condo fees", "Painting work", "Garden maintenance",
  "Electricity", "Water", "Gas", "Internet", "PNO insurance",
  "Management fees", "Bank charges", "Heating repair",
  "Cleaning", "Property diagnostics", "Agency commission"
];

const journaux: ("Bank" | "Sales" | "Purchases" | "Misc")[] = ["Bank", "Sales", "Purchases", "Misc"];

export const seedEcritures: Ecriture[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  date: new Date(2024, 9, i + 1).toISOString().split('T')[0],
  libelle: `${libelles[i]} - ${locataires[i % locataires.length]}`,
  debit: i % 2 === 0 ? 0 : 200 + (i * 50) % 1500,
  credit: i % 2 === 0 ? 500 + (i * 100) % 2000 : 0,
  journal: journaux[i % 4],
}));
