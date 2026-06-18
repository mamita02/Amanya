// scripts/audit-images.ts
// Compare ce qui est en BD avec ce qui existe réellement dans le bucket Supabase Storage.
// Usage: bun run scripts/audit-images.ts
/// <reference types="node" />
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: ".env.local" });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Variables d'env manquantes. Vérifie .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function listFolder(folder: string): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from("parfums")
    .list(folder, { limit: 1000, sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error(`❌ Erreur listing ${folder}:`, error.message);
    return [];
  }
  return (data ?? [])
    .filter((f) => f.id !== null) // exclut les sous-dossiers
    .map((f) => f.name);
}

async function main() {
  console.log("🔍 AUDIT IMAGES AMANYA\n");

  // ===== 1. Lister TOUS les dossiers + fichiers du bucket =====
  console.log("📦 Contenu réel du bucket 'parfums':");
  console.log("─".repeat(60));

  const folders = ["homme", "femme", "diffuseur", "unisex"];
  const bucketFiles = new Map<string, Set<string>>();

  for (const folder of folders) {
    const files = await listFolder(folder);
    bucketFiles.set(folder, new Set(files));
    console.log(`\n  📁 ${folder}/  (${files.length} fichiers)`);
    if (files.length === 0) {
      console.log(`     ⚠️  DOSSIER VIDE OU INEXISTANT`);
    } else {
      files.slice(0, 10).forEach((f) => console.log(`     - ${f}`));
      if (files.length > 10) console.log(`     ... +${files.length - 10} autres`);
    }
  }

  // ===== 2. Récupérer toutes les URLs en BD =====
  console.log("\n\n🗄️  Contenu de la table 'parfums':");
  console.log("─".repeat(60));

  const { data: perfumes, error } = await supabase
    .from("parfums")
    .select("id, brand, name, category, image")
    .eq("is_active", true);

  if (error || !perfumes) {
    console.error("❌ Erreur BD:", error?.message);
    return;
  }

  console.log(`  Total parfums actifs en BD: ${perfumes.length}`);

  // ===== 3. Vérifier chaque URL =====
  const missing: typeof perfumes = [];
  const ok: typeof perfumes = [];

  for (const p of perfumes) {
    // Extraire dossier + nom du fichier de l'URL
    // ex: https://.../parfums/unisex/CHANEL PARIS.jpeg
    const match = p.image.match(/\/parfums\/([^/]+)\/(.+)$/);
    if (!match) {
      missing.push(p);
      continue;
    }
    const [, folder, filename] = match;
    const decodedFilename = decodeURIComponent(filename);

    const folderFiles = bucketFiles.get(folder);
    if (!folderFiles || !folderFiles.has(decodedFilename)) {
      missing.push(p);
    } else {
      ok.push(p);
    }
  }

  // ===== 4. Rapport =====
  console.log("\n\n📊 RÉSULTATS:");
  console.log("─".repeat(60));
  console.log(`  ✅ Images OK:        ${ok.length}`);
  console.log(`  ❌ Images cassées:   ${missing.length}`);

  if (missing.length > 0) {
    console.log("\n\n❌ IMAGES MANQUANTES — détail:");
    console.log("─".repeat(60));

    // Groupe par dossier ciblé
    const byFolder = new Map<string, typeof missing>();
    for (const p of missing) {
      const match = p.image.match(/\/parfums\/([^/]+)\//);
      const folder = match?.[1] ?? "???";
      if (!byFolder.has(folder)) byFolder.set(folder, []);
      byFolder.get(folder)!.push(p);
    }

    for (const [folder, items] of byFolder) {
      console.log(`\n  📁 Cherchait dans /${folder}/ (${items.length} cassées):`);
      for (const p of items) {
        const filename = decodeURIComponent(p.image.split("/").pop() ?? "");
        console.log(`     - [${p.brand}] ${p.name}`);
        console.log(`       fichier attendu: ${filename}`);
      }
    }
  }

  // ===== 5. Suggestions =====
  console.log("\n\n💡 SUGGESTIONS:");
  console.log("─".repeat(60));
  for (const [folder, files] of bucketFiles) {
    if (files.size === 0) {
      console.log(`  ⚠️  Le dossier '${folder}/' est vide ou n'existe pas dans le bucket.`);
    }
  }
}

main().catch(console.error);