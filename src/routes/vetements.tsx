import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/vetements")({
  component: () => <ComingSoon category="Vêtements" tagline="Style affirmé" />,
  head: () => ({
    meta: [
      { title: "Vêtements — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Vêtements AMANYA arrive bientôt." },
    ],
  }),
});
