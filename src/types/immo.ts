// Types for the property management platform

export type Bien = {
  id: string;
  titre: string;
  ville: string;
  type: "Apartment" | "House" | "Commercial";
  surface: number;
  loyer: number;
  statut: "Available" | "Rented";
  createdAt: string;
};

export type Bail = {
  id: string;
  bienId: string;
  locataire: string;
  debut: string;
  fin?: string;
  loyer: number;
  depot: number;
  statut: "Active" | "Closed";
};

export type Ticket = {
  id: string;
  titre: string;
  description?: string;
  priorite: "Low" | "Medium" | "High";
  statut: "Open" | "In progress" | "Closed";
  createdAt: string;
};

export type Ecriture = {
  id: string;
  date: string;
  libelle: string;
  debit: number;
  credit: number;
  journal: "Bank" | "Sales" | "Purchases" | "Misc";
};
