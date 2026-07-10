// src/routes/panier.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CheckoutModal } from "../components/CheckoutModal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  getMissingPieces,
  getPackLabel,
  getPackTotalPieces,
  getPackTotalPrice,
  isPackValid,
  removeItemFromPack,
  removePack,
  updateItemQuantity,
  useCart,
  type Pack,
} from "../lib/cart";
import { formatFCFA } from "../lib/perfumes";

export const Route = createFileRoute("/panier")({
  component: PanierPage,
  head: () => ({
    meta: [{ title: "Mon Panier — AMANYA" }],
  }),
});

function PanierPage() {
  const { packs, totalItems, totalPrice, allPacksValid, isHydrated } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--gold)]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <EmptyCart />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-[var(--gold)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continuer les achats
            </Link>
            <h1 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
              Mon panier
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{packs.length}</span> pack
              {packs.length > 1 ? "s" : ""} · <span className="font-bold text-foreground">{totalItems}</span> pièce
              {totalItems > 1 ? "s" : ""} au total
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
          {/* Colonne packs */}
          <div className="space-y-6">
            {packs.map((pack) => (
              <PackCard key={pack.key} pack={pack} />
            ))}
          </div>

          {/* Colonne récap (sticky sur desktop) */}
          <div>
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                allValid={allPacksValid}
                packsCount={packs.length}
                onCheckout={() => setShowCheckout(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </div>
  );
}

// ═══════════════════════════════════════════
// PANIER VIDE
// ═══════════════════════════════════════════

function EmptyCart() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div
        className="mx-auto grid h-24 w-24 place-items-center rounded-full"
        style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
      >
        <ShoppingBag className="h-10 w-10" style={{ color: "#D4AF37" }} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-black">Votre panier est vide</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Découvrez notre catalogue et composez vos packs de parfums en gros.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/homme"
          className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:opacity-90"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          Parfums Homme
        </Link>
        <Link
          to="/femme"
          className="rounded-full border border-[var(--onyx)] px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:bg-[var(--onyx)] hover:text-white"
        >
          Parfums Femme
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CARTE D'UN PACK
// ═══════════════════════════════════════════

function PackCard({ pack }: { pack: Pack }) {
  const totalPieces = getPackTotalPieces(pack);
  const totalPrice = getPackTotalPrice(pack);
  const valid = isPackValid(pack);
  const missing = getMissingPieces(pack);
  const label = getPackLabel(pack.category, pack.volume);

  const handleRemovePack = () => {
    if (confirm(`Supprimer le pack "${label}" du panier ?`)) {
      removePack(pack.key);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header pack */}
      <div
        className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5 sm:py-4"
        style={{ backgroundColor: "rgba(212,175,55,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-full"
            style={{ backgroundColor: "rgba(212,175,55,0.15)" }}
          >
            <Package className="h-5 w-5" style={{ color: "#B8941E" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              Pack en gros
            </p>
            <h3 className="font-display text-base font-black tracking-tight sm:text-lg">
              {label}
            </h3>
          </div>
        </div>
        <button
          onClick={handleRemovePack}
          className="rounded-full p-2 text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
          title="Supprimer le pack"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Items */}
      <ul className="divide-y divide-border">
        {pack.items.map((item) => (
          <PackItemRow key={item.perfumeId} packKey={pack.key} item={item} />
        ))}
      </ul>

      {/* Footer pack */}
      <div className="border-t border-border bg-background px-4 py-3 sm:px-5 sm:py-4">
        {/* Barre de progression */}
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-semibold">
              {totalPieces}
              <span className="text-muted-foreground"> / {pack.minPieces} pièces</span>
            </span>
            <span
              className="font-semibold"
              style={{ color: valid ? "#27AE60" : "#DC143C" }}
            >
              {valid ? (
                "✓ Pack complet"
              ) : (
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {missing} pièce{missing > 1 ? "s" : ""} manquante{missing > 1 ? "s" : ""}
                </span>
              )}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (totalPieces / pack.minPieces) * 100)}%`,
                backgroundColor: valid ? "#27AE60" : "#DC143C",
              }}
            />
          </div>
        </div>

        {/* Total pack */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {totalPieces} × {formatFCFA(pack.unitPrice)}
          </p>
          <p className="font-display text-lg font-black">{formatFCFA(totalPrice)}</p>
        </div>
      </div>
    </article>
  );
}

// ═══════════════════════════════════════════
// LIGNE D'UN ITEM DANS UN PACK
// ═══════════════════════════════════════════

function PackItemRow({
  packKey,
  item,
}: {
  packKey: string;
  item: { perfumeId: string; name: string; brand: string; image: string; unitPrice: number; quantity: number };
}) {
  const [inputValue, setInputValue] = useState(String(item.quantity));

  // Sync avec la valeur du store
  useMemo(() => {
    setInputValue(String(item.quantity));
  }, [item.quantity]);

  const inc = () => updateItemQuantity(packKey, item.perfumeId, item.quantity + 1);
  const dec = () => updateItemQuantity(packKey, item.perfumeId, Math.max(0, item.quantity - 1));
  const remove = () => removeItemFromPack(packKey, item.perfumeId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      updateItemQuantity(packKey, item.perfumeId, num);
    }
  };

  return (
    <li className="flex items-center gap-3 p-3 sm:p-4">
      {/* Image */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-16 sm:w-16">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/60?text=?";
          }}
        />
      </div>

      {/* Infos */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
          {item.brand}
        </p>
        <h4 className="truncate text-sm font-bold">{item.name}</h4>
        <p className="text-xs text-muted-foreground">
          {formatFCFA(item.unitPrice)} / pièce
        </p>
      </div>

      {/* Quantité + supprimer */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
          <button
            onClick={dec}
            className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-muted"
            aria-label="Retirer une pièce"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="w-10 bg-transparent text-center text-sm font-bold outline-none"
            min={0}
          />
          <button
            onClick={inc}
            className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-muted"
            aria-label="Ajouter une pièce"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <button
          onClick={remove}
          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
          title="Retirer du pack"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}

// ═══════════════════════════════════════════
// RÉCAPITULATIF (colonne droite)
// ═══════════════════════════════════════════

function OrderSummary({
  totalItems,
  totalPrice,
  allValid,
  packsCount,
  onCheckout,
}: {
  totalItems: number;
  totalPrice: number;
  allValid: boolean;
  packsCount: number;
  onCheckout: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-lg font-black">Récapitulatif</h2>

      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Nombre de packs</span>
          <span className="font-semibold">{packsCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total pièces</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total à régler
          </span>
        </div>
        <p className="mt-1 font-display text-3xl font-black">{formatFCFA(totalPrice)}</p>
      </div>

      {!allValid && (
        <div
          className="mt-4 flex gap-2 rounded-lg px-3 py-2.5 text-xs"
          style={{
            backgroundColor: "rgba(220,20,60,0.08)",
            color: "#DC143C",
          }}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>Un ou plusieurs packs sont incomplets.</strong> Ajoutez des pièces pour atteindre le minimum requis avant de valider.
          </span>
        </div>
      )}

      <button
        onClick={onCheckout}
        disabled={!allValid}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider text-white transition disabled:cursor-not-allowed disabled:opacity-40"
        style={{ backgroundColor: allValid ? "#1a1a1a" : "#999" }}
      >
        <ShoppingBag className="h-4 w-4" />
        Valider la commande
      </button>

      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        Paiement sécurisé · Livraison sous 3-5 jours
      </p>
    </div>
  );
}