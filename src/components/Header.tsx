import { Link } from "@tanstack/react-router";
import { Search, Menu, Heart, User, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "À propos", to: "/" },
  { label: "Amanya Store", to: "/" },
  { label: "Parfums", to: "/" },
  { label: "Vêtements", to: "/" },
  { label: "Cosmétiques", to: "/" },
  { label: "Accessoires", to: "/" },
  { label: "Partenaires", to: "/" },
  { label: "Contact", to: "/" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--onyx)] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              placeholder="Rechercher un produit..."
              className="h-10 w-full max-w-xs rounded-full bg-white/5 pl-11 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition placeholder:text-white/40 focus:ring-[var(--gold)]"
            />
          </div>
        </div>

        <Link to="/" className="flex items-center justify-center">
          <span className="font-display text-3xl font-black tracking-[0.25em] bg-gradient-to-b from-[var(--ruby-bright)] via-[var(--ruby)] to-[var(--ruby-bright)] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(255,215,140,0.35)] sm:text-4xl">
            AMANYA
          </span>
        </Link>

        <div className="flex items-center justify-end gap-2">
          <button className="hidden h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] sm:grid" aria-label="Compte">
            <User className="h-4 w-4" />
          </button>
          <button className="hidden h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] sm:grid" aria-label="Favoris">
            <Heart className="h-4 w-4" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)]" aria-label="Panier">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="border-t border-white/5">
        <ul className="mx-auto hidden max-w-7xl items-center justify-center gap-10 px-4 py-3 text-sm font-medium tracking-wide text-[var(--gold-soft)] sm:px-6 lg:px-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="transition hover:text-[var(--gold)]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
