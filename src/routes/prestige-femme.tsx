// src/routes/prestige-femme.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/supabase";

export const Route = createFileRoute("/prestige-femme")({
  component: PrestigeFemmeRoute,
  head: () => ({
    meta: [
      { title: "Prestige Femme — AMANYA" },
      {
        name: "description",
        content:
          "Découvrez la collection Prestige Femme AMANYA : parfums d'exception 50ml, marques de luxe.",
      },
    ],
  }),
  loader: async () => {
    const perfumes = await getPerfumesByCategory("prestige-femme" as any);
    return { perfumes };
  },
  staleTime: 0,
  shouldReload: true,
});

function PrestigeFemmeRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Prestige Femme"
      tagline="Collection d'exception"
      description="Une sélection premium de parfums de luxe en format 50ml. Marques prestigieuses, fragrances rares, quantité minimum 20 pièces."
      heroImage="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}