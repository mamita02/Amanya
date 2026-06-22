// src/routes/partenaire.$id.tsx

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PartnerCard } from "../components/PartnerCard";
import { getPartner, partners } from "../lib/partners";

export const Route = createFileRoute("/partenaire/$id")({
  component: PartnerDetailPage,
  head: ({ params }) => {
    const partner = getPartner(params.id);
    return {
      meta: [
        { title: partner ? `${partner.name} — Partenaire AMANYA` : "Partenaire — AMANYA" },
      ],
    };
  },
});

function PartnerDetailPage() {
  const { id } = Route.useParams();
  const partner = getPartner(id);

  if (!partner) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PartnerNotFound />
        <Footer />
      </div>
    );
  }

  const similar = partners.filter((p) => p.id !== partner.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══ HERO ═══ */}
     {/* ═══ HERO ═══ */}
      <div className="relative">
        {/* Image de fond */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Bouton retour */}
        <Link
          to="/"
          hash="partenaires"
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        {/* Bouton partager */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: partner.name, text: partner.description, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Lien copié !");
            }
          }}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white/90 backdrop-blur-md transition hover:text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <Share2 className="h-4 w-4" />
        </button>

        {/* Carte profil */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative -mt-20 flex flex-col items-start gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-lg md:flex-row md:items-center">
            <div
              className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border-4 border-white shadow-md"
              style={{ backgroundColor: partner.bgColor || "#F5EDE5" }}
            >
              <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold md:text-3xl">{partner.name}</h1>
                <BadgeCheck className="h-6 w-6" style={{ color: "#D4AF37" }} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{partner.location}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "rgba(212,175,55,0.12)", color: "#B8941E" }}>{partner.domain}</span>
                {partner.featured && (
                  <span className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "#1a1a1a", color: "#D4AF37" }}><Star className="h-3 w-3" />En vedette</span>
                )}
                <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "rgba(39,174,96,0.1)", color: "#27AE60" }}>Partenaire vérifié</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENU ═══ */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Colonne gauche (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* À propos */}
            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-bold">À propos</h2>
              <p className="leading-relaxed text-muted-foreground">
                {partner.description}
              </p>
            </section>

            {/* Services */}
            {partner.services && partner.services.length > 0 && (
              <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="mb-4 font-display text-lg font-bold">Services & spécialités</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {partner.services.map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#D4AF37" }} />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne droite (1/3) */}
          <div className="space-y-6">
            {/* Carte contact */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h3 className="mb-5 font-display text-lg font-bold">Contacter</h3>
              <div className="space-y-3">
                {/* Voir le site */}
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <Globe className="h-5 w-5" />
                  Voir le site
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* Téléphone */}
                {partner.phone && (
                  <a
                    href={`tel:${partner.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    {partner.phone}
                  </a>
                )}

                {/* Email */}
                {partner.email && (
                  <a
                    href={`mailto:${partner.email}`}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    {partner.email}
                  </a>
                )}

                {/* Ouvrir dans un nouvel onglet */}
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-xs font-semibold text-muted-foreground transition hover:border-[var(--gold)] hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ouvrir dans un nouvel onglet
                </a>
              </div>

              {/* Badge vérifié */}
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#D4AF37" }} />
                <span>
                  Partenaire officiel d'AMANYA. Informations vérifiées et mises à jour régulièrement.
                </span>
              </div>
            </div>

            {/* Carte infos */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-display text-lg font-bold">Informations</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Localisation
                    </p>
                    <p className="mt-0.5 text-sm">{partner.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Domaine
                    </p>
                    <p className="mt-0.5 text-sm">{partner.domain}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Site web
                    </p>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 text-sm text-[var(--gold)] hover:underline"
                    >
                      {partner.url}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partenaires similaires */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold">Découvrir d'autres partenaires</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}

function PartnerNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div
        className="mb-6 grid h-20 w-20 place-items-center rounded-full text-3xl"
        style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
      >
        🔍
      </div>
      <h1 className="text-2xl font-bold">Partenaire introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        Ce partenaire n'existe pas ou n'est plus disponible.
      </p>
      <Link
        to="/"
        hash="partenaires"
        className="mt-6 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        Voir tous les partenaires
      </Link>
    </div>
  );
}