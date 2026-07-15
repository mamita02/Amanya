// src/routes/homme.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/supabase";

export const Route = createFileRoute("/homme")({
  component: HommeRoute,
  head: () => ({
    meta: [
      { title: "Parfums Homme — AMANYA" },
      {
        name: "description",
        content:
          "Découvrez la collection de parfums Homme AMANYA : authentiques et standards, marques de prestige.",
      },
    ],
  }),
  loader: async () => {
  const perfumes = await getPerfumesByCategory("homme");
  return { perfumes };
},
  staleTime: 0,        // ← AJOUTE
  shouldReload: true,  // ← AJOUTE
});

function HommeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Parfums authentiques homme"
      tagline="Sillage masculin"
      description="Une sélection de parfums authentiques et standards, pensée pour l'homme moderne. Marques de prestige, fragrances longue tenue."
      heroImage="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}