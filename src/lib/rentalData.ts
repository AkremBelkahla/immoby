import home1 from "@/assets/home1.jpg";
import home2 from "@/assets/home2.jpg";
import home3 from "@/assets/home3.jpg";
import home4 from "@/assets/home4.jpg";
import home5 from "@/assets/home5.jpg";
import emptyRoom1 from "@/assets/empty-room1.jpg";
import emptyRoom2 from "@/assets/empty-room2.jpg";
import emptyRoom3 from "@/assets/empty-room3.jpg";
import emptyRoom4 from "@/assets/empty-room4.jpg";
import homeDesign2 from "@/assets/home-design2.jpg";
import homeDesign3 from "@/assets/home-design3.jpg";
import homeDesign4 from "@/assets/home-design4.jpg";
import homeDesign5 from "@/assets/home-design5.jpg";
import house1 from "@/assets/house1.jpg";

export type BienLocation = {
  id: string;
  titre: string;
  ville: string;
  type: "Apartment" | "House" | "Commercial";
  surface: number;
  loyer: number;
  beds: number;
  baths: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
};

export const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];

const galleryPool = [home1, home2, home3, home4, home5, emptyRoom1, emptyRoom2, emptyRoom3, emptyRoom4, homeDesign2, homeDesign3, homeDesign4, homeDesign5, house1];

const amenitiesPool = [
  "Air conditioning",
  "Balcony",
  "Private parking",
  "Elevator",
  "Furnished",
  "Fiber optic internet",
  "Cellar",
  "Garden access",
  "Double glazing",
  "Security door",
];

const typeDescriptions: Record<BienLocation["type"], string> = {
  Apartment: "Bright and well laid out, this apartment offers comfortable living spaces close to shops and public transport.",
  House: "This spacious house features generous volumes, plenty of natural light, and a quiet environment ideal for families.",
  Commercial: "Ideally located on a busy street, this commercial space offers excellent visibility and flexible layout options.",
};

export const rentalProperties: BienLocation[] = Array.from({ length: 30 }, (_, i) => {
  const type = i % 3 === 0 ? "Apartment" : i % 3 === 1 ? "House" : "Commercial";
  const ville = villes[i % villes.length];
  const surface = 30 + ((i * 15) % 150);
  const beds = type === "Commercial" ? 0 : (i % 4) + 1;
  const baths = Math.max(1, (i % 3));
  const images = [
    galleryPool[i % galleryPool.length],
    galleryPool[(i + 5) % galleryPool.length],
    galleryPool[(i + 9) % galleryPool.length],
    galleryPool[(i + 12) % galleryPool.length],
  ];
  const amenities = amenitiesPool.filter((_, j) => (i + j) % 2 === 0).slice(0, 6);

  return {
    id: (i + 1).toString(),
    titre: `${type} ${i < 10 ? (i % 5) + 1 + "BR" : i < 20 ? "with terrace" : "Downtown"}`,
    ville,
    type,
    surface,
    loyer: 500 + ((i * 120) % 2500),
    beds,
    baths,
    image: images[0],
    images,
    description: `${typeDescriptions[type]} Located in ${ville}, this ${surface} m² property is available now and managed through Immoby for a smooth, fully tracked rental experience.`,
    amenities,
  };
});

export function getRentalProperty(id: string | undefined): BienLocation | undefined {
  return rentalProperties.find((b) => b.id === id);
}
