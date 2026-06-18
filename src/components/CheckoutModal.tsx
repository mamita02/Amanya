// src/components/CheckoutModal.tsx
// Modal de finalisation de commande.
// Tout passe par email automatique via Resend (logo image + PDF en PJ).

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../lib/cart";
import { sendOrder } from "../lib/orderApi";
import { formatFCFA } from "../lib/perfumes";
import {
  downloadReceipt,
  generateOrderNumber,
  type ReceiptOrder,
} from "../lib/receipt";

type Props = {
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export function CheckoutModal({ onClose }: Props) {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const isFormValid = name.trim().length >= 2 && phone.trim().length >= 6;
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const buildOrder = (): ReceiptOrder => ({
    orderNumber: generateOrderNumber(),
    date: new Date(),
    customer: {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    },
    items: items.map((i) => ({
      brand: i.brand,
      name: i.name,
      volume: i.volume,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
    totalItems,
    totalPrice,
  });

  const handlePreview = async () => {
    if (!isFormValid) {
      toast.error("Renseignez d'abord votre nom et téléphone");
      return;
    }
    setPreviewLoading(true);
    try {
      const order = buildOrder();
      await downloadReceipt(order);
      toast.success("Aperçu PDF téléchargé");
    } catch (err) {
      toast.error("Erreur lors de la génération de l'aperçu");
      console.error(err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Veuillez renseigner votre nom et téléphone");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const order = buildOrder();
      const result = await sendOrder(order);

      setConfirmedOrderNumber(result.orderNumber);
      setStatus("success");
      toast.success("Commande envoyée avec succès !");

      // Vider le panier après 1s pour ne pas surprendre le user
      setTimeout(() => clearCart(), 1000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setErrorMsg(msg);
      setStatus("error");
      toast.error("Erreur lors de l'envoi");
    }
  };

  // ============== ÉCRAN DE SUCCÈS ==============
  if (isSuccess && confirmedOrderNumber) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-background p-8 text-center shadow-2xl sm:rounded-3xl">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold">Commande envoyée !</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Votre commande a bien été reçue par notre équipe. Vous serez contacté très
            prochainement pour la confirmation.
          </p>

          <div className="mt-6 rounded-xl bg-secondary p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Numéro de commande
            </p>
            <p className="mt-1 font-display text-xl font-bold text-[var(--ruby)]">
              {confirmedOrderNumber}
            </p>
          </div>

          {email && (
            <p className="mt-4 text-xs text-muted-foreground">
              📧 Une confirmation a été envoyée à <strong>{email}</strong> avec le reçu en
              pièce jointe.
            </p>
          )}
          {!email && (
            <p className="mt-4 text-xs text-muted-foreground">
              💡 Pour la prochaine fois, renseignez votre email pour recevoir une confirmation.
            </p>
          )}

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-full bg-[var(--onyx)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)]"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  // ============== ÉCRAN PRINCIPAL ==============
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden
      />
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border bg-[var(--onyx)] px-6 py-5 text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
              Finalisation
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">Votre commande</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full p-2 transition hover:bg-white/10 disabled:opacity-50"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="rounded-xl bg-secondary px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {totalItems} article{totalItems > 1 ? "s" : ""} · {items.length} référence
                {items.length > 1 ? "s" : ""}
              </span>
              <span className="font-display text-xl font-bold">{formatFCFA(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Vos coordonnées
            </h3>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Nom complet *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Awa Diop"
                    disabled={isSubmitting}
                    className="mt-1 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Téléphone *
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 ..."
                    type="tel"
                    disabled={isSubmitting}
                    className="mt-1 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email <span className="text-[var(--gold)]">(recommandé — pour recevoir la confirmation)</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="awa@example.com"
                  type="email"
                  disabled={isSubmitting}
                  className="mt-1 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Adresse de livraison
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mermoz Pyrotechnie, Dakar"
                  disabled={isSubmitting}
                  className="mt-1 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Notes (optionnel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Préférences de livraison, créneau horaire..."
                  disabled={isSubmitting}
                  className="mt-1 w-full resize-none rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
                />
              </div>
            </div>
          </div>

          {status === "error" && errorMsg && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[var(--ruby)]/10 p-3 text-xs text-[var(--ruby)]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <strong>Échec de l'envoi.</strong> {errorMsg}
                <br />
                <span className="text-[var(--ruby)]/80">
                  Réessayez ou contactez-nous au +221 77 000 00 00.
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handlePreview}
            disabled={!isFormValid || isSubmitting || previewLoading}
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground underline transition hover:text-[var(--ruby)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {previewLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Download className="h-3 w-3" />
            )}
            {previewLoading ? "Génération..." : "Télécharger l'aperçu du reçu (sans envoyer)"}
          </button>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-muted disabled:opacity-50"
          >
            Retour
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--onyx)] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--ruby)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
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
      </div>
    </div>
  );
}