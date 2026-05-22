import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/accessoires")({
  component: () => <ComingSoon category="Accessoires" tagline="Détails précieux" />,
  head: () => ({
    meta: [
      { title: "Accessoires — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Accessoires AMANYA arrive bientôt." },
    ],
  }),
});
