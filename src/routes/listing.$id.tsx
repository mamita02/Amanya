import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, BadgeCheck, Phone, ExternalLink, Heart, Share2, Shield } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListingCard } from "../components/ListingCard";
import { getListing, listings, formatPrice } from "../lib/listings";

export const Route = createFileRoute("/listing/$id")({
  component: ListingDetail,
  loader: ({ params }) => {
    const listing = getListing(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
});

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const similar = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour aux annonces
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Left: image + description */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
              <div className="relative aspect-[16/10] bg-secondary">
                <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
                <div className="absolute right-4 top-4 flex gap-2">
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-white/95 backdrop-blur transition hover:bg-white" aria-label="Favori"><Heart className="h-4 w-4" /></button>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-white/95 backdrop-blur transition hover:bg-white" aria-label="Partager"><Share2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
              <span className="inline-block rounded-full bg-[var(--teal)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--ocean)]">
                {listing.category}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{listing.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {listing.location}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {listing.postedAt}</span>
              </div>

              <div className="mt-6 font-display text-4xl font-bold text-[var(--navy)]">
                {formatPrice(listing.price, listing.currency)}
              </div>

              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">Description</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{listing.description}</p>
              </div>

              <div className="mt-8 grid gap-3 rounded-2xl bg-[var(--navy)]/5 p-4 sm:grid-cols-3">
                {[
                  { label: "Référence", value: `#${listing.id.padStart(6, "0")}` },
                  { label: "Catégorie", value: listing.category },
                  { label: "Localisation", value: listing.location.split(",")[0] },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                    <div className="mt-1 font-display font-semibold capitalize">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: seller card */}
          <aside className="space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={listing.seller.avatar} alt={listing.seller.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-[var(--teal)]/30" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-base font-semibold">{listing.seller.name}</span>
                      {listing.seller.verified && <BadgeCheck className="h-4 w-4 text-[var(--teal)]" />}
                    </div>
                    <div className="text-xs text-muted-foreground">Membre depuis {listing.seller.memberSince}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <a
                    href={`tel:${listing.seller.phone.replace(/\s/g, "")}`}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:shadow-[var(--teal)]/30"
                  >
                    <Phone className="h-4 w-4" /> {listing.seller.phone}
                  </a>
                  <a
                    href={listing.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold transition hover:border-[var(--teal)] hover:text-[var(--ocean)]"
                  >
                    <ExternalLink className="h-4 w-4" /> Voir sur le site
                  </a>
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[var(--teal)]" />
                  <span>Ne payez jamais à l'avance. Inspectez l'article et rencontrez le vendeur dans un lieu public.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold">Annonces similaires</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
