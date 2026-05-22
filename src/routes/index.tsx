import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Truck, Gem, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ListingCard } from "../components/ListingCard";
import { listings } from "../lib/listings";
import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";
import contactBg from "../assets/contact-bg.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "AMANYA — Distribution de produits authentiques au Sénégal" },
      {
        name: "description",
        content:
          "AMANYA : parfums, cosmétiques, vêtements et accessoires authentiques pour grossistes, revendeurs et particuliers au Sénégal.",
      },
      { property: "og:title", content: "AMANYA — Luxe & authenticité" },
      {
        property: "og:description",
        content:
          "Une plateforme élégante pour découvrir et commander parfums, cosmétiques et accessoires de marque.",
      },
    ],
  }),
});

const categories = [
  {
    name: "Cosmétiques",
    tagline: "Routine éclat",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Vêtements",
    tagline: "Style affirmé",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Parfums",
    tagline: "Sillage signature",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Accessoires",
    tagline: "Détails précieux",
    image:
      "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=900&h=1100&fit=crop&auto=format",
  },
];

const partners = ["DIOR", "GIVENCHY", "CHANEL", "ARMANI", "GAULTIER", "YSL", "PRADA"];

const heroSlides = [hero1, hero2, hero3];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const go = (n: number) => setIndex((index + n + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--onyx)]">
      <div className="relative h-screen w-full">
        {heroSlides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1920}
            height={1080}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <button
          onClick={() => go(-1)}
          aria-label="Précédent"
          className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--gold)]/40 bg-black/40 text-[var(--gold-soft)] backdrop-blur transition hover:border-[var(--gold)] hover:text-[var(--gold)] sm:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Suivant"
          className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--gold)]/40 bg-black/40 text-[var(--gold-soft)] backdrop-blur transition hover:border-[var(--gold)] hover:text-[var(--gold)] sm:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const featured = listings.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroCarousel />

      {/* TRUST STRIP */}
      <section className="border-y border-border/60 bg-[var(--jet)] text-white/80">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { Icon: ShieldCheck, title: "100% authentique", text: "Produits certifiés origine" },
            { Icon: Truck, title: "Livraison Sénégal", text: "Partout, rapide & sûr" },
            { Icon: Gem, title: "Marques de prestige", text: "Sélection premium" },
            { Icon: Sparkles, title: "Grossistes & revendeurs", text: "Tarifs préférentiels" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-white/60">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
            Univers AMANYA
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Explorer nos collections
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <a
              key={c.name}
              href="#"
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-[var(--onyx)]"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--gold)]">
                  {c.tagline}
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold">{c.name}</h3>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 transition group-hover:text-[var(--gold-soft)]">
                  Voir plus
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition group-hover:ring-[var(--gold)]/40" />
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="apropos" className="bg-[var(--secondary)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-[var(--ruby)]/20 via-transparent to-[var(--gold)]/20 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1581088657384-fa3a48b97b9b?w=1000&h=1200&fit=crop&auto=format"
              alt="Équipe AMANYA"
              loading="lazy"
              className="h-full w-full rounded-[2.5rem] object-cover shadow-2xl"
              style={{ borderTopLeftRadius: "40% 50%", borderBottomRightRadius: "40% 50%" }}
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
              À propos de nous
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Plus qu'un fournisseur, <span className="text-[var(--ruby)]">une maison.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              AMANYA est bien plus qu'un simple fournisseur : c'est une solution complète et
              accessible pour les grossistes, revendeurs, commerces de proximité et entrepreneurs au
              Sénégal.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Née dans la continuité de l'agence MCE — Management Communication Event, AMANYA
              apporte un maillon essentiel : l'approvisionnement direct en produits authentiques,
              certifiés et accessibles.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--onyx)] shadow-md transition hover:bg-[var(--gold-soft)]"
            >
              Voir plus
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS (featured products grid) */}
      <section id="partenaires" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
            Partenaires
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Ils nous font confiance</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[var(--secondary)]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
              Contact
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Écrivez-nous</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Une question, un projet de partenariat ? Notre équipe vous répond sous 24h.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci ! Votre message a bien été envoyé.");
            }}
            className="mt-10 grid gap-5 rounded-3xl border border-border/60 bg-card p-8 shadow-xl shadow-[var(--onyx)]/5 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Nom complet
                </label>
                <input
                  required
                  type="text"
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Sujet
              </label>
              <input
                type="text"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-[var(--ruby)] px-8 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-[var(--ruby-bright)]"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
