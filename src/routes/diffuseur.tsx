import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/perfumes";

export const Route = createFileRoute("/diffuseur")({
  component: () => (
    <PerfumeCatalog
      title="Diffuseur"
      tagline="Ambiance signature"
      description="Habillez vos espaces d'une signature olfactive raffinée. Diffuseurs et bougies parfumées de grandes maisons."
      heroImage="https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={getPerfumesByCategory("diffuseur")}
    />
  ),
  head: () => ({
    meta: [
      { title: "Diffuseurs — AMANYA" },
      { name: "description", content: "Diffuseurs et bougies parfumées AMANYA : signatures olfactives pour la maison." },
    ],
  }),
});
