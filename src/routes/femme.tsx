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
    const perfumes = await getPerfumesByCategory("femme"); // 👈 corrigé de "homme" à "femme"

    // Tri : ceux qui ont 100ml en premier, puis ceux qui n'ont que 50ml
    const sorted = [...perfumes].sort((a, b) => {
      const aHas100 = a.volumes.includes(100);
      const bHas100 = b.volumes.includes(100);
      if (aHas100 && !bHas100) return -1;
      if (!aHas100 && bHas100) return 1;
      return 0;
    });

    return { perfumes: sorted };
  },
  staleTime: 0,
});

function FemmeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Parfums authentiques Femme"
      tagline="Sillage féminin"
      description="Une sélection de parfums authentiques et standards, pensée pour la femme moderne. Marques de prestige, fragrances longue tenue."
      heroImage="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}