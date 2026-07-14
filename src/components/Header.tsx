// src/components/Header.tsx
import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { useCart } from "../lib/cart";

const storeItems: { label: string; to: string }[] = [
  { label: "Parfums authentiques homme", to: "/homme" },
  { label: "Femme authentiques femme", to: "/femme" },
  { label: "Prestige Homme", to: "/prestige-homme" as any },
  { label: "Prestige Femme", to: "/prestige-femme" as any },
  { label: "Diffuseur", to: "/diffuseur" },
];

const navLinks = [
  { label: "À propos", hash: "apropos" },
  { label: "Partenaires", hash: "partenaires" },
  { label: "Contact", hash: "contact" },
];

export function Header() {
  const { totalItems, isHydrated } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--onyx)] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Recherche desktop */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              placeholder="Rechercher un produit..."
              className="h-10 w-full max-w-xs rounded-full bg-white/5 pl-11 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition placeholder:text-white/40 focus:ring-[var(--gold)]"
            />
          </div>
        </div>

        {/* Spacer mobile pour centrer le logo */}
        <div className="md:hidden" />

        {/* LOGO */}
        <Link to="/" className="flex items-center justify-center">
          <img src={logo} alt="AMANYA" className="h-10 w-auto sm:h-12 md:h-14" />
        </Link>

        {/* Actions droite */}
        <div className="flex items-center justify-end gap-2">
          <button className="hidden h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] sm:grid" aria-label="Compte">
            <User className="h-4 w-4" />
          </button>
          <button className="hidden h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] sm:grid" aria-label="Favoris">
            <Heart className="h-4 w-4" />
          </button>

          {/* Panier */}
          <Link
            to="/panier"
            className="relative grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-[var(--gold)]"
            aria-label="Panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {isHydrated && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--ruby)] px-1 text-[10px] font-bold text-white shadow-md">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Burger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-[var(--gold)] md:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Nav desktop */}
      <nav className="border-t border-white/5">
        <ul className="mx-auto hidden max-w-7xl items-center justify-center gap-10 px-4 py-3 text-sm font-medium tracking-wide text-[var(--gold-soft)] sm:px-6 lg:px-8 md:flex">
          <li>
            <Link to="/" className="transition hover:text-[var(--gold)]">Accueil</Link>
          </li>
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
                      <Link to={item.to} className="block px-5 py-2.5 text-sm text-[var(--gold-soft)] transition hover:bg-white/5 hover:text-[var(--gold)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={`/#${l.hash}`} className="transition hover:text-[var(--gold)]">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ═══ MENU MOBILE ═══ */}
      {mobileOpen && (
        <div className="border-t border-white/10 md:hidden">
          {/* Recherche mobile */}
          <div className="px-4 pt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                placeholder="Rechercher un produit..."
                className="h-10 w-full rounded-full bg-white/5 pl-11 pr-4 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-[var(--gold)]"
              />
            </div>
          </div>

          <nav className="px-4 py-4">
            <ul className="space-y-1">
              {/* Accueil */}
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5 hover:text-[var(--gold)]"
                >
                  Accueil
                </Link>
              </li>

              {/* Amanya Store — sous-menu */}
              <li>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Amanya Store
                </p>
                <ul className="space-y-1 pl-2">
                  {storeItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-[var(--gold)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Divider */}
              <li className="py-2">
                <div className="h-px bg-white/10" />
              </li>

              {/* Liens ancre */}
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={`/#${l.hash}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5 hover:text-[var(--gold)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}

              {/* Divider */}
              <li className="py-2">
                <div className="h-px bg-white/10" />
              </li>

              {/* Panier mobile */}
              <li>
                <Link
                  to="/panier"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5 hover:text-[var(--gold)]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Mon panier
                  </span>
                  {isHydrated && totalItems > 0 && (
                    <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[var(--ruby)] px-1.5 text-[11px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}