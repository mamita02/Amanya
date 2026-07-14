// src/routes/femme.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/supabase";

export const Route = createFileRoute("/femme")({
  component: FemmeRoute,
  head: () => ({
    meta: [
      { title: "Parfums Femme — AMANYA" },
      {
        name: "description",
        content:
          "Découvrez la collection de parfums Femme AMANYA : authentiques et standards, marques de prestige.",
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

function FemmeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Parfums authentiques Femme"
      tagline="Sillage féminin"
      description="Une sélection de parfums authentiques et standards, pensée pour la femme moderne. Marques de prestige, fragrances longue tenue."
      heroImage="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}