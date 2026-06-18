// src/lib/partners.ts
// Source de vérité unique pour les données des partenaires AMANYA.

import autoLogo from "../assets/partners/auto.png";
import bardageLogo from "../assets/partners/bardage.png";
import marimikaLogo from "../assets/partners/marimika.png";
import nayaharmonieLogo from "../assets/partners/Nayaharmonie.png";
import pcnetLogo from "../assets/partners/pcnet.png";
import voyageLogo from "../assets/partners/Voyage.png";

export type Partner = {
  id: string;             // slug pour l'URL
  name: string;
  logo: string;           // import de l'image (screenshot du site)
  domain: string;         // domaine d'activité court
  location: string;       // ville/pays
  url: string;            // site web officiel
  description: string;    // description longue pour la page détail
  featured?: boolean;
  bgColor?: string;
  phone?: string;
  email?: string;
  founded?: string;       // année de fondation (optionnel)
  services?: string[];    // liste de services proposés
};

export const partners: Partner[] = [
  {
    id: "la-clinique-auto",
    name: "La Clinique Auto",
    logo: autoLogo,
    domain: "Automobile",
    location: "France",
    url: "https://lacliniqueauto.fr",
    featured: true,
    description:
      "La Clinique Auto est le spécialiste incontournable de l'entretien et de la remise en état automobile en France. De la mécanique à la carrosserie en passant par la tôlerie, le vitrage et le covering, nos chirurgiens de l'automobile redonnent vie à votre véhicule avec exigence et passion.",
    phone: "+33 1 83 84 97 08",
    email: "lacliniqueauto95@gmail.com",
    services: ["Entretien", "Réparation", "Mécanique", "Carrosserie", "Tôlerie", "Vitrage", "Pare-brise", "Covering"],
  },
  {
    id: "rpi-bardage",
    name: "RPI Bardage",
    logo: bardageLogo,
    domain: "Bardage & Façades",
    location: "France",
    url: "https://rpi-bardage.fr",
    description:
      "RPI est spécialisé dans la réhabilitation de façades et l'isolation thermique par l'extérieur. Nous accompagnons particuliers, copropriétés et professionnels dans la valorisation durable de leurs bâtiments grâce à un savoir-faire reconnu en bardage.",
    services: ["Bardage", "Réhabilitation de façade", "Isolation thermique extérieure", "Étude technique"],
  },
  {
    id: "marimika",
    name: "Marimika",
    logo: marimikaLogo,
    domain: "Mode & Streetwear",
    location: "France",
    url: "https://marimika.fr",
    description:
      "Marimika est une marque de mode contemporaine qui revisite les codes du streetwear avec audace. Découvrez nos collections capsule de vêtements signés, conçues en édition limitée pour celles et ceux qui cultivent un style affirmé.",
    services: ["Hoodies", "T-shirts", "Pantalons", "Accessoires", "Édition limitée"],
  },
  {
    id: "naya-harmonie",
    name: "Naya Harmonie",
    logo: nayaharmonieLogo,
    domain: "Coaching Holistique",
    location: "France & Sénégal",
    url: "https://nayaharmonie.com",
    featured: true,
    description:
      "Naya Harmonie propose un coaching holistique pour aider les femmes à retrouver leur féminité, renforcer leur couple et cultiver la sérénité dans leur relation. Une approche douce, certifiée IPHM, accessible à distance entre la France et le Sénégal.",
    services: ["Coaching individuel", "Coaching de couple", "Premier échange offert", "Accompagnement à distance"],
  },
  {
    id: "pcnet-univers",
    name: "PCNet Univers",
    logo: pcnetLogo,
    domain: "Informatique",
    location: "France",
    url: "https://pcnet-univers.fr",
    description:
      "PCNet Univers est le spécialiste du matériel informatique d'occasion en gros. Tous nos produits sont testés et garantis pour offrir aux revendeurs et professionnels les meilleures marques au meilleur prix.",
    services: ["Ordinateurs portables", "Écrans", "Périphériques", "Vente en gros", "Garantie technique"],
  },
  {
    id: "delwin-voyage",
    name: "Delwin Voyage",
    logo: voyageLogo,
    domain: "Agence de Voyage",
    location: "Sénégal",
    url: "https://delwinvoyage.com",
    featured: true,
    description:
      "Delwin Voyage, votre agence de voyage de confiance basée au Sénégal. Que ce soit pour une excursion locale, un séjour sur-mesure ou une grande évasion, nous concevons des voyages à votre image avec un service personnalisé.",
    phone: "78 680 76 76",
    email: "delwinvoyage@gmail.com",
    services: ["Billetterie", "Séjours sur-mesure", "Excursions", "Voyages organisés", "Visa"],
  },
];

export function getPartner(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}