import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/cosmetiques")({
  component: () => <ComingSoon category="Cosmétiques" tagline="Routine éclat" />,
  head: () => ({
    meta: [
      { title: "Cosmétiques — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Cosmétiques AMANYA arrive bientôt." },
    ],
  }),
});
