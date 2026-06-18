// lib/test-supabase.ts
// Lance ce fichier pour déboguer: npx ts-node src/lib/test-supabase.ts

import { supabase } from "./supabase";

export async function testSupabaseConnection() {
  console.log("🔍 TEST SUPABASE CONNECTION\n");

  // Test 1: Vérifier les variables d'env
  console.log("1️⃣ Vérification des variables d'environnement:");
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url) {
    console.error("❌ VITE_SUPABASE_URL manquant dans .env.local");
    return;
  }
  if (!key) {
    console.error("❌ VITE_SUPABASE_ANON_KEY manquant dans .env.local");
    return;
  }

  console.log("✅ VITE_SUPABASE_URL présent");
  console.log("✅ VITE_SUPABASE_ANON_KEY présent");

  // Test 2: Connexion à la table parfums
  console.log("\n2️⃣ Test d'accès à la table 'parfums':");
  try {
    const { data, error, count } = await supabase
      .from("parfums")
      .select("*", { count: "exact" })
      .limit(1);

    if (error) {
      console.error("❌ Erreur d'accès:", error.message);
      console.error("Code:", error.code);
      return;
    }

    console.log("✅ Accès à la table réussi");
    console.log(`📊 Total parfums: ${count}`);
  } catch (err) {
    console.error("❌ Exception:", (err as Error).message);
    return;
  }

  // Test 3: Lister les buckets
  console.log("\n3️⃣ Test d'accès au Storage:");
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    if (bucketError) {
      console.error("❌ Erreur buckets:", bucketError.message);
      return;
    }

    const perfumesBucket = buckets?.find((b) => b.name === "parfums");
    if (perfumesBucket) {
      console.log("✅ Bucket 'parfums' trouvé");
      console.log(`   Public: ${perfumesBucket.public}`);
    } else {
      console.error("❌ Bucket 'parfums' non trouvé");
      console.log("Buckets disponibles:", buckets?.map((b) => b.name));
      return;
    }
  } catch (err) {
    console.error("❌ Exception:", (err as Error).message);
    return;
  }

  // Test 4: Lister les fichiers dans le bucket
  console.log("\n4️⃣ Fichiers dans le bucket 'parfums':");
  try {
    const { data: files, error: filesError } = await supabase.storage
      .from("parfums")
      .list("", { limit: 10 });

    if (filesError) {
      console.error("❌ Erreur listing:", filesError.message);
      return;
    }

    if (files && files.length > 0) {
      console.log(`✅ ${files.length} éléments trouvés:`);
      files.forEach((f) => {
        console.log(`   📁 ${f.name}`);
      });
    } else {
      console.log("⚠️ Le bucket est vide");
    }
  } catch (err) {
    console.error("❌ Exception:", (err as Error).message);
    return;
  }

  // Test 5: Essayer de créer un parfum test
  console.log("\n5️⃣ Test de création de parfum:");
  try {
    const { data: newPerfume, error: createError } = await supabase
      .from("parfums")
      .insert([
        {
          name: "TEST PARFUM",
          brand: "TEST",
          subtitle: "Test",
          price: 1000,
          category: "homme",
          gender: "Homme",
          type: "Authentique",
          family: "Oriental",
          image: "https://via.placeholder.com/300x400?text=Test",
          accent: "#000000",
          volumes: [50, 100],
          min_quantity: 25,
          is_active: true,
          slug: "test-parfum",
        },
      ])
      .select()
      .single();

    if (createError) {
      console.error("❌ Erreur création:", createError.message);
      return;
    }

    console.log("✅ Création de test réussie!");
    console.log(`   ID: ${newPerfume?.id}`);

    // Supprimer le test
    const { error: deleteError } = await supabase
      .from("parfums")
      .delete()
      .eq("id", newPerfume?.id);

    if (!deleteError) {
      console.log("✅ Nettoyage du test réussi");
    }
  } catch (err) {
    console.error("❌ Exception:", (err as Error).message);
    return;
  }

  console.log("\n✅ TOUS LES TESTS SONT PASSÉS! 🎉");
  console.log("\nVous pouvez maintenant utiliser le dashboard admin sans problème.");
}

// Exécution
testSupabaseConnection().catch(console.error);