// src/components/AddToCartModal.tsx
import { AlertCircle, Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  addPackToCart,
  createEmptyPackFromPerfume,
  createPackItem,
  getMinPieces,
  getPackLabel,
  getUnitPrice,
  type Pack,
  type PackCategory,
} from "../lib/cart";
import { formatFCFA, type Perfume, type Volume } from "../lib/perfumes";
import { getAllPerfumes } from "../lib/supabase";

type Props = {
  perfume: Perfume;
  defaultVolume: Volume;
  onClose: () => void;
};

export function AddToCartModal({ perfume, defaultVolume, onClose }: Props) {
  const category = perfume.category as PackCategory;
  const volume = defaultVolume;
  const minPieces = getMinPieces(category, volume);
  const unitPrice = getUnitPrice(category, volume);
  const packLabel = getPackLabel(category, volume);

  // Quantités par parfum (perfumeId → nombre)
  const [quantities, setQuantities] = useState<Record<string, number>>({
    [perfume.id]: 1,
  });

  // Liste des parfums de la même catégorie + volume
  const [siblings, setSiblings] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtrage marque
  const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const all = await getAllPerfumes();
        if (cancelled) return;

        // Garde tous les parfums de la même catégorie + volume + actifs
        const filtered = all.filter(
          (p) =>
            p.isActive &&
            p.category === category &&
            p.volumes.includes(volume)
        );

        // Le parfum cliqué en premier
        const ordered = [
          filtered.find((p) => p.id === perfume.id)!,
          ...filtered.filter((p) => p.id !== perfume.id),
        ].filter(Boolean);

        setSiblings(ordered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category, volume, perfume.id]);

  // Marques disponibles (triées)
  const brands = useMemo(() => {
    const set = new Set<string>();
    siblings.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [siblings]);

  // Parfums filtrés par marque
  const displayed = useMemo(() => {
    if (selectedBrand === "all") return siblings;
    return siblings.filter((p) => p.brand === selectedBrand);
  }, [siblings, selectedBrand]);

  // Totaux
  const totalPieces = Object.values(quantities).reduce((s, q) => s + q, 0);
  const totalPrice = totalPieces * unitPrice;
  const isValid = totalPieces >= minPieces;
  const missing = Math.max(0, minPieces - totalPieces);

  // Handlers
  const setQty = (perfumeId: string, qty: number) => {
    setQuantities((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[perfumeId];
      else next[perfumeId] = qty;
      return next;
    });
  };

  const inc = (perfumeId: string) => setQty(perfumeId, (quantities[perfumeId] || 0) + 1);
  const dec = (perfumeId: string) => setQty(perfumeId, Math.max(0, (quantities[perfumeId] || 0) - 1));

  const handleAdd = () => {
    if (!isValid) return;

    // Construit le pack
    const pack: Pack = createEmptyPackFromPerfume(perfume, volume);
    for (const [perfumeId, qty] of Object.entries(quantities)) {
      if (qty <= 0) continue;
      const p = siblings.find((sib) => sib.id === perfumeId);
      if (!p) continue;
      pack.items.push(createPackItem(p, volume, qty));
    }

    addPackToCart(pack);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
        {/* ═══ HEADER ═══ */}
        <div className="flex items-start justify-between border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex-1 pr-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
              Commande en gros · {packLabel}
            </p>
            <h2 className="mt-1 font-display text-lg sm:text-2xl font-bold tracking-tight">
              Composez votre pack
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Choisissez librement <span className="font-semibold text-foreground">min. {minPieces} pièces</span> à répartir entre les parfums ci-dessous · {formatFCFA(unitPrice)} / unité
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-muted"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ═══ FILTRES MARQUE (nouveau style) ═══ */}
        {!loading && brands.length > 1 && (
          <div className="border-b border-border bg-card">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Marque
              </span>
              <div className="flex-1 overflow-hidden">
                <div className="scrollbar-hide flex gap-1 overflow-x-auto pb-1">
                  <button
                    onClick={() => setSelectedBrand("all")}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                      selectedBrand === "all"
                        ? "text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{
                      backgroundColor: selectedBrand === "all" ? "#1a1a1a" : "transparent",
                    }}
                  >
                    Toutes
                    <span
                      className="ml-1.5 text-[10px]"
                      style={{ color: selectedBrand === "all" ? "#D4AF37" : "#999" }}
                    >
                      {siblings.length}
                    </span>
                  </button>
                  {brands.map((b) => {
                    const count = siblings.filter((p) => p.brand === b).length;
                    const active = selectedBrand === b;
                    return (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                          active
                            ? "text-white shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        style={{
                          backgroundColor: active ? "#1a1a1a" : "transparent",
                        }}
                      >
                        {b}
                        <span
                          className="ml-1.5 text-[10px]"
                          style={{ color: active ? "#D4AF37" : "#999" }}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ GRILLE PARFUMS ═══ */}
        <div className="flex-1 overflow-y-auto bg-background px-3 py-4 sm:px-6 sm:py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div
                className="h-8 w-8 animate-spin rounded-full border-4"
                style={{ borderColor: "#e5e7eb", borderTopColor: "#D4AF37" }}
              />
              <p className="mt-4 text-sm text-muted-foreground">Chargement des parfums...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
              <p className="mt-3 text-sm font-semibold text-red-800">{error}</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              Aucun parfum dans cette catégorie.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
              {displayed.map((p) => (
                <PerfumeGridItem
                  key={p.id}
                  perfume={p}
                  quantity={quantities[p.id] || 0}
                  onInc={() => inc(p.id)}
                  onDec={() => dec(p.id)}
                  onSetQty={(q) => setQty(p.id, q)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ═══ FOOTER STICKY ═══ */}
        <div
          className="border-t border-border bg-card px-4 py-4 sm:px-6 sm:py-5"
          style={{
            boxShadow: "0 -10px 30px -10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Barre de progression */}
          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold">
                {totalPieces}
                <span className="text-muted-foreground"> / {minPieces} pièces</span>
              </span>
              <span
                className="font-semibold"
                style={{ color: isValid ? "#27AE60" : "#B8941E" }}
              >
                {isValid ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    Pack valide
                  </span>
                ) : (
                  `il manque ${missing} pièce${missing > 1 ? "s" : ""}`
                )}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (totalPieces / minPieces) * 100)}%`,
                  backgroundColor: isValid ? "#27AE60" : "#D4AF37",
                }}
              />
            </div>
          </div>

          {/* Total + bouton */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Sous-total
              </p>
              <p className="font-display text-lg sm:text-2xl font-black">
                {formatFCFA(totalPrice)}
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={!isValid}
              className="flex items-center gap-2 rounded-full px-4 py-3 text-xs sm:px-6 sm:text-sm font-bold uppercase tracking-wider text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                backgroundColor: isValid ? "#1a1a1a" : "#999",
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ITEM DE LA GRILLE
// ═══════════════════════════════════════════

function PerfumeGridItem({
  perfume,
  quantity,
  onInc,
  onDec,
  onSetQty,
}: {
  perfume: Perfume;
  quantity: number;
  onInc: () => void;
  onDec: () => void;
  onSetQty: (q: number) => void;
}) {
  const selected = quantity > 0;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border-2 bg-card transition ${
        selected
          ? "border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10"
          : "border-border hover:border-[var(--onyx)]/30"
      }`}
    >
      {/* Badge quantité sélectionnée */}
      {selected && (
        <div
          className="absolute right-2 top-2 z-10 grid h-7 min-w-7 place-items-center rounded-full px-2 text-[11px] font-black text-white shadow-md"
          style={{ backgroundColor: "#D4AF37" }}
        >
          {quantity}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ backgroundColor: perfume.accent }}
        />
        <img
          src={perfume.image}
          alt={perfume.name}
          className="relative h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/200?text=?";
          }}
        />
      </div>

      {/* Infos */}
      <div className="flex flex-1 flex-col p-2 text-center sm:p-3">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--gold)] line-clamp-1">
          {perfume.brand}
        </p>
        <h3 className="mt-0.5 font-display text-[11px] sm:text-xs font-bold tracking-tight line-clamp-2">
          {perfume.name}
        </h3>

        {/* Contrôles quantité */}
        <div className="mt-2 flex items-center justify-center gap-1">
          <button
            onClick={onDec}
            disabled={quantity === 0}
            className="grid h-7 w-7 place-items-center rounded-full border border-border transition hover:border-[var(--onyx)] hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Retirer une pièce"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="number"
            value={quantity || ""}
            placeholder="0"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onSetQty(isNaN(v) ? 0 : Math.max(0, v));
            }}
            className="h-7 w-10 rounded border border-border bg-background text-center text-xs font-bold outline-none focus:border-[var(--gold)]"
            min={0}
          />
          <button
            onClick={onInc}
            className="grid h-7 w-7 place-items-center rounded-full border border-border transition hover:border-[var(--onyx)] hover:bg-muted"
            aria-label="Ajouter une pièce"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}