import { createFileRoute } from "@tanstack/react-router";
import { StoreExperience } from "./store";
import { getAllPerfumesForAdmin } from "../lib/supabase";

export const Route = createFileRoute("/wishlist")({
  loader: () => getAllPerfumesForAdmin(),
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Ma wishlist — AMANYA" }] }),
});

function WishlistPage() {
  return <StoreExperience products={Route.useLoaderData()} wishlistOnly />;
}
