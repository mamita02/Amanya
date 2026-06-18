// scripts/seed-perfumes.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variables d'environnement manquantes!");
  console.error("URL:", supabaseUrl ? "✅ OK" : "❌ MANQUANTE");
  console.error("KEY:", supabaseKey ? "✅ OK" : "❌ MANQUANTE");
  process.exit(1);
}

console.log("🔗 Connexion Supabase:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// VRAIS PARFUMS AMANYA
// ============================================

interface PerfumeEntry {
  name: string;
  brand: string;
  subtitle: string;
  family: string;
}

const HOMMES: PerfumeEntry[] = [
  { name: "Acqua di Gio", brand: "Giorgio Armani", subtitle: "Eau de Parfum", family: "Aquatique" },
  { name: "Aventus for Men", brand: "Creed", subtitle: "Eau de Parfum", family: "Fruité" },
  { name: "Dior Homme", brand: "Dior", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Dolce Gabbana Light Blue", brand: "Dolce & Gabbana", subtitle: "Eau de Toilette", family: "Aquatique" },
  { name: "Invictus", brand: "Paco Rabanne", subtitle: "Eau de Toilette", family: "Aquatique" },
  { name: "Jean Paul Gaultier", brand: "Jean Paul Gaultier", subtitle: "Le Mâle", family: "Oriental" },
  { name: "Phantom Legion", brand: "Paco Rabanne", subtitle: "Eau de Parfum", family: "Aromatique" },
  { name: "Sauvage", brand: "Dior", subtitle: "Eau de Parfum", family: "Aromatique" },
  { name: "Armani Code", brand: "Giorgio Armani", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Allure Homme Sport", brand: "Chanel", subtitle: "Eau de Toilette", family: "Aromatique" },
  { name: "Yves Saint Laurent", brand: "Yves Saint Laurent", subtitle: "Y Eau de Parfum", family: "Boisé" },
  { name: "1 Million", brand: "Paco Rabanne", subtitle: "Eau de Parfum", family: "Épicé" },
  { name: "Bleu de Chanel", brand: "Chanel", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Boss Hugo Boss", brand: "Hugo Boss", subtitle: "Bottled Eau de Parfum", family: "Aromatique" },
  { name: "Club de Nuit Sillage", brand: "Armaf", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Fahrenheit", brand: "Dior", subtitle: "Eau de Toilette", family: "Aromatique" },
  { name: "Invictus Victory", brand: "Paco Rabanne", subtitle: "Eau de Parfum Extrême", family: "Oriental" },
  { name: "Paco Rabanne", brand: "Paco Rabanne", subtitle: "Pour Homme", family: "Aromatique" },
  { name: "Phantom", brand: "Paco Rabanne", subtitle: "Eau de Toilette", family: "Aromatique" },
  { name: "Pure XS", brand: "Paco Rabanne", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Sauvage Dior", brand: "Dior", subtitle: "Parfum", family: "Aromatique" },
  { name: "Sauvage Elixir", brand: "Dior", subtitle: "Elixir", family: "Épicé" },
  { name: "Scandal Blue", brand: "Jean Paul Gaultier", subtitle: "Eau de Parfum", family: "Aromatique" },
  { name: "Scandal Black", brand: "Jean Paul Gaultier", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Scandal Jean Paul", brand: "Jean Paul Gaultier", subtitle: "Le Scandal", family: "Oriental" },
  { name: "Stronger With You", brand: "Emporio Armani", subtitle: "Eau de Parfum", family: "Oriental" },
];

const FEMMES: PerfumeEntry[] = [
  { name: "Alien", brand: "Thierry Mugler", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Because It's You", brand: "Emporio Armani", subtitle: "Eau de Parfum", family: "Fruité" },
  { name: "Carmina", brand: "Carmina", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Dior Addict", brand: "Dior", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Jo Malone London", brand: "Jo Malone", subtitle: "Eau de Cologne", family: "Floral" },
  { name: "Fame", brand: "Paco Rabanne", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "La Nuit Trésor", brand: "Lancôme", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Miss Dior Chérie", brand: "Dior", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Narciso", brand: "Narciso Rodriguez", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Olympéa", brand: "Paco Rabanne", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "La Vie Est Belle", brand: "Lancôme", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Libre", brand: "Yves Saint Laurent", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Marfa", brand: "Memo Paris", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Paradoxe Prada", brand: "Prada", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Scandal Femme", brand: "Jean Paul Gaultier", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Si Passione", brand: "Giorgio Armani", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Valentino", brand: "Valentino", subtitle: "Donna Eau de Parfum", family: "Floral" },
  { name: "Victoria's Secret Bombshell", brand: "Victoria's Secret", subtitle: "Eau de Parfum", family: "Fruité" },
  { name: "Aventus for Her", brand: "Creed", subtitle: "Eau de Parfum", family: "Fruité" },
  { name: "Coco Mademoiselle", brand: "Chanel", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Dolce Gabbana Devotion", brand: "Dolce & Gabbana", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Dolce Gabbana The One", brand: "Dolce & Gabbana", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Good Girl Gold", brand: "Carolina Herrera", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Hermès Paris", brand: "Hermès", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Fame Paco Rabanne", brand: "Paco Rabanne", subtitle: "Eau de Parfum Collector", family: "Floral" },
  { name: "J'Adore", brand: "Dior", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "My Burberry", brand: "Burberry", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "My Way", brand: "Giorgio Armani", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Nomade Chloé", brand: "Chloé", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Poème", brand: "Lancôme", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Stronger With You Intensely", brand: "Emporio Armani", subtitle: "Eau de Parfum", family: "Oriental" },
];

const UNISEX: PerfumeEntry[] = [
  { name: "Tom Ford Velvet Orchid", brand: "Tom Ford", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "African Leather", brand: "Memo Paris", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Baccarat Rouge 540", brand: "Maison Francis Kurkdjian", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Tom Ford Black Orchid", brand: "Tom Ford", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Tom Ford Vanilla Sex", brand: "Tom Ford", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Angels' Share", brand: "Kilian", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Chanel Paris", brand: "Chanel", subtitle: "Eau de Parfum", family: "Floral" },
  { name: "Indigo Tanzanite", brand: "Indigo", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Xerjoff Accento", brand: "Xerjoff", subtitle: "Eau de Parfum", family: "Fruité" },
  { name: "Xerjoff", brand: "Xerjoff", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Jo Malone", brand: "Jo Malone", subtitle: "Eau de Cologne", family: "Floral" },
  { name: "Kirke", brand: "Tiziana Terenzi", subtitle: "Extrait de Parfum", family: "Fruité" },
  { name: "Lamar Kajar", brand: "Kajal Perfumes", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Mancera Paris", brand: "Mancera", subtitle: "Eau de Parfum", family: "Boisé" },
  { name: "Millésime Impérial", brand: "Creed", subtitle: "Eau de Parfum", family: "Aquatique" },
  { name: "Oud Satin Mood", brand: "Maison Francis Kurkdjian", subtitle: "Eau de Parfum", family: "Oriental" },
  { name: "Rouge Malachite", brand: "Giorgio Armani Privé", subtitle: "Eau de Parfum", family: "Oriental" },
];

const DIFFUSEURS: PerfumeEntry[] = [
  { name: "Diffuseur Vanilla", brand: "AMANYA", subtitle: "Ambiance", family: "Oriental" },
  { name: "Diffuseur Peach", brand: "AMANYA", subtitle: "Ambiance", family: "Fruité" },
  { name: "Diffuseur Chocolate", brand: "AMANYA", subtitle: "Ambiance", family: "Oriental" },
  { name: "Diffuseur Apple Elma", brand: "AMANYA", subtitle: "Ambiance", family: "Fruité" },
  { name: "Diffuseur Lavender", brand: "AMANYA", subtitle: "Ambiance", family: "Aromatique" },
  { name: "Diffuseur Bubble Gum", brand: "AMANYA", subtitle: "Ambiance", family: "Fruité" },
  { name: "Diffuseur Strawberry", brand: "AMANYA", subtitle: "Ambiance", family: "Fruité" },
  { name: "Diffuseur Ocean", brand: "AMANYA", subtitle: "Ambiance", family: "Aquatique" },
  { name: "Diffuseur Snowdrop", brand: "AMANYA", subtitle: "Ambiance", family: "Floral" },
  { name: "Diffuseur Lemon", brand: "AMANYA", subtitle: "Ambiance", family: "Aromatique" },
  { name: "Diffuseur Apple", brand: "AMANYA", subtitle: "Ambiance", family: "Fruité" },
  { name: "Diffuseur Coconut", brand: "AMANYA", subtitle: "Ambiance", family: "Oriental" },
];

const ACCENTS = [
  "#2a1a14", "#1a2438", "#16334a", "#2b1810", "#1a1a1a",
  "#3a2a0e", "#241a10", "#0d1b2a", "#1b1b2f", "#2c1810",
];

// ============================================
// FONCTION DE SEED
// ============================================

async function insertPerfume(
  entry: PerfumeEntry,
  category: "homme" | "femme" | "diffuseur",
  gender: "Homme" | "Femme" | "Unisex",
  price: number,
  minQty: number,
  index: number
): Promise<boolean> {
  const slug = entry.name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const { error } = await supabase.from("parfums").insert([{
    name: entry.name,
    brand: entry.brand,
    subtitle: entry.subtitle,
    price,
    category,
    gender,
    type: "Authentique",
    family: entry.family,
    image: "https://via.placeholder.com/300x400?text=" + encodeURIComponent(entry.name),
    accent: ACCENTS[index % ACCENTS.length],
    volumes: [100],
    min_quantity: minQty,
    is_active: true,
    slug: category === "diffuseur" ? `diffuseur-${slug}` : slug,
  }]);

  if (error) {
    console.error(`  ❌ ${entry.name}: ${error.message}`);
    return false;
  }
  console.log(`  ✅ ${entry.name} — ${entry.brand}`);
  return true;
}

async function seedPerfumes() {
  console.log("🚀 Début du seed des parfums AMANYA...\n");

  let count = 0;
  let errors = 0;

  // ── HOMME (26) — 100ml, 25 pièces min, 20 000 FCFA ──
  console.log("👔 Ajout des parfums HOMME...");
  for (let i = 0; i < HOMMES.length; i++) {
    const ok = await insertPerfume(HOMMES[i], "homme", "Homme", 20000, 25, i);
    ok ? count++ : errors++;
  }

  // ── FEMME (31) — 100ml, 25 pièces min, 20 000 FCFA ──
  console.log("\n👗 Ajout des parfums FEMME...");
  for (let i = 0; i < FEMMES.length; i++) {
    const ok = await insertPerfume(FEMMES[i], "femme", "Femme", 20000, 25, i);
    ok ? count++ : errors++;
  }

  // ── UNISEX → catégorie HOMME (17) — 100ml, 25 pièces min, 20 000 FCFA ──
  console.log("\n🔄 Ajout des parfums UNISEX → catégorie Homme...");
  for (let i = 0; i < UNISEX.length; i++) {
    const ok = await insertPerfume(UNISEX[i], "homme", "Unisex", 20000, 25, i);
    ok ? count++ : errors++;
  }

  // ── UNISEX → catégorie FEMME (17) — 100ml, 25 pièces min, 20 000 FCFA ──
  console.log("\n🔄 Ajout des parfums UNISEX → catégorie Femme...");
  for (let i = 0; i < UNISEX.length; i++) {
    const ok = await insertPerfume(UNISEX[i], "femme", "Unisex", 20000, 25, i);
    ok ? count++ : errors++;
  }

  // ── DIFFUSEURS (12) — 20 pièces min, 3 000 FCFA ──
  console.log("\n🕯️ Ajout des DIFFUSEURS...");
  for (let i = 0; i < DIFFUSEURS.length; i++) {
    const ok = await insertPerfume(DIFFUSEURS[i], "diffuseur", "Unisex", 3000, 20, i);
    ok ? count++ : errors++;
  }

  // ── RÉSUMÉ ──
  console.log("\n" + "═".repeat(60));
  console.log("  ✅ SEED TERMINÉ!");
  console.log(`  📊 Total ajoutés: ${count}`);
  console.log(`  👔 Homme:     ${HOMMES.length}`);
  console.log(`  👗 Femme:     ${FEMMES.length}`);
  console.log(`  🔄 Unisex:    ${UNISEX.length} × 2 = ${UNISEX.length * 2}`);
  console.log(`  🕯️ Diffuseurs: ${DIFFUSEURS.length}`);
  console.log(`  📦 TOTAL:     ${HOMMES.length + FEMMES.length + UNISEX.length * 2 + DIFFUSEURS.length}`);
  if (errors > 0) console.log(`  ❌ Erreurs: ${errors}`);
  console.log("═".repeat(60));
  console.log("\n🎉 Tes parfums AMANYA sont maintenant dans Supabase!");
}

seedPerfumes().catch(console.error);