import { Bien, Bail, Ticket, Ecriture } from "@/types/immo";

// Données de démonstration pour initialiser localStorage

const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];
const types: ("Appartement" | "Maison" | "Local")[] = ["Appartement", "Maison", "Local"];
const statuts: ("Disponible" | "Loué")[] = ["Disponible", "Loué"];

export const seedBiens: Bien[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: `${types[i % 3]} ${i < 7 ? "T" + (i % 4 + 1) : i < 14 ? "avec jardin" : i < 21 ? "Centre-ville" : i < 35 ? "Vue mer" : "Rénové"}`,
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
  statut: i % 4 === 0 ? "Clos" : "Actif",
}));

const ticketsTitres = [
  "Fuite d'eau salle de bain", "Ampoule grillée hall d'entrée", "Chaudière en panne",
  "Peinture rafraîchissement", "Porte d'entrée bloquée", "Volets cassés",
  "Problème électrique", "Fuite robinet cuisine", "Serrure défectueuse",
  "Fenêtre ne ferme plus", "Radiateur ne chauffe pas", "Détecteur fumée à changer",
  "Interphone HS", "Boîte aux lettres cassée", "Gouttière bouchée",
  "Infiltration d'eau", "Prise électrique défectueuse", "Ventilation bruyante",
  "Store endommagé", "Carrelage fissuré"
];

const ticketsDescriptions = [
  "Intervention urgente nécessaire", "À remplacer rapidement",
  "Plus d'eau chaude depuis ce matin", "Rafraîchir la peinture",
  "Impossible d'ouvrir", "Suite à la tempête", "Disjoncteur qui saute",
  "Fuite importante", "Difficile de fermer à clé", "Problème d'étanchéité",
  "Pas de chauffage", "Batterie faible", "Ne sonne plus",
  "Suite à un vandalisme", "Eau stagnante", "Plafond humide",
  "Potentiel danger", "Bruit anormal", "Ne remonte plus", "Besoin de réparation"
];

const priorites: ("Basse" | "Moyenne" | "Haute")[] = ["Basse", "Moyenne", "Haute"];
const statutsTickets: ("Ouvert" | "En cours" | "Clôturé")[] = ["Ouvert", "En cours", "Clôturé"];

export const seedTickets: Ticket[] = Array.from({ length: 35 }, (_, i) => ({
  id: (i + 1).toString(),
  titre: ticketsTitres[i % ticketsTitres.length],
  description: ticketsDescriptions[i % ticketsDescriptions.length],
  priorite: priorites[i % 3],
  statut: statutsTickets[i % 3],
  createdAt: new Date(2024, 9, 28 - (i % 28)).toISOString(),
}));

const libelles = [
  "Loyer octobre", "Loyer novembre", "Loyer décembre",
  "Réparation plomberie", "Taxe foncière", "Assurance habitation",
  "Charges copropriété", "Travaux peinture", "Entretien jardin",
  "Électricité", "Eau", "Gaz", "Internet", "Assurance PNO",
  "Honoraires gestionnaire", "Frais bancaires", "Réparation chauffage",
  "Nettoyage", "Diagnostic immobilier", "Commission agence"
];

const journaux: ("Banque" | "Ventes" | "Achats" | "OD")[] = ["Banque", "Ventes", "Achats", "OD"];

export const seedEcritures: Ecriture[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  date: new Date(2024, 9, i + 1).toISOString().split('T')[0],
  libelle: `${libelles[i]} - ${locataires[i % locataires.length]}`,
  debit: i % 2 === 0 ? 0 : 200 + (i * 50) % 1500,
  credit: i % 2 === 0 ? 500 + (i * 100) % 2000 : 0,
  journal: journaux[i % 4],
}));
