export type Listing = {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  location: string;
  image: string;
  description: string;
  seller: { name: string; phone: string; avatar: string; verified: boolean; memberSince: string };
  link: string;
  postedAt: string;
  featured?: boolean;
};

const img = (seed: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format`;

export const categories = [
  { slug: "vehicules", name: "Véhicules", icon: "Car", count: 1248 },
  { slug: "immobilier", name: "Immobilier", icon: "Home", count: 892 },
  { slug: "electronique", name: "Électronique", icon: "Smartphone", count: 2104 },
  { slug: "emploi", name: "Emploi", icon: "Briefcase", count: 376 },
  { slug: "mode", name: "Mode", icon: "Shirt", count: 1543 },
  { slug: "maison", name: "Maison & Jardin", icon: "Sofa", count: 689 },
  { slug: "services", name: "Services", icon: "Wrench", count: 421 },
  { slug: "loisirs", name: "Loisirs", icon: "Gamepad2", count: 312 },
];

export const listings: Listing[] = [
  {
    id: "1",
    title: "Toyota RAV4 2020 — Faible kilométrage",
    price: 18500000,
    currency: "FCFA",
    category: "vehicules",
    location: "Dakar, Almadies",
    image: img("1503376780353-7e6692767b70"),
    description: "SUV impeccable, première main, entretien complet à jour. Climatisation, GPS, caméra de recul.",
    seller: { name: "Moussa Diallo", phone: "+221 77 123 45 67", avatar: img("1507003211169-0a1dd7228f2d", 200, 200), verified: true, memberSince: "2022" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 2 jours",
    featured: true,
  },
  {
    id: "2",
    title: "Villa 4 chambres avec piscine — Ngor",
    price: 250000000,
    currency: "FCFA",
    category: "immobilier",
    location: "Dakar, Ngor",
    image: img("1564013799919-ab600027ffc6"),
    description: "Magnifique villa moderne, jardin tropical, piscine, garage 2 voitures, quartier sécurisé.",
    seller: { name: "Aïssatou Sarr", phone: "+221 78 456 78 90", avatar: img("1494790108377-be9c29b29330", 200, 200), verified: true, memberSince: "2021" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 5 heures",
    featured: true,
  },
  {
    id: "3",
    title: "iPhone 15 Pro Max 256Go — Neuf",
    price: 750000,
    currency: "FCFA",
    category: "electronique",
    location: "Dakar, Plateau",
    image: img("1592750475338-74b7b21085ab"),
    description: "iPhone scellé, garantie internationale 1 an. Couleur titane naturel.",
    seller: { name: "Cheikh Ndiaye", phone: "+221 76 234 56 78", avatar: img("1500648767791-00dcc994a43e", 200, 200), verified: false, memberSince: "2023" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 1 jour",
  },
  {
    id: "4",
    title: "MacBook Pro M3 14\" 16Go/512Go",
    price: 1450000,
    currency: "FCFA",
    category: "electronique",
    location: "Dakar, Mermoz",
    image: img("1517336714731-489689fd1ca8"),
    description: "MacBook Pro dernier modèle, sous garantie Apple. Boîte d'origine, accessoires inclus.",
    seller: { name: "Fatou Ba", phone: "+221 77 890 12 34", avatar: img("1438761681033-6461ffad8d80", 200, 200), verified: true, memberSince: "2020" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 3 jours",
  },
  {
    id: "5",
    title: "Appartement F3 meublé — Sacré-Cœur",
    price: 450000,
    currency: "FCFA/mois",
    category: "immobilier",
    location: "Dakar, Sacré-Cœur",
    image: img("1522708323590-d24dbb6b0267"),
    description: "Appartement entièrement meublé, 2 chambres, salon, cuisine équipée, balcon vue dégagée.",
    seller: { name: "Ibrahima Fall", phone: "+221 78 567 89 01", avatar: img("1472099645785-5658abf4ff4e", 200, 200), verified: true, memberSince: "2019" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 6 heures",
  },
  {
    id: "6",
    title: "Mercedes Classe C 2019",
    price: 22000000,
    currency: "FCFA",
    category: "vehicules",
    location: "Dakar, Point E",
    image: img("1618843479313-40f8afb4b4d8"),
    description: "Berline élégante, intérieur cuir, toit ouvrant, 45 000 km, carnet d'entretien complet.",
    seller: { name: "Aminata Diop", phone: "+221 77 345 67 89", avatar: img("1487412720507-e7ab37603c6f", 200, 200), verified: true, memberSince: "2021" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 1 jour",
  },
  {
    id: "7",
    title: "Canapé d'angle en cuir véritable",
    price: 850000,
    currency: "FCFA",
    category: "maison",
    location: "Dakar, Yoff",
    image: img("1555041469-a586c61ea9bc"),
    description: "Canapé 6 places, cuir italien, très bon état, vendu cause déménagement.",
    seller: { name: "Pape Sow", phone: "+221 76 789 01 23", avatar: img("1599566150163-29194dcaad36", 200, 200), verified: false, memberSince: "2023" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 4 jours",
  },
  {
    id: "8",
    title: "Développeur Full-Stack Senior",
    price: 1500000,
    currency: "FCFA/mois",
    category: "emploi",
    location: "Dakar, Plateau",
    image: img("1521737604893-d14cc237f11d"),
    description: "Startup fintech recherche développeur expérimenté React/Node.js. CDI, télétravail partiel.",
    seller: { name: "TechWave SARL", phone: "+221 33 822 33 44", avatar: img("1560179707-f14e90ef3623", 200, 200), verified: true, memberSince: "2020" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 12 heures",
    featured: true,
  },
  {
    id: "9",
    title: "Robe traditionnelle wax cousue main",
    price: 35000,
    currency: "FCFA",
    category: "mode",
    location: "Dakar, HLM",
    image: img("1539109136881-3be0616acf4b"),
    description: "Robe sur-mesure, tissu wax premium, finitions soignées, plusieurs tailles disponibles.",
    seller: { name: "Atelier Khady", phone: "+221 77 901 23 45", avatar: img("1531746020798-e6953c6e8e04", 200, 200), verified: true, memberSince: "2022" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 2 jours",
  },
  {
    id: "10",
    title: "PlayStation 5 + 3 jeux",
    price: 425000,
    currency: "FCFA",
    category: "loisirs",
    location: "Dakar, Liberté 6",
    image: img("1606813907291-d86efa9b94db"),
    description: "Console PS5 standard, 2 manettes, 3 jeux (FIFA 24, GTA V, Spider-Man 2).",
    seller: { name: "Omar Gueye", phone: "+221 78 012 34 56", avatar: img("1463453091185-61582044d556", 200, 200), verified: false, memberSince: "2024" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 8 heures",
  },
  {
    id: "11",
    title: "Cours particuliers de mathématiques",
    price: 15000,
    currency: "FCFA/h",
    category: "services",
    location: "Dakar, Mermoz",
    image: img("1454165804606-c3d57bc86b40"),
    description: "Professeur diplômé, tous niveaux du collège à la terminale. Pédagogie adaptée.",
    seller: { name: "Mamadou Sy", phone: "+221 77 567 89 01", avatar: img("1519085360753-af0119f7cbe7", 200, 200), verified: true, memberSince: "2021" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 1 jour",
  },
  {
    id: "12",
    title: "Hyundai Tucson 2022 — Diesel",
    price: 16500000,
    currency: "FCFA",
    category: "vehicules",
    location: "Dakar, Ouakam",
    image: img("1606664515524-ed2f786a0bd6"),
    description: "SUV familial, 28 000 km, boîte automatique, toutes options. Garantie constructeur.",
    seller: { name: "Khadim Mbaye", phone: "+221 76 678 90 12", avatar: img("1506794778202-cad84cf45f1d", 200, 200), verified: true, memberSince: "2020" },
    link: "https://expat-dakar.com",
    postedAt: "Il y a 3 jours",
  },
];

export const formatPrice = (price: number, currency: string) =>
  `${price.toLocaleString("fr-FR")} ${currency}`;

export const getListing = (id: string) => listings.find((l) => l.id === id);
export const getByCategory = (slug: string) => listings.filter((l) => l.category === slug);
