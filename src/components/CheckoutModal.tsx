// src/components/CheckoutModal.tsx
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Send, X } from "lucide-react";
import { useState } from "react";
import { clearCart, useCart } from "../lib/cart";
import { packsToFlatItems, sendOrder } from "../lib/orderApi";
import { formatFCFA } from "../lib/perfumes";
import type { ReceiptOrder } from "../lib/receipt";

type Props = {
  onClose: () => void;
};

type CheckoutState = "form" | "sending" | "success" | "error";

export function CheckoutModal({ onClose }: Props) {
  const { packs, totalItems, totalPrice } = useCart();

  const [state, setState] = useState<CheckoutState>("form");
  const [error, setError] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Champs du formulaire
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const generateOrderNumber = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${y}${m}${d}-${rand}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;

    if (!name.trim() || !phone.trim()) {
      setError("Le nom et le téléphone sont obligatoires");
      return;
    }

    setState("sending");
    setError("");

    const num = generateOrderNumber();
    setOrderNumber(num);

    try {
      const order: ReceiptOrder = {
        orderNumber: num,
        date: new Date(),
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          address: address.trim() || undefined,
          notes: notes.trim() || undefined,
        },
        items: packsToFlatItems(packs),
        totalItems,
        totalPrice,
      };

      await sendOrder(order);

      // Vide le panier après succès
      clearCart();
      setState("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(msg);
      setState("error");
    }
  };

  // ═══ ÉTAT : SUCCÈS ═══
  if (state === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-background p-8 text-center shadow-2xl">
          <div
            className="mx-auto grid h-16 w-16 place-items-center rounded-full"
            style={{ backgroundColor: "rgba(39,174,96,0.1)" }}
          >
            <CheckCircle2 className="h-8 w-8" style={{ color: "#27AE60" }} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-black">Commande envoyée !</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre commande <span className="font-bold text-foreground">#{orderNumber}</span> a été envoyée avec succès.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Vous recevrez une confirmation par email et notre équipe vous contactera très prochainement pour finaliser le paiement et la livraison.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:opacity-90"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  // ═══ ÉTAT : FORMULAIRE / ENVOI / ERREUR ═══
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={state === "form" ? onClose : undefined}
      />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
              Finalisation
            </p>
            <h2 className="mt-1 font-display text-xl font-black sm:text-2xl">
              Valider ma commande
            </h2>
          </div>
          {state === "form" && (
            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-muted"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {/* Récap panier */}
          <section
            className="mb-6 rounded-xl border border-border bg-card p-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Récapitulatif
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packs</span>
                <span className="font-semibold">{packs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pièces totales</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl font-black">{formatFCFA(totalPrice)}</span>
            </div>
          </section>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Vos coordonnées
            </h3>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nom complet *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={state === "sending"}
                placeholder="Votre nom"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Téléphone *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={state === "sending"}
                placeholder="ex: 77 123 45 67"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email <span style={{ color: "#B8941E" }}>(recommandé — pour recevoir la confirmation)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "sending"}
                placeholder="votre@email.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Adresse de livraison
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={state === "sending"}
                placeholder="Adresse complète"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notes (optionnel)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={state === "sending"}
                placeholder="Instructions particulières..."
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-50"
              />
            </div>

            {/* Erreur */}
            {state === "error" && error && (
              <div
                className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "rgba(220,20,60,0.08)",
                  color: "#DC143C",
                }}
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-bold">Erreur lors de l'envoi</p>
                  <p className="mt-0.5 text-xs">{error}</p>
                </div>
              </div>
            )}

            {/* Boutons */}
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                disabled={state === "sending"}
                className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:bg-muted disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
              <button
                type="submit"
                disabled={state === "sending"}
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Envoyer la commande
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}