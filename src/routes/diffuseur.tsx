import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "../components/ComingSoon";

export const Route = createFileRoute("/diffuseur")({
  component: () => <ComingSoon category="Diffuseur" tagline="Ambiance signature" />,
  head: () => ({
    meta: [
      { title: "Diffuseur — AMANYA · Bientôt disponible" },
      { name: "description", content: "La collection Diffuseur AMANYA arrive bientôt." },
    ],
  }),
});
