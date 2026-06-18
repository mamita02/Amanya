// src/routes/femme.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByGender } from "../lib/supabase";

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
    const perfumes = await getPerfumesByGender("Femme", "femme");
    return { perfumes };
  },
  staleTime: 0,        // ← AJOUTE
  shouldReload: true,  // ← AJOUTE
});

function FemmeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Femme"
      tagline="Sillage féminin"
      description="Une sélection de parfums authentiques et standards, pensée pour la femme moderne. Marques de prestige, fragrances longue tenue."
      heroImage="https://images.unsplash.com/photo-1585286160633-f7b2f8d9ae3f?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}