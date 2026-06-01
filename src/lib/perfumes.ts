export type Gender = "Homme" | "Femme" | "Unisex";
export type PerfumeType = "Authentique" | "Standard";
export type Volume = 50 | 100;
export type Quantity = 25 | 50 | 100 | 200;

export type Perfume = {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  gender: Gender;
  type: PerfumeType;
  volumes: Volume[];
  minQuantity: Quantity; // quantité minimum de gros
  price: number; // prix unitaire en gros
  family: string;
  badge?: string;
  accent: string;
  image: string;
  category: "homme" | "femme" | "diffuseur";
};

type NamePair = [string, string];
const HOMME_IMAGES = [
  "photo-1594035910387-fea47794261f",
  "photo-1615634260167-c8cdede054de",
  "photo-1592945403244-b3fbafd7f539",
  "photo-1547887537-6158d64c35b3",
  "photo-1523293182086-7651a899d37f",
  "photo-1541643600914-78b084683601",
  "photo-1588405748880-12d1d2a59d75",
  "photo-1610701596007-11502861dcfa",
];

const FEMME_IMAGES = [
  "photo-1541643600914-78b084683601",
  "photo-1592945403244-b3fbafd7f539",
  "photo-1588405748880-12d1d2a59d75",
  "photo-1615634260167-c8cdede054de",
  "photo-1523293182086-7651a899d37f",
  "photo-1594035910387-fea47794261f",
  "photo-1602928298849-325cec8771c0",
  "photo-1610701596007-11502861dcfa",
];

