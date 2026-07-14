import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Globe,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { addMarketplaceToCart } from "../lib/cart";
import { getMarketplace, getMarketplacePrice } from "../lib/marketplace";

export const Route = createFileRoute("/marketplace/$id")({
  component: MarketplaceDetailPage,
  head: ({ params }) => {
    const partner = getMarketplace(params.id);
    return { meta: [{ title: partner ? `${partner.name} — AMANYA` : "Marketplace — AMANYA" }] };
  },
});

const formatCFA = (price: number) => `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;

function MarketplaceDetailPage() {
  const { id } = Route.useParams();
  const partner = getMarketplace(id);
  const [quantity, setQuantity] = useState(1);

  if (!partner) return <MarketplaceNotFound />;

  const price = getMarketplacePrice(partner.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          to="/marketplace"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-[var(--ruby)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au Marketplace
        </Link>

        <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className="aspect-square overflow-hidden rounded-3xl border border-border/60 bg-secondary shadow-lg"
            style={{ backgroundColor: partner.bgColor ?? "#F5EDE5" }}
          >
            <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--ruby)]">
              {partner.domain}
            </span>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
              {partner.name}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-[var(--gold)]" />
              {partner.location}
            </div>

            <p className="mt-7 font-display text-4xl font-black text-[var(--ruby)]">
              {formatCFA(price)}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                <Check className="h-4 w-4" /> Disponible
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-foreground">
                Partenaire vérifié
              </span>
            </div>

            <p className="mt-7 leading-relaxed text-muted-foreground">{partner.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-1 sm:w-40">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid h-10 w-10 place-items-center rounded-lg transition hover:bg-secondary"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg transition hover:bg-secondary"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addMarketplaceToCart(partner, price, quantity)}
                className="inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-[var(--ruby)] px-6 py-3 font-bold text-white transition hover:bg-[var(--onyx)]"
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </button>
            </div>

            <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              {partner.phone && (
                <ContactLink
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  icon={<Phone className="h-4 w-4" />}
                  label={partner.phone}
                />
              )}
              {partner.email && (
                <ContactLink
                  href={`mailto:${partner.email}`}
                  icon={<Mail className="h-4 w-4" />}
                  label={partner.email}
                />
              )}
              <ContactLink
                href={partner.url}
                external
                icon={<Globe className="h-4 w-4" />}
                label="Visiter le site"
              />
            </div>
          </div>
        </section>

        {partner.services && partner.services.length > 0 && (
          <section className="mt-12 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Services</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {partner.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-[var(--gold)]/10 px-4 py-2 text-sm font-semibold text-[var(--ruby)]"
                >
                  {service}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-3 text-sm font-semibold transition hover:bg-[var(--gold)]/10 hover:text-[var(--ruby)]"
    >
      <span className="text-[var(--gold)]">{icon}</span>
      {label}
    </a>
  );
}

function MarketplaceNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold">Article introuvable</h1>
        <p className="mt-3 text-muted-foreground">Cet article n'est plus disponible.</p>
        <Link
          to="/marketplace"
          className="mt-6 rounded-full bg-[var(--onyx)] px-6 py-3 text-sm font-bold text-[var(--gold)] transition hover:bg-[var(--ruby)] hover:text-white"
        >
          Voir le Marketplace
        </Link>
      </div>
      <Footer />
    </div>
  );
}
