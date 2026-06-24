// src/components/PerfumeCatalog.tsx
import { Package, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ALL_QUANTITIES,
  type Gender,
  type Perfume,
  type PerfumeType,
  type Quantity,
  type Volume,
  formatFCFA,
  getBrands,
} from "../lib/perfumes";
import { AddToCartModal } from "./AddToCartModal";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  perfumes: Perfume[];
};

const ALL_GENDERS: Gender[] = ["Homme", "Femme", "Unisex"];
const ALL_TYPES: PerfumeType[] = ["Authentique", "Standard"];
const ALL_VOLUMES: Volume[] = [50, 100];

export function PerfumeCatalog({ title, tagline, description, heroImage, perfumes }: Props) {
  const brands = useMemo(() => getBrands(perfumes), [perfumes]);

  const [brand, setBrand] = useState<string | "all">("all");
  const [genders, setGenders] = useState<Gender[]>([]);
  const [types, setTypes] = useState<PerfumeType[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [minQty, setMinQty] = useState<Quantity | "all">("all");
  const [selectedVol, setSelectedVol] = useState<Record<string, Volume>>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [cartModalPerfume, setCartModalPerfume] = useState<Perfume | null>(null);

  const filtered = useMemo(() => {
    return perfumes.filter((p) => {
      if (brand !== "all" && p.brand !== brand) return false;
      if (genders.length && !genders.includes(p.gender)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (volumes.length && !p.volumes.some((v) => volumes.includes(v))) return false;
      if (minQty !== "all" && p.minQuantity > minQty) return false;
      return true;
    });
  }, [perfumes, brand, genders, types, volumes, minQty]);

  const toggle = <T,>(arr: T[], val: T, set: (v: T[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const resetAll = () => {
    setBrand("all");
    setGenders([]);
    setTypes([]);
    setVolumes([]);
    setMinQty("all");
  };

  const activeCount =
    (brand !== "all" ? 1 : 0) +
    genders.length +
    types.length +
    volumes.length +
    (minQty !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[var(--onyx)] text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--onyx)]/70 via-[var(--onyx)]/40 to-[var(--onyx)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)] backdrop-blur sm:px-4 sm:py-1.5">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {tagline}
          </div>
          <h1 className="mt-4 sm:mt-6 font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white via-white to-[var(--gold-soft)] bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <div className="mx-auto mt-4 sm:mt-6 h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70 px-2">
            {description}
          </p>
          <div className="mx-auto mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--gold)]/15 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
            <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Vente en gros · à partir de 20 pièces
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="w-full px-4 pt-6 sm:pt-10 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Tous les parfums
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {filtered.length > 1 ? "parfums disponibles" : "parfum disponible"} · prix unitaire en gros
            </p>
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--onyx)] bg-[var(--onyx)] px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Filtres
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-[var(--gold)] px-1.5 py-0.5 text-[10px] text-[var(--onyx)]">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* GRID */}
      <section className="w-full px-3 py-6 sm:px-8 sm:py-10 lg:px-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 sm:py-24 text-center px-4">
            <p className="font-display text-xl sm:text-2xl font-bold">Aucun parfum trouvé</p>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Essayez de modifier vos filtres.
            </p>
            <button
              onClick={resetAll}
              className="mt-4 sm:mt-6 rounded-full bg-[var(--onyx)] px-6 py-2 text-sm font-semibold text-white"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filtered.map((p) => (
              <PerfumeCard
                key={p.id}
                perfume={p}
                selectedVol={selectedVol[p.id] ?? p.volumes[0]}
                onSelectVol={(v) =>
                  setSelectedVol((s) => ({ ...s, [p.id]: v }))
                }
                onOrder={() => setCartModalPerfume(p)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* MODAL AJOUT AU PANIER */}
      {cartModalPerfume && (
        <AddToCartModal
          perfume={cartModalPerfume}
          defaultVolume={selectedVol[cartModalPerfume.id] ?? cartModalPerfume.volumes[0]}
          onClose={() => setCartModalPerfume(null)}
        />
      )}

      {/* FILTERS MODAL */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">Filtres</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Affinez votre sélection
                </p>
              </div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="rounded-full p-2 transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
              <FilterGroup title="Marque">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                >
                  <option value="all">Toutes les marques</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </FilterGroup>

              <FilterGroup title="Genre">
                <div className="flex flex-wrap gap-2">
                  {ALL_GENDERS.map((g) => (
                    <Chip key={g} active={genders.includes(g)} onClick={() => toggle(genders, g, setGenders)}>
                      {g}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Type">
                <div className="flex flex-wrap gap-2">
                  {ALL_TYPES.map((t) => (
                    <Chip key={t} active={types.includes(t)} onClick={() => toggle(types, t, setTypes)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Volume">
                <div className="flex flex-wrap gap-2">
                  {ALL_VOLUMES.map((v) => (
                    <Chip key={v} active={volumes.includes(v)} onClick={() => toggle(volumes, v, setVolumes)}>
                      {v}ml
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Nombre de pièces" subtitle="Commandes à partir de 20 pièces minimum">
                <div className="flex flex-wrap gap-2">
                  <Chip active={minQty === "all"} onClick={() => setMinQty("all")}>Tous</Chip>
                  {ALL_QUANTITIES.map((q) => (
                    <Chip key={q} active={minQty === q} onClick={() => setMinQty(q)}>
                      {q}+ pcs
                    </Chip>
                  ))}
                </div>
              </FilterGroup>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-6 sm:py-4">
              <button
                onClick={resetAll}
                className="text-xs sm:text-sm font-semibold text-muted-foreground transition hover:text-[var(--ruby)]"
              >
                Réinitialiser{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="rounded-full bg-[var(--onyx)] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
              >
                Voir {filtered.length} parfums
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 sm:mb-6 border-b border-border pb-5 sm:pb-6 last:border-0">
      <h3 className="mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>
      {subtitle && <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs text-muted-foreground/80">{subtitle}</p>}
      {!subtitle && <div className="mb-2 sm:mb-3" />}
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition ${
        active
          ? "border-[var(--onyx)] bg-[var(--onyx)] text-white"
          : "border-border bg-card text-foreground hover:border-[var(--onyx)]"
      }`}
    >
      {children}
    </button>
  );
}

function PerfumeCard({
  perfume,
  selectedVol,
  onSelectVol,
  onOrder,
}: {
  perfume: Perfume;
  selectedVol: Volume;
  onSelectVol: (v: Volume) => void;
  onOrder: () => void;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--onyx)]/10">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ backgroundColor: perfume.accent }}
        />
        {perfume.badge && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-[var(--onyx)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--gold)] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
            {perfume.badge}
          </span>
        )}
        <span className="absolute right-2 top-2 z-10 rounded-full border border-black/10 bg-white/70 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--onyx)] backdrop-blur sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
          {perfume.family}
        </span>
        <img
          src={perfume.image}
          alt={perfume.name}
          className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Infos */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 text-center">
        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
          {perfume.brand}
        </p>
        <h3 className="mt-1 sm:mt-1.5 font-display text-sm sm:text-base font-bold tracking-tight line-clamp-2">
          <span className="font-black">{perfume.name}</span>{" "}
          <span className="hidden sm:inline font-normal text-muted-foreground">{perfume.subtitle}</span>
        </h3>
        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-muted-foreground">
          {perfume.type === "Authentique" ? "Eau de Parfum" : "Inspiration"} · {perfume.gender}
        </p>
        <p className="mt-1.5 sm:mt-2 font-display text-xs sm:text-sm font-bold">
          {formatFCFA(perfume.price)}{" "}
          <span className="text-[9px] sm:text-[10px] font-normal text-muted-foreground">/ unité</span>
        </p>
        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--gold)]">
          dès {perfume.minQuantity} pièces
        </p>

        {/* Volume + Commander */}
        <div className="mt-2 sm:mt-3 flex flex-col min-[400px]:flex-row items-stretch gap-1.5 sm:gap-2">
          {perfume.volumes.length > 1 ? (
            <select
              value={selectedVol}
              onChange={(e) => onSelectVol(Number(e.target.value) as Volume)}
              className="w-full min-[400px]:flex-1 rounded-lg border border-border bg-background px-2 py-2 text-[10px] font-semibold uppercase tracking-wider outline-none focus:ring-2 focus:ring-[var(--gold)]"
            >
              {perfume.volumes.map((v) => (
                <option key={v} value={v}>{v}ML</option>
              ))}
            </select>
          ) : (
            <span className="flex w-full min-[400px]:flex-1 items-center justify-center rounded-lg border border-border bg-background px-2 py-2 text-[10px] font-semibold uppercase tracking-wider">
              {perfume.volumes[0]}ML
            </span>
          )}
          <button
            onClick={onOrder}
            className="w-full min-[400px]:flex-1 rounded-lg bg-[var(--onyx)] px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition active:scale-95 hover:bg-[var(--ruby)]"
          >
            Commander
          </button>
        </div>
      </div>
    </article>
  );
}