const DIFFUSEUR_IMAGES = [
  "photo-1602928321679-560bb453f190",
  "photo-1602928298849-325cec8771c0",
  "photo-1610701596007-11502861dcfa",
  "photo-1608571423902-eed4a5ad8108",
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&h=1000&fit=crop&auto=format&q=80`;

const HOMME_BRANDS = ["Dior", "Chanel", "Creed", "Tom Ford", "Paco Rabanne", "YSL", "Versace", "Armani", "Hermès", "Jean Paul Gaultier"];
const FEMME_BRANDS = ["Chanel", "Dior", "YSL", "Lancôme", "Narciso", "Tom Ford", "Givenchy", "Guerlain", "Hermès", "Mugler"];

const HOMME_NAMES = [
  ["Oud Royal", "Bois précieux"], ["Sauvage Nuit", "Frais aromatique"], ["Bleu Intense", "Sillage marin"],
  ["Aventus", "Fruité fumé"], ["Black Essence", "Oriental boisé"], ["Invictus Gold", "Sportif frais"],
  ["Ombre Noire", "Cuir profond"], ["Cèdre Atlas", "Boisé sec"], ["Ambre Lumière", "Oriental chaud"],
  ["Vétiver Royal", "Vert élégant"], ["Encens Mystique", "Résineux sacré"], ["Cuir de Russie", "Cuir intense"],
  ["Tabac Noir", "Aromatique fort"], ["Santal d'Or", "Boisé crémeux"], ["Patchouli King", "Terreux"],
  ["Bergamote Vive", "Frais hespéridé"], ["Iris Sombre", "Poudré minéral"], ["Lavande Sauvage", "Aromatique"],
  ["Musc Ardent", "Sensuel"], ["Poivre Noir", "Épicé intense"], ["Eucalyptus Fresh", "Mentholé"],
  ["Citrus Marine", "Aquatique"], ["Néroli Or", "Floral masculin"], ["Cardamome Royale", "Épice noble"],
  ["Cannelle Rouge", "Chaud épicé"], ["Bois Brûlé", "Fumé"], ["Whisky Bois", "Boisé spiritueux"],
  ["Cuir Fauve", "Animal"], ["Tabac & Vanille", "Gourmand"], ["Citron Vert", "Pétillant"],
  ["Cèdre Imperial", "Boisé"], ["Encens Bleu", "Mystique"], ["Oud Saphir", "Précieux"],
  ["Brume Marine", "Iodé"], ["Ambre Sauvage", "Animal chaud"], ["Bois de Gaïac", "Profond"],
  ["Menthe Glaciale", "Frais"], ["Pamplemousse Rosé", "Acidulé"], ["Cyprès Vert", "Aromatique"],
  ["Romarin Noir", "Herbacé"], ["Mousse de Chêne", "Chypré"], ["Géranium Noir", "Floral viril"],
  ["Storax Doré", "Balsamique"], ["Benjoin Sacré", "Résineux"], ["Cumin d'Orient", "Épicé chaud"],
  ["Vanille Cuir", "Gourmand viril"], ["Café Noir", "Torréfié"], ["Cacao Intense", "Gourmand"],
  ["Rhum Vintage", "Spiritueux"], ["Tonka Suprême", "Ambré"],
];

const FEMME_NAMES = [
  ["Rose Velours", "Floral poudré"], ["Vanille Sucrée", "Gourmand chaud"], ["Jasmin Nuit", "Floral blanc"],
  ["Pivoine Aura", "Floral fruité"], ["Musc Blanc", "Sillage doux"], ["Cherry Bloom", "Fruité gourmand"],
  ["Tubéreuse Or", "Floral envoûtant"], ["Iris Poudré", "Élégant"], ["Magnolia Blanc", "Floral frais"],
  ["Fraise Sauvage", "Fruité tendre"], ["Pêche Lune", "Doux gourmand"], ["Litchi Rose", "Exotique"],
  ["Mandarine Givrée", "Hespéridé"], ["Néroli Lumière", "Floral solaire"], ["Cassis Noir", "Fruité"],
  ["Framboise Velours", "Pétillant"], ["Amande Douce", "Gourmand"], ["Caramel Beurre", "Sucré"],
  ["Chocolat Praliné", "Gourmand intense"], ["Coco Vanille", "Tropical"], ["Mangue Lait", "Exotique"],
  ["Bois Rose", "Floral boisé"], ["Cèdre Soyeux", "Boisé féminin"], ["Santal Crème", "Crémeux"],
  ["Patchouli Noir", "Sensuel"], ["Ambre Rouge", "Oriental"], ["Oud Précieux", "Mystique"],
  ["Encens Doré", "Sacré"], ["Myrrhe Royale", "Résineux"], ["Benjoin Vanille", "Doux"],
  ["Lys Blanc", "Pur"], ["Muguet Frais", "Printanier"], ["Violette Sombre", "Poudré"],
  ["Orchidée Noire", "Mystérieux"], ["Freesia Aurore", "Lumineux"], ["Hibiscus Rouge", "Solaire"],
  ["Frangipanier", "Exotique"], ["Pivoine Rose", "Délicat"], ["Camélia Doux", "Floral subtil"],
  ["Mimosa Or", "Solaire"], ["Lilas Tendre", "Romantique"], ["Glycine Bleue", "Aérien"],
  ["Bergamote Sucrée", "Hespéridé"], ["Citron Meringué", "Gourmand frais"], ["Praline Rose", "Gourmand"],
  ["Macaron Vanille", "Sucré"], ["Miel d'Acacia", "Doux"], ["Pomme d'Amour", "Fruité sucré"],
  ["Litchi Pivoine", "Floral fruité"], ["Cerise Noire", "Sensuel gourmand"],
];

const DIFFUSEUR_NAMES = [
  ["Oud Maison", "Ambiance signature", "Boisé"],
  ["Fleur de Coton", "Ambiance douce", "Floral"],
  ["Bois de Santal", "Ambiance chaude", "Boisé"],
  ["Agrumes Frais", "Ambiance énergique", "Hespéridé"],
  ["Vanille Ambrée", "Ambiance gourmande", "Oriental"],
  ["Thé Vert", "Ambiance zen", "Aromatique"],
  ["Lavande Provence", "Ambiance relaxante", "Aromatique"],
];

const FAMILIES_M = ["Boisé & Épicé", "Aromatique", "Boisé Frais", "Chypré", "Oriental", "Aquatique"];
const FAMILIES_F = ["Floral", "Gourmand", "Floral Oriental", "Floral Fruité", "Musqué", "Chypré"];
const ACCENTS_M = ["#2a1a14", "#1a2438", "#16334a", "#2b1810", "#1a1a1a", "#3a2a0e", "#241a10", "#1c2a1c"];
const ACCENTS_F = ["#f4d4d4", "#f0e0d0", "#e8d4e8", "#f6c6c6", "#ece4d8", "#e8a4a4", "#f8e0e8", "#f0d8c8"];

const QTYS: Quantity[] = [25, 50, 100, 200];
const BADGES = [undefined, "Best-seller", "Iconique", "Coup de cœur", "Nouveau", "Édition limitée"];

function buildList(
  category: "homme" | "femme",
  count: number,
  names: [string, string][],
  brands: string[],
  images: string[],
  families: string[],
  accents: string[],
): Perfume[] {
  const out: Perfume[] = [];
  for (let i = 0; i < count; i++) {
    const [name, sub] = names[i % names.length];
    const num = String(i + 1).padStart(2, "0");
    const isAuth = i % 3 !== 0;
    const gender: Gender =
      category === "homme"
        ? i % 7 === 0
          ? "Unisex"
          : "Homme"
        : i % 7 === 0
          ? "Unisex"
          : "Femme";
    out.push({
      id: `${category[0]}${i + 1}`,
      name,
      subtitle: `${sub} | ${num}`,
      brand: brands[i % brands.length],
      gender,
      type: isAuth ? "Authentique" : "Standard",
      volumes: isAuth ? (i % 2 === 0 ? [50, 100] : [100]) : [50],
      minQuantity: QTYS[i % QTYS.length],
      price: isAuth ? 18000 + ((i * 1500) % 25000) : 4500 + ((i * 500) % 5000),
      family: families[i % families.length],
      badge: BADGES[i % BADGES.length],
      accent: accents[i % accents.length],
      image: img(images[i % images.length]),
      category,
    });
  }
  return out;
}

const hommeList = buildList("homme", 50, HOMME_NAMES, HOMME_BRANDS, HOMME_IMAGES, FAMILIES_M, ACCENTS_M);
const femmeList = buildList("femme", 50, FEMME_NAMES, FEMME_BRANDS, FEMME_IMAGES, FAMILIES_F, ACCENTS_F);

const diffuseurList: Perfume[] = DIFFUSEUR_NAMES.map(([name, sub, family], i) => ({
  id: `d${i + 1}`,
  name,
  subtitle: sub,
  brand: ["Maison Berger", "Diptyque", "Jo Malone"][i % 3],
  gender: "Unisex" as Gender,
  type: i % 3 === 0 ? "Standard" : "Authentique",
  volumes: i % 2 === 0 ? [50, 100] : [100] as Volume[],
  minQuantity: QTYS[i % QTYS.length],
  price: i % 3 === 0 ? 8000 : 22000 + i * 2000,
  family,
  badge: i === 0 ? "Best-seller" : undefined,
  accent: ["#2a1810", "#ecdcd0", "#3a2418", "#e8d894"][i % 4],
  image: img(DIFFUSEUR_IMAGES[i % DIFFUSEUR_IMAGES.length]),
  category: "diffuseur" as const,
}));

export const perfumes: Perfume[] = [...hommeList, ...femmeList, ...diffuseurList];

export const getPerfumesByCategory = (cat: Perfume["category"]) =>
  perfumes.filter((p) => p.category === cat);

export const getBrands = (list: Perfume[]) =>
  Array.from(new Set(list.map((p) => p.brand))).sort();

export const ALL_QUANTITIES: Quantity[] = [25, 50, 100, 200];

export const formatFCFA = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;
