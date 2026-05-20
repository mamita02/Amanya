import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Home, Smartphone, Briefcase, Shirt, Sofa, Wrench, Gamepad2, Search, MapPin, TrendingUp } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListingCard } from "../components/ListingCard";
import { categories, listings } from "../lib/listings";

const iconMap = { Car, Home, Smartphone, Briefcase, Shirt, Sofa, Wrench, Gamepad2 } as const;

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const featured = listings.filter((l) => l.featured);
  const recent = listings.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--navy)] via-[var(--ocean)] to-[var(--teal)]" />
        <div className="absolute inset-0 -z-10 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(92,189,185,0.4), transparent 40%), radial-gradient(circle at 80% 60%, rgba(45,138,158,0.4), transparent 40%)",
        }} />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              <TrendingUp className="h-3 w-3" /> +12 000 annonces ce mois-ci
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              Le marché du Sénégal,<br />
              <span className="bg-gradient-to-r from-[var(--cyan)] to-white bg-clip-text text-transparent">repensé avec élégance.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Achetez, vendez et louez en toute confiance. Des milliers d'annonces vérifiées partout au Sénégal.
            </p>

            <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-2xl shadow-black/30 backdrop-blur sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Que recherchez-vous ?"
                  className="h-12 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-foreground outline-none"
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Dakar"
                  className="h-12 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-foreground outline-none"
                />
              </div>
              <button className="h-12 rounded-xl bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] px-6 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-[var(--teal)]/40">
                Rechercher
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span>Tendances :</span>
              {["Toyota", "Villa Almadies", "iPhone 15", "Emploi tech"].map((t) => (
                <a key={t} href="#" className="rounded-full border border-white/20 px-3 py-1 transition hover:border-[var(--cyan)] hover:text-white">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Explorer par catégorie</h2>
            <p className="mt-1 text-muted-foreground">Trouvez exactement ce que vous cherchez</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => {
            const Icon = iconMap[c.icon as keyof typeof iconMap];
            return (
              <a
                key={c.slug}
                href="#"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center transition hover:-translate-y-1 hover:border-[var(--teal)]/50 hover:shadow-lg hover:shadow-[var(--teal)]/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--navy)]/5 to-[var(--teal)]/10 text-[var(--ocean)] transition group-hover:from-[var(--navy)] group-hover:to-[var(--teal)] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.count.toLocaleString("fr-FR")}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">À la une</span>
            <h2 className="mt-1 font-display text-3xl font-bold">Annonces en vedette</h2>
          </div>
          <Link to="/" className="hidden text-sm font-medium text-[var(--ocean)] hover:text-[var(--teal)] sm:inline">Voir tout →</Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* Recent */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">Nouveautés</span>
            <h2 className="mt-1 font-display text-3xl font-bold">Annonces récentes</h2>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
