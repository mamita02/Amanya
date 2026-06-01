import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/homme")({
  component: () => <ComingSoon category="Homme" tagline="Sillage masculin" />,
  head: () => ({
    meta: [
      { title: "Homme — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Homme AMANYA arrive bientôt." },
    ],
  }),
});
