// src/routes/diffuseur.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/supabase";

export const Route = createFileRoute("/diffuseur")({
  component: DiffuseurRoute,
  head: () => ({
    meta: [
      { title: "Diffuseurs — AMANYA" },
      {
        name: "description",
        content:
          "Découvrez nos diffuseurs de parfum de haute qualité.",
      },
    ],
  }),
  loader: async () => {
    const perfumes = await getPerfumesByCategory("diffuseur");
    return { perfumes };
  },
  staleTime: 0,        // ← AJOUTE
  shouldReload: true,  // ← AJOUTE
});

function DiffuseurRoute() {
  const { perfumes } = Route.useLoaderData();

  return (
    <PerfumeCatalog
      title="Diffuseurs"
      tagline="Ambiance olfactive"
      description="Parfumez votre espace avec nos diffuseurs de qualité."
      heroImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={perfumes}
    />
  );
}