import { Link } from "@tanstack/react-router";
import { Search, Menu, Plus, Heart, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--teal)] text-white font-display font-bold">
              D
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Dakar<span className="text-[var(--teal)]">Marché</span></span>
          </Link>

          <div className="hidden flex-1 max-w-xl md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Rechercher une annonce, une marque, un modèle..."
                className="h-10 w-full rounded-full border border-input bg-secondary/40 pl-10 pr-4 text-sm outline-none transition focus:border-[var(--teal)] focus:bg-background focus:ring-2 focus:ring-[var(--teal)]/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden h-10 w-10 place-items-center rounded-full hover:bg-secondary sm:grid" aria-label="Favoris">
              <Heart className="h-4 w-4" />
            </button>
            <button className="hidden h-10 w-10 place-items-center rounded-full hover:bg-secondary sm:grid" aria-label="Compte">
              <User className="h-4 w-4" />
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:shadow-lg hover:shadow-[var(--teal)]/30"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Publier</span>
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
