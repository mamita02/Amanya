// src/routes/prestige-homme.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/supabase";

export const Route = createFileRoute("/prestige-homme")({
  component: PrestigeHommeRoute,
  head: () => ({
    meta: [
      { title: "Prestige Homme — AMANYA" },
      {
        name: "description",
        content:
          "Découvrez la collection Prestige Homme AMANYA : parfums d'exception 50ml, marques de luxe.",
      },
    ],
  }),
  loader: async () => {
    const perfumes = await getPerfumesByCategory("prestige-homme" as any);
    return { perfumes };
  },
  staleTime: 0,
  shouldReload: true,
});

function PrestigeHommeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Prestige Homme"
      tagline="Collection d'exception"
      description="Une sélection premium de parfums de luxe en format 50ml. Marques prestigieuses, fragrances rares, quantité minimum 20 pièces."
      heroImage="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}