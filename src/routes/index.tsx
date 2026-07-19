import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Truck, ShoppingBag, Box, CircleArrowRight, Headset } from "lucide-react";
import { useEffect } from "react";
import contactBg from "../assets/contact-bg.jpg";
import mounia from "../assets/Mounia.jpeg";
import heroAmanya from "../assets/hero_amanya.png";
import { scrollToSection } from "../lib/scrollToSection";
import { marketplace } from "../lib/marketplace";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PartnerLogoMarquee } from "../components/PartnerLogoMarquee";
import { MarketplaceCard } from "../components/MarketplaceCard";

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
  // {
  //   name: "Vêtements",
  //   tagline: "Style affirmé",
  //   path: "/vetements",
  //   image:
  //     "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1100&fit=crop&auto=format",
  // },
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


function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float 6s ease-in-out 1.5s infinite; }
      `}</style>
      <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="bg-[#FAF8F4]" aria-labelledby="hero-title">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

            {/* Colonne gauche : contenu */}
            <div className="order-1 lg:order-1 space-y-6 md:space-y-8">

              {/* Switch Retail / Wholesale */}
              <div className="inline-flex items-center p-1 bg-black rounded-full shadow-sm" role="group" aria-label="Mode d'achat">
                <button type="button" className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white text-[#B8873A] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300" aria-pressed="true">
                  <ShoppingBag className="w-4 h-4 text-[#B8873A]" />
                  Marketplace
                </button>
                <button type="button" className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-white/80 text-xs sm:text-sm font-semibold tracking-wide hover:text-white transition-all duration-300" aria-pressed="false">
                  <Box className="w-4 h-4 text-[#B8873A]" />
                  Achat en gros
                </button>
              </div>

              {/* Titre principal */}
              <h1 id="hero-title" className="font-serif text-4xl sm:text-5xl xl:text-[3.5rem] xl:leading-[1.15] font-medium text-[#1B1B1B]">
                Votre univers, des <span className="text-[#B8873A] italic">meilleurs</span> de <span className="text-[#B8873A] italic">choix</span>
              </h1>

              {/* Description */}
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-xl">
                Achetez au détail ou en gros, vendez vos produits ou développez votre activité sur une plateforme unique pensée pour particuliers, artisans et professionnels.
              </p>

              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B8873A] hover:bg-[#A5782F] text-white font-medium rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  Explorer la marketplace
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/vendre" className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#B8873A] text-[#1B1B1B] font-medium rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  Devenir vendeur
                </Link>
              </div>

              {/* Badges de confiance */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-sm border border-[#ECECEC]/60 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center flex-shrink-0 -space-x-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#E8C98A] border-2 border-white flex items-center justify-center text-xs font-semibold text-[#B8873A]">M</div>
                    <div className="w-10 h-10 rounded-full bg-[#D6A85B] border-2 border-white flex items-center justify-center text-xs font-semibold text-white">A</div>
                    <div className="w-10 h-10 rounded-full bg-[#1B1B1B] border-2 border-white flex items-center justify-center text-xs font-semibold text-white">M</div>
                    <div className="w-10 h-10 rounded-full bg-[#B8873A] border-2 border-white flex items-center justify-center text-xs font-semibold text-white">Y</div>
                  </div>
                  <p className="text-sm sm:text-sm text-[#6B7280] leading-snug">
                    Rejoignez des milliers d'acheteurs, vendeurs et entrepreneurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne droite : composition produits (flat-lay) */}
            <div className="order-2 lg:order-2 relative">
              <img src={heroAmanya} alt="Composition produits" className="w-full h-full mt:0 md:-mt-16 object-contain" />

              {/* Éléments flottants décoratifs */}
              <div className="absolute -top-3 -right-4 w-12 h-12 bg-[#E8C98A]/40 rounded-full animate-float-delay hidden sm:block" aria-hidden="true"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#E8C98A]/40 rounded-full animate-float-delay hidden sm:block" aria-hidden="true"></div>
            </div>
          </div>

          {/* OPTIONS CARDS */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="bg-black rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#ECECEC]">
              <div className="flex items-center justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8C98A]/20 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-[#B8873A]" />
                </div>
                <h3 className="font-semibold text-[#B8873A] text-lg mb-2">Livraison express</h3>
              </div>
              <p className="text-sm text-white/80">Livraison rapide et fiable partout au Sénégal.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-black rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#ECECEC]">
              <div className="flex items-center justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8C98A]/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-[#B8873A]" />
                </div>
                <h3 className="font-semibold text-[#B8873A] text-lg mb-2">Paiement sécurisé</h3>
              </div>
              <p className="text-sm text-white/80">Transactions protégées et sécurisées à 100%.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-black rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#ECECEC]">
              <div className="flex items-center justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8C98A]/20 flex items-center justify-center mb-4">
                  <CircleArrowRight className="w-6 h-6 text-[#B8873A]" />
                </div>
                <h3 className="font-semibold text-[#B8873A] text-lg mb-2">Retour facile</h3>
              </div>
              <p className="text-sm text-white/80">Retours simples et sans stress sous 30 jours.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-black rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#ECECEC]">
              <div className="flex items-center justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8C98A]/20 flex items-center justify-center mb-4">
                  <Headset className="w-6 h-6 text-[#B8873A]" />
                </div>
                <h3 className="font-semibold text-[#B8873A] text-lg mb-2">Support client</h3>
              </div>
              <p className="text-sm text-white/80">Toujours à votre écoute pour vous accompagner.</p>
            </div>
          </div>
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">

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
              className="mt-10 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--onyx)] transition hover:bg-[var(--gold-soft)]">
              Voir plus
            </a>
          </div>
        </div>
      </section>

      {/* MARKET PLACE */}
      <section id="marketplace" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Market Place</h2>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
              LES ACTEURS DE NOTRE ÉCOSYSTÈME
          </span>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketplace.slice(0, 3).map((marketplace) => (
            <MarketplaceCard key={marketplace.name} marketplace={marketplace} />
          ))}
        </div>
        <div className="text-center">
          <a
            href="/marketplace"
            className="mt-10 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--onyx)] transition hover:bg-[var(--gold-soft)]"
          >
            Voir Plus
          </a>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partenaires" className="bg-gradient-to-b from-[#fefbe8] to-[#ce9a65] w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Nos partenaires</h2>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ruby)]">
            Ils nous font confiance
          </span>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[var(--onyx)] to-transparent" />
        </div>

        <PartnerLogoMarquee />
      </section>

      <Footer />
      </div>
    </>
  );
}
