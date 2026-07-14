import autoLogo from "../assets/partners/auto.png";
import bardageLogo from "../assets/partners/bardage.png";
import marimikaLogo from "../assets/partners/marimika.png";
import nayaharmonieLogo from "../assets/partners/Nayaharmonie.png";
import pcnetLogo from "../assets/partners/pcnet.png";
import voyageLogo from "../assets/partners/Voyage.png";

export type MarketPlace = {
  id: string;
  name: string;
  logo: string;
  category: string;
  kind: "Produits" | "Services";
  domain: string;
  location: string;
  url: string;
  description: string;
  featured?: boolean;
  bgColor?: string;
  phone?: string;
  email?: string;
  services?: string[];
};

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const marketplace: MarketPlace[] = [
  {
    id: "la-clinique-auto",
    name: "La Clinique Auto",
    logo: autoLogo,
    category: "Automobile",
    kind: "Services",
    domain: "Entretien automobile",
    location: "France",
    url: "https://lacliniqueauto.fr",
    featured: true,
    description:
      "Atelier automobile dédié à l'entretien, la réparation et la remise en état de véhicules.",
    phone: "+33 1 83 84 97 08",
    email: "lacliniqueauto95@gmail.com",
    services: ["Entretien", "Réparation", "Carrosserie", "Vitrage"],
  },
  {
    id: "rpi-bardage",
    name: "RPI Bardage",
    logo: bardageLogo,
    category: "Maison & habitat",
    kind: "Services",
    domain: "Bardage & façades",
    location: "France",
    url: "https://rpi-bardage.fr",
    description:
      "Solutions de bardage, façades et isolation thermique pour l'habitat et les espaces professionnels.",
    services: ["Bardage", "Façades", "Isolation", "Étude technique"],
  },
  {
    id: "marimika",
    name: "Marimika",
    logo: marimikaLogo,
    category: "Mode & accessoires",
    kind: "Produits",
    domain: "Mode & streetwear",
    location: "France",
    url: "https://marimika.fr",
    description:
      "Des collections streetwear contemporaines, audacieuses et pensées pour un style affirmé.",
    services: ["Hoodies", "T-shirts", "Accessoires"],
  },
  {
    id: "naya-harmonie",
    name: "Naya Harmonie",
    logo: nayaharmonieLogo,
    category: "Bien-être & beauté",
    kind: "Services",
    domain: "Coaching holistique",
    location: "France & Sénégal",
    url: "https://nayaharmonie.com",
    featured: true,
    description:
      "Un accompagnement holistique dédié au bien-être, à l'équilibre personnel et aux relations.",
    services: ["Coaching individuel", "Coaching de couple", "À distance"],
  },
  {
    id: "pcnet-univers",
    name: "PCNet Univers",
    logo: pcnetLogo,
    category: "Technologie",
    kind: "Produits",
    domain: "Informatique",
    location: "France",
    url: "https://pcnet-univers.fr",
    description:
      "Matériel informatique testé et garanti pour les professionnels, revendeurs et particuliers.",
    services: ["Ordinateurs", "Écrans", "Périphériques"],
  },
  {
    id: "delwin-voyage",
    name: "Delwin Voyage",
    logo: voyageLogo,
    category: "Voyage & loisirs",
    kind: "Services",
    domain: "Agence de voyage",
    location: "Sénégal",
    url: "https://delwinvoyage.com",
    featured: true,
    description:
      "Des voyages, séjours et excursions conçus sur mesure pour découvrir le monde sereinement.",
    phone: "78 680 76 76",
    email: "delwinvoyage@gmail.com",
    services: ["Billetterie", "Excursions", "Visa"],
  },
  {
    id: "alibaba",
    name: "Alibaba",
    logo: image("photo-1556742049-0cfed4f6a45d"),
    category: "Commerce & grossiste",
    kind: "Produits",
    domain: "Marketplace B2B",
    location: "International",
    url: "https://www.alibaba.com",
    description:
      "Marketplace internationale pour l'approvisionnement de produits, équipements et matières premières.",
    services: ["Grossiste", "Sourcing", "Import"],
  },
  {
    id: "auchan",
    name: "Auchan",
    logo: image("photo-1542838132-92c53300491e"),
    category: "Alimentation & épicerie",
    kind: "Produits",
    domain: "Grande distribution",
    location: "Sénégal",
    url: "https://www.auchan.sn",
    description:
      "Une sélection de produits alimentaires, d'hygiène et du quotidien pour toute la famille.",
    services: ["Épicerie", "Frais", "Maison"],
  },
  {
    id: "sunu-marche",
    name: "Sunu Marché",
    logo: image("photo-1488459716781-31db52582fe9"),
    category: "Alimentation & épicerie",
    kind: "Produits",
    domain: "Produits locaux",
    location: "Dakar",
    url: "#",
    description:
      "Des produits frais et des spécialités locales sélectionnés auprès de producteurs engagés.",
    services: ["Fruits & légumes", "Épicerie", "Livraison"],
  },
  {
    id: "teranga-fraicheur",
    name: "Teranga Fraîcheur",
    logo: image("photo-1540420773420-3366772f4999"),
    category: "Alimentation & épicerie",
    kind: "Produits",
    domain: "Frais & surgelés",
    location: "Dakar",
    url: "#",
    description: "Un assortiment de produits frais et surgelés pour les cuisines du quotidien.",
    services: ["Frais", "Surgelés", "Boissons"],
  },
  {
    id: "baobab-bio",
    name: "Baobab Bio",
    logo: image("photo-1543362906-acfc16c67564"),
    category: "Bien-être & beauté",
    kind: "Produits",
    domain: "Cosmétiques naturels",
    location: "Sénégal",
    url: "#",
    description:
      "Soins inspirés des richesses végétales africaines, formulés pour les rituels de beauté.",
    services: ["Huiles", "Soins corps", "Cheveux"],
  },
  {
    id: "maison-dakar",
    name: "Maison Dakar",
    logo: image("photo-1618220179428-22790b461013"),
    category: "Maison & habitat",
    kind: "Produits",
    domain: "Décoration intérieure",
    location: "Dakar",
    url: "#",
    description: "Mobilier, luminaires et objets décoratifs pour imaginer un intérieur chaleureux.",
    services: ["Mobilier", "Déco", "Luminaires"],
  },
  {
    id: "senegal-deco",
    name: "Sénégal Déco",
    logo: image("photo-1600210492486-724fe5c67fb0"),
    category: "Maison & habitat",
    kind: "Produits",
    domain: "Aménagement maison",
    location: "Thiès",
    url: "#",
    description: "Des essentiels maison pour aménager, équiper et personnaliser chaque pièce.",
    services: ["Textile", "Rangement", "Cuisine"],
  },
  {
    id: "keur-textile",
    name: "Keur Textile",
    logo: image("photo-1523779917675-b6ed3a42a561"),
    category: "Mode & accessoires",
    kind: "Produits",
    domain: "Textile africain",
    location: "Dakar",
    url: "#",
    description: "Des tissus, vêtements et accessoires inspirés de motifs et savoir-faire locaux.",
    services: ["Tissus", "Prêt-à-porter", "Accessoires"],
  },
  {
    id: "afro-chic",
    name: "Afro Chic",
    logo: image("photo-1529139574466-a303027c1d8b"),
    category: "Mode & accessoires",
    kind: "Produits",
    domain: "Mode féminine",
    location: "Abidjan",
    url: "#",
    description: "Une mode contemporaine et colorée, pensée pour accompagner tous les styles.",
    services: ["Robes", "Sacs", "Bijoux"],
  },
  {
    id: "techno-dakar",
    name: "Techno Dakar",
    logo: image("photo-1517336714731-489689fd1ca8"),
    category: "Technologie",
    kind: "Produits",
    domain: "Électronique",
    location: "Dakar",
    url: "#",
    description:
      "Équipements électroniques, accessoires connectés et solutions numériques du quotidien.",
    services: ["Smartphones", "Audio", "Accessoires"],
  },
  {
    id: "digital-plus",
    name: "Digital Plus",
    logo: image("photo-1518770660439-4636190af475"),
    category: "Technologie",
    kind: "Services",
    domain: "Services numériques",
    location: "Dakar",
    url: "#",
    description:
      "Accompagnement digital pour les entreprises : outils, présence en ligne et support.",
    services: ["Sites web", "Communication", "Support"],
  },
  {
    id: "eco-mobile",
    name: "Eco Mobile",
    logo: image("photo-1511707171634-5f897ff02aa9"),
    category: "Technologie",
    kind: "Produits",
    domain: "Téléphonie reconditionnée",
    location: "Dakar",
    url: "#",
    description:
      "Une sélection de téléphones et accessoires reconditionnés avec une démarche responsable.",
    services: ["Téléphones", "Tablettes", "Réparation"],
  },
  {
    id: "pharma-soleil",
    name: "Pharma Soleil",
    logo: image("photo-1584308666744-24d5c474f2ae"),
    category: "Santé & bien-être",
    kind: "Produits",
    domain: "Parapharmacie",
    location: "Dakar",
    url: "#",
    description: "Produits de soin, bien-être et hygiène pour accompagner les gestes essentiels.",
    services: ["Hygiène", "Soins", "Bien-être"],
  },
  {
    id: "beaute-ndar",
    name: "Beauté Ndar",
    logo: image("photo-1596462502278-27bfdc403348"),
    category: "Bien-être & beauté",
    kind: "Produits",
    domain: "Maquillage & soins",
    location: "Saint-Louis",
    url: "#",
    description: "Des produits de maquillage et soins visage pour sublimer toutes les beautés.",
    services: ["Maquillage", "Visage", "Parfums"],
  },
  {
    id: "nafas-cosmetiques",
    name: "Nafas Cosmétiques",
    logo: image("photo-1556228720-195a672e8a03"),
    category: "Bien-être & beauté",
    kind: "Produits",
    domain: "Soins naturels",
    location: "Dakar",
    url: "#",
    description: "Une collection de soins naturels dédiée au visage, au corps et aux cheveux.",
    services: ["Savons", "Huiles", "Soins cheveux"],
  },
  {
    id: "sama-sante",
    name: "Sama Santé",
    logo: image("photo-1505751172876-fa1923c5c528"),
    category: "Santé & bien-être",
    kind: "Services",
    domain: "Prévention santé",
    location: "Dakar",
    url: "#",
    description:
      "Des services de prévention et d'accompagnement santé accessibles et personnalisés.",
    services: ["Conseil", "Prévention", "Suivi"],
  },
  {
    id: "atelier-niani",
    name: "Atelier Niani",
    logo: image("photo-1452860606245-08befc0ff44b"),
    category: "Artisanat & cadeaux",
    kind: "Produits",
    domain: "Création artisanale",
    location: "Thiès",
    url: "#",
    description:
      "Des pièces artisanales et cadeaux inspirés des matières, couleurs et histoires locales.",
    services: ["Objets déco", "Cadeaux", "Sur mesure"],
  },
  {
    id: "batir-senegal",
    name: "Bâtir Sénégal",
    logo: image("photo-1503387762-592deb58ef4e"),
    category: "Maison & habitat",
    kind: "Services",
    domain: "Construction",
    location: "Dakar",
    url: "#",
    description:
      "Conseil et solutions pour les projets de construction, rénovation et aménagement.",
    services: ["Construction", "Rénovation", "Conseil"],
  },
  {
    id: "logis-pro",
    name: "Logis Pro",
    logo: image("photo-1560185008-b033106af5c3"),
    category: "Maison & habitat",
    kind: "Services",
    domain: "Immobilier & habitat",
    location: "Dakar",
    url: "#",
    description:
      "Un accompagnement pour aménager, équiper et valoriser les espaces de vie et de travail.",
    services: ["Aménagement", "Conseil", "Équipement"],
  },
  {
    id: "dakar-express",
    name: "Dakar Express",
    logo: image("photo-1494412651409-8963ce7935a7"),
    category: "Services professionnels",
    kind: "Services",
    domain: "Logistique",
    location: "Dakar",
    url: "#",
    description:
      "Des solutions de livraison et de logistique pour simplifier les échanges au quotidien.",
    services: ["Livraison", "Courses", "Transport"],
  },
  {
    id: "sunu-livraison",
    name: "Sunu Livraison",
    logo: image("photo-1553413077-190dd305871c"),
    category: "Services professionnels",
    kind: "Services",
    domain: "Livraison urbaine",
    location: "Dakar",
    url: "#",
    description:
      "Un service de livraison urbaine pensé pour les particuliers comme les professionnels.",
    services: ["Express", "Dernier kilomètre", "Collecte"],
  },
  {
    id: "teranga-travel",
    name: "Teranga Travel",
    logo: image("photo-1500530855697-b586d89ba3ee"),
    category: "Voyage & loisirs",
    kind: "Services",
    domain: "Séjours & découvertes",
    location: "Sénégal",
    url: "#",
    description:
      "Des expériences de voyage et de découverte conçues autour du Sénégal et de l'Afrique de l'Ouest.",
    services: ["Circuits", "Hébergements", "Excursions"],
  },
  {
    id: "horizon-afrique",
    name: "Horizon Afrique",
    logo: image("photo-1530789253388-582c481c54b0"),
    category: "Voyage & loisirs",
    kind: "Services",
    domain: "Tourisme",
    location: "International",
    url: "#",
    description:
      "Organisation de voyages, séjours et expériences culturelles sur le continent africain.",
    services: ["Voyages", "Billetterie", "Assistance"],
  },
  {
    id: "auto-service-dakar",
    name: "Auto Service Dakar",
    logo: image("photo-1503376780353-7e6692767b70"),
    category: "Automobile",
    kind: "Services",
    domain: "Garage & entretien",
    location: "Dakar",
    url: "#",
    description:
      "Entretien courant, diagnostic et services automobiles pour rouler en toute sérénité.",
    services: ["Diagnostic", "Pneus", "Révision"],
  },
];

const marketplacePrices: Record<string, number> = {
  "la-clinique-auto": 75000,
  "rpi-bardage": 95000,
  marimika: 45000,
  "naya-harmonie": 60000,
  "pcnet-univers": 85000,
  "delwin-voyage": 120000,
};

export function getMarketplacePrice(id: string): number {
  if (marketplacePrices[id]) return marketplacePrices[id];
  const seed = [...id].reduce((total, character) => total + character.charCodeAt(0), 0);
  return 25000 + (seed % 20) * 5000;
}

export function getMarketplace(id: string): MarketPlace | undefined {
  return marketplace.find((partner) => partner.id === id);
}
