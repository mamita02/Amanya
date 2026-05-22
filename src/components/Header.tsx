import { Link } from "@tanstack/react-router";
import { Search, Menu, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";

const storeItems: { label: string; to: string }[] = [
  { label: "Parfums", to: "/#partenaires" },
  { label: "Vêtements", to: "/vetements" },
  { label: "Cosmétiques", to: "/cosmetiques" },
  { label: "Accessoires", to: "/accessoires" },
];

const navLinks = [
  { label: "À propos", hash: "apropos" },
  { label: "Partenaires", hash: "partenaires" },
  { label: "Contact", hash: "contact" },
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
          <li>
            <Link to="/" className="transition hover:text-[var(--gold)]">
              Accueil
            </Link>
          </li>

          {/* Dropdown Amanya Store */}
          <li className="group relative">
            <button className="inline-flex items-center gap-1 transition hover:text-[var(--gold)]">
              Amanya Store
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[var(--gold)]/20 bg-[var(--onyx)] shadow-2xl shadow-black/50 ring-1 ring-white/5">
                <ul className="py-2">
                  {storeItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.to}
                        className="block px-5 py-2.5 text-sm text-[var(--gold-soft)] transition hover:bg-white/5 hover:text-[var(--gold)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={`#${l.hash}`} className="transition hover:text-[var(--gold)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
