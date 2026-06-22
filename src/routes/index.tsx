import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Gem, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import contactBg from "../assets/contact-bg.jpg";
import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";
import mounia from "../assets/Mounia.jpeg";
import { partners } from "../lib/partners";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PartnerCard } from "../components/PartnerCard";

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
    name: "Vêtements",
    tagline: "Style affirmé",
    path: "/vetements",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Homme",
    tagline: "Sillage masculin",
    path: "/homme",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Femme",
    tagline: "Sillage féminin",
    path: "/femme",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&h=1100&fit=crop&auto=format",
  },
  {
    name: "Diffuseur",
    tagline: "Ambiance signature",
    path: "/diffuseur",
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=900&h=1100&fit=crop&auto=format",
  },
];

// Partenaires AMANYA — remplace les "#" par les vraies URLs des sites partenaires


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
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Univers AMANYA
          </h2>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
            Explorer nos collections
          </span>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
         
            {categories.map((c) => (
            <Link
              key={c.name}
              to={c.path}
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
           </Link>
  ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="apropos" className="bg-[#F5EDE5]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
          {/* Photo avec forme blob organique */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <img
              src={mounia}
              alt="Mounia — AMANYA"
              loading="lazy"
              className="h-auto w-full object-cover shadow-2xl"
              style={{
                borderRadius: "62% 38% 56% 44% / 54% 49% 51% 46%",
              }}
            />
          </div>

          {/* Texte */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--ruby)]">
              À propos de nous
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Plus qu'un fournisseur,
              <br />
              <span className="text-[var(--ruby)]">une maison.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-foreground/80">
              AMANYA est bien plus qu'un simple fournisseur : c'est une solution complète et
              accessible pour les grossistes, revendeurs, commerces de proximité et entrepreneurs au
              Sénégal.
            </p>
            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              Née dans la continuité de l'agence MCE — Management Communication Event, AMANYA
              apporte un maillon essentiel : l'approvisionnement direct en produits authentiques,
              certifiés et accessibles.
            </p>
            <a
              href="#"
              className="mt-10 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--onyx)] transition hover:bg-[var(--gold-soft)]"
            >
              Voir plus
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partenaires" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Nos partenaires</h2>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
            Ils nous font confiance
          </span>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative isolate overflow-hidden">
        <img
          src={contactBg}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--onyx)]/95 via-[var(--onyx)]/80 to-[var(--ruby)]/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,90,0.15),_transparent_60%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8 lg:py-32">
          {/* LEFT: intro & infos */}
          <div className="flex flex-col justify-center text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
              Contact
            </span>
            <h2 className="mt-4 font-display text-5xl font-black leading-[1.05] sm:text-6xl">
              Parlons de votre
              <span className="block bg-gradient-to-r from-[var(--gold-soft)] via-[var(--gold)] to-[var(--ruby-bright)] bg-clip-text text-transparent">
                prochain projet.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Une question, un partenariat, une commande en gros ? Notre équipe vous répond sous 24h.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { label: "Email", value: "contact@amanya-distribution.com" },
                { label: "Téléphone", value: "+221 33 820 09 36" },
                { label: "Adresse", value: "Sénégal Dakar, Ouest Foire" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                    {info.label}
                  </div>
                  <div className="ml-auto text-sm font-medium text-white">{info.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: glass form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci ! Votre message a bien été envoyé.");
            }}
            className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[var(--gold)]/30 via-transparent to-[var(--ruby)]/20 opacity-50 [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)] [mask-composite:exclude] p-px" />

            <div className="relative grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { label: "Nom complet", type: "text", required: true },
                  { label: "Email", type: "email", required: true },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-soft)]">
                      {f.label}
                    </label>
                    <input
                      required={f.required}
                      type={f.type}
                      className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur transition placeholder:text-white/30 focus:border-[var(--gold)] focus:bg-white/15 focus:ring-2 focus:ring-[var(--gold)]/40"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-soft)]">
                  Sujet
                </label>
                <input
                  type="text"
                  className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur transition placeholder:text-white/30 focus:border-[var(--gold)] focus:bg-white/15 focus:ring-2 focus:ring-[var(--gold)]/40"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-soft)]">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur transition placeholder:text-white/30 focus:border-[var(--gold)] focus:bg-white/15 focus:ring-2 focus:ring-[var(--gold)]/40"
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--ruby)] via-[var(--ruby-bright)] to-[var(--ruby)] px-10 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_10px_40px_-10px_rgba(220,40,60,0.6)] transition hover:shadow-[0_15px_50px_-10px_rgba(220,40,60,0.8)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Envoyer le message</span>
                <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </section>


      <Footer />
    </div>
  );
}