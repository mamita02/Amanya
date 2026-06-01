import { createFileRoute } from "@tanstack/react-router";
import { PerfumeCatalog } from "../components/PerfumeCatalog";
import { getPerfumesByCategory } from "../lib/perfumes";

export const Route = createFileRoute("/femme")({
  component: () => (
    <PerfumeCatalog
      title="Femme"
      tagline="Sillage féminin"
      description="Floraux poudrés, gourmands chaleureux, musqués envoûtants. Une collection raffinée de parfums féminins authentiques et standards."
      heroImage="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&h=900&fit=crop&auto=format&q=80"
      perfumes={getPerfumesByCategory("femme")}
    />
  ),
  head: () => ({
    meta: [
      { title: "Parfums Femme — AMANYA" },
      { name: "description", content: "Découvrez la collection de parfums Femme AMANYA : floraux, gourmands, musqués." },
    ],
  }),
});
