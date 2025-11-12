// Types pour la plateforme de gestion immobilière

export type Bien = {
  id: string;
  titre: string;
  ville: string;
  type: "Appartement" | "Maison" | "Local";
  surface: number;
  loyer: number;
  statut: "Disponible" | "Loué";
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
  statut: "Actif" | "Clos";
};

export type Ticket = {
  id: string;
  titre: string;
  description?: string;
  priorite: "Basse" | "Moyenne" | "Haute";
  statut: "Ouvert" | "En cours" | "Clôturé";
  createdAt: string;
};

export type Ecriture = {
  id: string;
  date: string;
  libelle: string;
  debit: number;
  credit: number;
  journal: "Banque" | "Ventes" | "Achats" | "OD";
};
