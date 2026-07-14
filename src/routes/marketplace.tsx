import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { addMarketplaceToCart } from "../lib/cart";
import { getMarketplacePrice, marketplace, type MarketPlace } from "../lib/marketplace";

export const Route = createFileRoute("/marketplace")({
  component: MarketplaceHome,
});

const PAGE_SIZE = 20;
const formatCFA = (price: number) => `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;

function MarketplaceHome() {
  const [category, setCategory] = useState("Toutes");
  const [kind, setKind] = useState<"Tous" | MarketPlace["kind"]>("Tous");
  const [location, setLocation] = useState("Toutes");
  const [page, setPage] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<MarketPlace | null>(null);
  const [quantity, setQuantity] = useState(1);

  const categories = useMemo(
    () => ["Toutes", ...new Set(marketplace.map((partner) => partner.category))],
    [],
  );
  const locations = useMemo(
    () => ["Toutes", ...new Set(marketplace.map((partner) => partner.location))],
    [],
  );

  const filteredPartners = useMemo(() => {
    return marketplace.filter((partner) => {
      return (
        (category === "Toutes" || partner.category === category) &&
        (kind === "Tous" || partner.kind === kind) &&
        (location === "Toutes" || partner.location === location)
      );
    });
  }, [category, kind, location]);

  const pageCount = Math.max(1, Math.ceil(filteredPartners.length / PAGE_SIZE));
  const activePage = Math.min(page, pageCount);
  const visiblePartners = filteredPartners.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  const resetFilters = () => {
    setCategory("Toutes");
    setKind("Tous");
    setLocation("Toutes");
    setPage(1);
  };

  const openPartner = (partner: MarketPlace) => {
    setSelectedPartner(partner);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
            Market Place
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Découvrez une sélection de produits et services proposés par des partenaires et
            enseignes à explorer.
          </p>
          <div className="mt-5 h-px w-28 bg-gradient-to-r from-[var(--ruby)] via-[var(--gold)] to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <SlidersHorizontal className="h-4 w-4 text-[var(--gold)]" /> Filtres
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[var(--ruby)] hover:underline"
              >
                Réinitialiser
              </button>
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Type d'offre
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
                {(["Tous", "Services", "Produits"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setKind(option);
                      setPage(1);
                    }}
                    className={`rounded-lg px-2 py-2 text-xs font-bold transition ${kind === option ? "bg-[var(--onyx)] text-[var(--gold)] shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7 border-t border-border pt-6">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Catégories
              </legend>
              <div className="mt-3 space-y-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${category === item ? "bg-[var(--gold)]/15 font-bold text-[var(--ruby)]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                  >
                    <span>{item}</span>
                    <span className="text-xs">
                      {item === "Toutes"
                        ? marketplace.length
                        : marketplace.filter((partner) => partner.category === item).length}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7 border-t border-border pt-6">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Localisation
              </legend>
              <div className="mt-3 space-y-1">
                {locations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLocation(item);
                      setPage(1);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${location === item ? "bg-[var(--gold)]/15 font-bold text-[var(--ruby)]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </aside>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{filteredPartners.length}</span>{" "}
                résultat{filteredPartners.length > 1 ? "s" : ""}
              </p>
              <span className="rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--ruby)]">
                {category}
              </span>
            </div>

            {visiblePartners.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {visiblePartners.map((partner) => (
                  <MarketplaceTile key={partner.id} partner={partner} onOpen={openPartner} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <h2 className="font-display text-2xl font-bold">Aucun résultat</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Essayez une autre recherche ou retirez un filtre.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-[var(--onyx)] px-5 py-2.5 text-sm font-bold text-[var(--gold)]"
                >
                  Voir tout le catalogue
                </button>
              </div>
            )}

            {pageCount > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  disabled={activePage === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Page précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    aria-current={pageNumber === activePage ? "page" : undefined}
                    className={`grid h-10 min-w-10 place-items-center rounded-full px-2 text-sm font-bold transition ${pageNumber === activePage ? "bg-[var(--ruby)] text-white" : "border border-border hover:border-[var(--gold)]"}`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={activePage === pageCount}
                  onClick={() => setPage((current) => current + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Page suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>

      {selectedPartner && (
        <MarketplaceDialog
          partner={selectedPartner}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onClose={() => setSelectedPartner(null)}
        />
      )}
      <Footer />
    </div>
  );
}

function MarketplaceTile({
  partner,
  onOpen,
}: {
  partner: MarketPlace;
  onOpen: (partner: MarketPlace) => void;
}) {
  const price = getMarketplacePrice(partner.id);
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:border-[var(--gold)]/70 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onOpen(partner)}
        className="relative aspect-[4/3] overflow-hidden text-left"
        style={{ backgroundColor: partner.bgColor ?? "#F5EDE5" }}
        aria-label={`Voir la fiche ${partner.name}`}
      >
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {partner.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--onyx)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
            Sélection
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded-full bg-[var(--gold)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ruby)]">
          {partner.category}
        </span>
        <button
          type="button"
          onClick={() => onOpen(partner)}
          className="mt-3 text-left font-display text-lg font-bold leading-tight transition hover:text-[var(--ruby)]"
        >
          {partner.name}
        </button>
        <p className="mt-1 truncate text-xs font-semibold text-muted-foreground">
          {partner.domain}
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 text-[var(--gold)]" /> {partner.location}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="font-display text-base font-black text-[var(--ruby)]">
            {formatCFA(price)}
          </span>
          <button
            type="button"
            onClick={() => addMarketplaceToCart(partner, price)}
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--onyx)] text-[var(--gold)] transition hover:bg-[var(--ruby)] hover:text-white"
            aria-label={`Ajouter ${partner.name} au panier`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function MarketplaceDialog({
  partner,
  quantity,
  onQuantityChange,
  onClose,
}: {
  partner: MarketPlace;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
}) {
  const price = getMarketplacePrice(partner.id);
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="marketplace-dialog-title"
        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-[var(--gold)]/30 bg-card shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div
            className="relative min-h-[300px] bg-secondary lg:min-h-[620px]"
            style={{ backgroundColor: partner.bgColor ?? "#F5EDE5" }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-[var(--onyx)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              {partner.category}
            </span>
          </div>
          <div className="relative p-6 sm:p-10">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fiche"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground transition hover:bg-[var(--onyx)] hover:text-[var(--gold)]"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="pr-12 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ruby)]">
              {partner.kind} · {partner.domain}
            </p>
            <h2
              id="marketplace-dialog-title"
              className="mt-3 pr-10 font-display text-4xl font-black tracking-tight"
            >
              {partner.name}
            </h2>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-[var(--gold)]" /> {partner.location}
            </p>
            <p className="mt-7 font-display text-4xl font-black text-[var(--ruby)]">
              {formatCFA(price)}
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{partner.description}</p>
            {partner.services && (
              <div className="mt-6 flex flex-wrap gap-2">
                {partner.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-[var(--gold)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--ruby)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center justify-between rounded-xl border border-border bg-background px-1 sm:w-36">
                <button
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  className="grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addMarketplaceToCart(partner, price, quantity)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--ruby)] px-5 text-sm font-bold text-white transition hover:bg-[var(--onyx)]"
              >
                <ShoppingCart className="h-5 w-5" /> Ajouter au panier
              </button>
            </div>
            <div className="mt-8 grid gap-2 border-t border-border pt-6 text-sm">
              {partner.phone && (
                <a
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-semibold transition hover:text-[var(--ruby)]"
                >
                  <Phone className="h-4 w-4 text-[var(--gold)]" /> {partner.phone}
                </a>
              )}
              {partner.email && (
                <a
                  href={`mailto:${partner.email}`}
                  className="flex items-center gap-2 font-semibold transition hover:text-[var(--ruby)]"
                >
                  <Mail className="h-4 w-4 text-[var(--gold)]" /> {partner.email}
                </a>
              )}
              {partner.url !== "#" && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold transition hover:text-[var(--ruby)]"
                >
                  <Globe className="h-4 w-4 text-[var(--gold)]" /> Visiter le site
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
