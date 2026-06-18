// src/routes/partenaire.$id.tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
    Shield,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PartnerCard } from "../components/PartnerCard";
import { getPartner, partners } from "../lib/partners";

export const Route = createFileRoute("/partenaire/$id")({
  component: PartnerDetail,
  loader: ({ params }) => {
    const partner = getPartner(params.id);
    if (!partner) throw notFound();
    return { partner };
  },
});

function PartnerDetail() {
  const { partner } = Route.useLoaderData();
  const similar = partners.filter((p) => p.id !== partner.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          hash="partenaires"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux partenaires
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* === LEFT : image + description === */}
          <div className="lg:col-span-2">
            {/* Image principale */}
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
              <div
                className="relative aspect-[16/10]"
                style={{ backgroundColor: partner.bgColor ?? "#F5EDE5" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-cover"
                />
                {partner.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--onyx)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--gold)] shadow-md">
                    En vedette
                  </span>
                )}
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/95 backdrop-blur transition hover:bg-white"
                    aria-label="Partager"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bloc description */}
            <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
              <span className="inline-block rounded-full bg-[var(--ruby)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--ruby)]">
                {partner.domain}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {partner.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {partner.location}
                </span>
                <span className="inline-flex items-center gap-1 text-[var(--gold)]">
                  <BadgeCheck className="h-4 w-4" /> Partenaire vérifié
                </span>
              </div>

              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">À propos</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {partner.description}
                </p>
              </div>

              {/* Services proposés */}
              {partner.services && partner.services.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-semibold">Services & spécialités</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {partner.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[var(--gold)]" />
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Méta-infos */}
              <div className="mt-8 grid gap-3 rounded-2xl bg-[var(--onyx)]/[0.04] p-4 sm:grid-cols-3">
                {[
                  { label: "Domaine", value: partner.domain },
                  { label: "Zone d'activité", value: partner.location },
                  { label: "Statut", value: "Partenaire officiel" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="mt-1 font-display font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === RIGHT : carte contact === */}
          <aside className="space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 place-items-center overflow-hidden rounded-full ring-2 ring-[var(--gold)]/30"
                    style={{ backgroundColor: partner.bgColor ?? "#F5EDE5" }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-base font-semibold">{partner.name}</span>
                      <BadgeCheck className="h-4 w-4 text-[var(--gold)]" />
                    </div>
                    <div className="text-xs text-muted-foreground">{partner.domain}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--onyx)] to-[var(--ruby)] text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:shadow-[var(--ruby)]/30"
                  >
                    <Globe className="h-4 w-4" /> Visiter le site
                  </a>

                  {partner.phone && (
                    <a
                      href={`tel:${partner.phone.replace(/\s/g, "")}`}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    >
                      <Phone className="h-4 w-4" /> {partner.phone}
                    </a>
                  )}

                  {partner.email && (
                    <a
                      href={`mailto:${partner.email}`}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    >
                      <Mail className="h-4 w-4" /> Email
                    </a>
                  )}

                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-xs font-semibold text-muted-foreground transition hover:border-[var(--gold)] hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Ouvrir dans un nouvel onglet
                  </a>
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span>
                    Partenaire officiel d'AMANYA. Toutes les informations sont vérifiées et mises à
                    jour régulièrement.
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* === Partenaires similaires === */}
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