export type Gender = "Homme" | "Femme" | "Unisex";
export type PerfumeType = "Authentique" | "Standard";
export type Volume = 50 | 100;

export type Perfume = {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  gender: Gender;
  type: PerfumeType;
  volumes: Volume[];
  price: number;
  family: string;
  badge?: string;
  accent: string; // hex for card background tint
  image: string;
  category: "homme" | "femme" | "diffuseur";
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&h=1000&fit=crop&auto=format&q=80`;

export const perfumes: Perfume[] = [
  // ===== HOMME =====
  {
    id: "h1", name: "Oud Royal", subtitle: "Bois précieux | 07", brand: "Dior",
    gender: "Homme", type: "Authentique", volumes: [50, 100], price: 95000,
    family: "Boisé & Épicé", badge: "Best-seller", accent: "#2a1a14",
    image: img("photo-1594035910387-fea47794261f"), category: "homme",
  },
  {
    id: "h2", name: "Sauvage Nuit", subtitle: "Frais aromatique | 12", brand: "Dior",
    gender: "Homme", type: "Authentique", volumes: [100], price: 110000,
    family: "Aromatique", badge: "Iconique", accent: "#1a2438",
    image: img("photo-1615634260167-c8cdede054de"), category: "homme",
  },
  {
    id: "h3", name: "Bleu Intense", subtitle: "Sillage marin | 04", brand: "Chanel",
    gender: "Homme", type: "Authentique", volumes: [50, 100], price: 105000,
    family: "Boisé Frais", accent: "#16334a",
    image: img("photo-1592945403244-b3fbafd7f539"), category: "homme",
  },
  {
    id: "h4", name: "Aventus", subtitle: "Fruité fumé | 21", brand: "Creed",
    gender: "Homme", type: "Authentique", volumes: [100], price: 180000,
    family: "Chypré", badge: "Édition limitée", accent: "#2b1810",
    image: img("photo-1547887537-6158d64c35b3"), category: "homme",
  },
  {
    id: "h5", name: "Black Essence", subtitle: "Oriental boisé | 09", brand: "Tom Ford",
    gender: "Homme", type: "Standard", volumes: [50], price: 18000,
    family: "Oriental", accent: "#1a1a1a",
    image: img("photo-1523293182086-7651a899d37f"), category: "homme",
  },
  {
    id: "h6", name: "Invictus Gold", subtitle: "Sportif frais | 03", brand: "Paco Rabanne",
    gender: "Unisex", type: "Standard", volumes: [50], price: 15000,
    family: "Aquatique", accent: "#3a2a0e",
    image: img("photo-1541643600914-78b084683601"), category: "homme",
  },

  // ===== FEMME =====
  {
    id: "f1", name: "Rose Velours", subtitle: "Floral poudré | 18", brand: "Chanel",
    gender: "Femme", type: "Authentique", volumes: [50, 100], price: 120000,
    family: "Floral", badge: "Iconique", accent: "#f4d4d4",
    image: img("photo-1541643600914-78b084683601"), category: "femme",
  },
  {
    id: "f2", name: "Vanille Sucrée", subtitle: "Gourmand chaud | 24", brand: "YSL",
    gender: "Femme", type: "Authentique", volumes: [50, 100], price: 98000,
    family: "Gourmand", badge: "Best-seller", accent: "#f0e0d0",
    image: img("photo-1592945403244-b3fbafd7f539"), category: "femme",
  },
  {
    id: "f3", name: "Jasmin Nuit", subtitle: "Floral blanc | 31", brand: "Dior",
    gender: "Femme", type: "Authentique", volumes: [100], price: 115000,
    family: "Floral Oriental", accent: "#e8d4e8",
    image: img("photo-1588405748880-12d1d2a59d75"), category: "femme",
  },
  {
    id: "f4", name: "Pivoine Aura", subtitle: "Floral fruité | 15", brand: "Lancôme",
    gender: "Femme", type: "Authentique", volumes: [50, 100], price: 88000,
    family: "Floral Fruité", accent: "#f6c6c6",
    image: img("photo-1615634260167-c8cdede054de"), category: "femme",
  },
  {
    id: "f5", name: "Musc Blanc", subtitle: "Sillage doux | 06", brand: "Narciso",
    gender: "Unisex", type: "Authentique", volumes: [50, 100], price: 92000,
    family: "Musqué", badge: "Coup de cœur", accent: "#ece4d8",
    image: img("photo-1523293182086-7651a899d37f"), category: "femme",
  },
  {
    id: "f6", name: "Cherry Bloom", subtitle: "Fruité gourmand | 22", brand: "Tom Ford",
    gender: "Femme", type: "Standard", volumes: [50], price: 17500,
    family: "Gourmand", accent: "#e8a4a4",
    image: img("photo-1588405748880-12d1d2a59d75"), category: "femme",
  },

  // ===== DIFFUSEUR =====
  {
    id: "d1", name: "Oud Maison", subtitle: "Ambiance signature", brand: "Maison Berger",
    gender: "Unisex", type: "Authentique", volumes: [100], price: 45000,
    family: "Boisé", badge: "Best-seller", accent: "#2a1810",
    image: img("photo-1602928321679-560bb453f190"), category: "diffuseur",
  },
  {
    id: "d2", name: "Fleur de Coton", subtitle: "Ambiance douce", brand: "Diptyque",
    gender: "Unisex", type: "Authentique", volumes: [50, 100], price: 52000,
    family: "Floral", accent: "#ecdcd0",
    image: img("photo-1602928298849-325cec8771c0"), category: "diffuseur",
  },
  {
    id: "d3", name: "Bois de Santal", subtitle: "Ambiance chaude", brand: "Jo Malone",
    gender: "Unisex", type: "Authentique", volumes: [100], price: 58000,
    family: "Boisé", accent: "#3a2418",
    image: img("photo-1610701596007-11502861dcfa"), category: "diffuseur",
  },
  {
    id: "d4", name: "Agrumes Frais", subtitle: "Ambiance énergique", brand: "Diptyque",
    gender: "Unisex", type: "Standard", volumes: [50], price: 14000,
    family: "Hespéridé", accent: "#e8d894",
    image: img("photo-1608571423902-eed4a5ad8108"), category: "diffuseur",
  },
];

export const getPerfumesByCategory = (cat: Perfume["category"]) =>
  perfumes.filter((p) => p.category === cat);

export const getBrands = (list: Perfume[]) =>
  Array.from(new Set(list.map((p) => p.brand))).sort();

export const formatFCFA = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;
