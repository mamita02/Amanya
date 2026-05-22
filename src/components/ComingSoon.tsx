import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ComingSoon({ category, tagline }: { category: string; tagline: string }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative isolate overflow-hidden bg-[var(--onyx)] text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--ruby)]/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[var(--gold)]/10 blur-[100px]" />
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)] backdrop-blur">
            <Clock className="h-3.5 w-3.5" />
            Bientôt disponible
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold-soft)]">
            {tagline}
          </p>
          <h1 className="mt-4 font-display text-6xl font-black tracking-tight sm:text-8xl">
            <span className="bg-gradient-to-b from-[var(--ruby-bright)] via-[var(--ruby)] to-[var(--ruby-bright)] bg-clip-text text-transparent">
              {category}
            </span>
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
            Notre collection <span className="text-[var(--gold)]">{category.toLowerCase()}</span> arrive très prochainement.
            Une sélection exclusive de marques de prestige soigneusement choisies pour vous.
          </p>

          <Link
            to="/"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-soft)] backdrop-blur transition hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
