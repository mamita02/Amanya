import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/femme")({
  component: () => <ComingSoon category="Femme" tagline="Sillage féminin" />,
  head: () => ({
    meta: [
      { title: "Femme — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Femme AMANYA arrive bientôt." },
    ],
  }),
});
