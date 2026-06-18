// src/routes/panier.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Receipt,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { CheckoutModal } from "../components/CheckoutModal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useCart } from "../lib/cart";
import { formatFCFA } from "../lib/perfumes";

export const Route = createFileRoute("/panier")({
  component: PanierPage,
  head: () => ({
    meta: [
      { title: "Panier — AMANYA" },
      { name: "description", content: "Récapitulatif de votre commande AMANYA" },
    ],
  }),
});

function PanierPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isHydrated,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  // Évite le mismatch SSR
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="h-32 animate-pulse rounded-2xl bg-muted" />
        </div>
        <Footer />
      </div>
    );
  }

  // ============================================================
  // PANIER VIDE
  // ============================================================
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[var(--gold)]/10">
            <ShoppingBag className="h-10 w-10 text-[var(--gold)]" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl">
            Votre panier est vide
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Découvrez notre collection de parfums et diffuseurs et ajoutez-les ici pour passer
            commande.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/homme"
              className="rounded-full bg-[var(--onyx)] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
            >
              Parfums Homme
            </Link>
            <Link
              to="/femme"
              className="rounded-full border border-[var(--onyx)] bg-card px-8 py-3 text-sm font-bold uppercase tracking-wider text-[var(--onyx)] transition hover:bg-[var(--onyx)] hover:text-white"
            >
              Parfums Femme
            </Link>
            <Link
              to="/diffuseur"
              className="rounded-full border border-[var(--onyx)] bg-card px-8 py-3 text-sm font-bold uppercase tracking-wider text-[var(--onyx)] transition hover:bg-[var(--onyx)] hover:text-white"
            >
              Diffuseurs
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // ============================================================
  // PANIER REMPLI
  // ============================================================
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-[var(--secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-[var(--ruby)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Continuer mes achats
          </Link>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Mon panier</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalItems}</span> article
            {totalItems > 1 ? "s" : ""} ·{" "}
            <span className="font-semibold">{items.length}</span> référence
            {items.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8">
        {/* LIGNES DU PANIER */}
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:p-5"
            >
              <div
                className="aspect-square w-full overflow-hidden rounded-xl sm:h-32 sm:w-32"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
                  {item.brand}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold">{item.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Volume : <span className="font-semibold">{item.volume} ml</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Prix unitaire :{" "}
                  <span className="font-semibold text-foreground">
                    {formatFCFA(item.unitPrice)}
                  </span>
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--gold)]">
                  Min. {item.minQuantity} pièces
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= item.minQuantity}
                      className="grid h-9 w-9 place-items-center transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Diminuer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      min={item.minQuantity}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          parseInt(e.target.value, 10) || item.minQuantity
                        )
                      }
                      className="h-9 w-14 border-x border-border bg-transparent text-center text-sm font-semibold outline-none"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center transition hover:bg-muted"
                      aria-label="Augmenter"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--ruby)] transition hover:bg-[var(--ruby)]/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Retirer
                  </button>
                </div>
              </div>

              <div className="flex sm:flex-col sm:items-end sm:justify-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:hidden">
                  Sous-total :
                </p>
                <p className="ml-auto font-display text-xl font-bold sm:ml-0">
                  {formatFCFA(item.quantity * item.unitPrice)}
                </p>
              </div>
            </article>
          ))}

          <button
            onClick={() => {
              if (confirm("Vider tout le panier ?")) clearCart();
            }}
            className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-[var(--ruby)]"
          >
            Vider le panier
          </button>
        </div>

        {/* RÉCAP + ACTION */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Récapitulatif</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Articles</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-semibold">{formatFCFA(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-xs italic text-muted-foreground">À convenir</span>
            </div>
          </div>
          <div className="my-4 border-t border-border" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider">Total</span>
            <span className="font-display text-3xl font-bold">{formatFCFA(totalPrice)}</span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--onyx)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
          >
            <Receipt className="h-4 w-4" />
            Commander
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Vous recevrez un email de confirmation avec le reçu PDF détaillé. Notre équipe
            vous contactera ensuite pour la livraison.
          </p>
        </aside>
      </section>

      <Footer />

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </div>
  );
}