// src/components/AddToCartModal.tsx
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../lib/cart";
import { formatFCFA, type Perfume, type Volume } from "../lib/perfumes";

type Props = {
  perfume: Perfume;
  defaultVolume: Volume;
  onClose: () => void;
};

export function AddToCartModal({ perfume, defaultVolume, onClose }: Props) {
  const { addItem, totalItems } = useCart();
  const [volume, setVolume] = useState<Volume>(defaultVolume);
  const [quantity, setQuantity] = useState<number>(1); // <-- Défaut = 1

  const subtotal = quantity * perfume.price;

  const handleQuantityChange = (val: number) => {
    if (Number.isNaN(val) || val < 1) val = 1;
    setQuantity(val);
  };

  const handleAdd = () => {
    addItem({
      perfumeId: perfume.id,
      name: perfume.name,
      brand: perfume.brand,
      image: perfume.image,
      volume,
      quantity,
      unitPrice: perfume.price,
      minQuantity: perfume.minQuantity, // gardé pour compat BD
      category: perfume.category,
    });
    toast.success(`${quantity} × ${perfume.name} ajouté au panier`);
    onClose();
  };

  // Anticipation : ce que sera le panier après ajout
  const futureTotal = totalItems + quantity;
  const remainingAfter = Math.max(0, 25 - futureTotal);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
              {perfume.brand}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold">{perfume.name}</h3>
            <p className="text-xs text-muted-foreground">
              {perfume.type === "Authentique" ? "Eau de Parfum" : "Inspiration"} · {perfume.gender}
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

        {/* CORPS */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* IMAGE + INFOS */}
          <div className="flex gap-4">
            <div
              className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
              style={{ backgroundColor: "#f3f4f6" }}
            >
              <img
                src={perfume.image}
                alt={perfume.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Prix unitaire en gros
              </p>
              <p className="mt-1 font-display text-xl font-bold">
                {formatFCFA(perfume.price)}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--gold)]">
                Panier min. 25 pièces
              </p>
            </div>
          </div>

          {/* VOLUME */}
          {perfume.volumes.length > 1 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Volume
              </p>
              <div className="flex gap-2">
                {perfume.volumes.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVolume(v)}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                      volume === v
                        ? "border-[var(--onyx)] bg-[var(--onyx)] text-white"
                        : "border-border bg-card hover:border-[var(--onyx)]"
                    }`}
                  >
                    {v} ml
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITÉ */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Quantité
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="grid h-12 w-12 place-items-center rounded-lg border border-border bg-card transition hover:border-[var(--onyx)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Diminuer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                className="h-12 flex-1 rounded-lg border border-border bg-background text-center text-lg font-bold outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="grid h-12 w-12 place-items-center rounded-lg border border-border bg-card transition hover:border-[var(--onyx)]"
                aria-label="Augmenter"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Quick picks : valeurs douces */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 5, 10, 25].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    quantity === q
                      ? "border-[var(--onyx)] bg-[var(--onyx)] text-white"
                      : "border-border bg-card hover:border-[var(--onyx)]"
                  }`}
                >
                  {q} {q > 1 ? "pièces" : "pièce"}
                </button>
              ))}
            </div>

            {/* Indicateur panier après ajout */}
            {remainingAfter > 0 && (
              <div className="mt-3 rounded-lg bg-[var(--gold)]/10 p-3 text-xs text-foreground">
                💡 Après ajout : <strong>{futureTotal}/25 pièces</strong> — il manquera{" "}
                <strong>{remainingAfter}</strong> {remainingAfter > 1 ? "pièces" : "pièce"} pour valider votre commande.
              </div>
            )}
            {remainingAfter === 0 && (
              <div className="mt-3 rounded-lg bg-green-50 p-3 text-xs text-green-700">
                ✅ Votre panier atteindra le minimum de 25 pièces après cet ajout.
              </div>
            )}
          </div>

          {/* SOUS-TOTAL */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider">Sous-total</span>
            <span className="font-display text-xl font-bold">{formatFCFA(subtotal)}</span>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-muted"
          >
            Annuler
          </button>
          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--onyx)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}