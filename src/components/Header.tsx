// src/components/Header.tsx
import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { useCart } from "../lib/cart";

const storeItems: { label: string; to: string }[] = [
  { label: "Parfums authentiques homme", to: "/homme" },
  { label: "Parfums authentiques femme", to: "/femme" },
  { label: "Prestige Homme", to: "/prestige-homme" as any },
  { label: "Prestige Femme", to: "/prestige-femme" as any },
  { label: "Diffuseur", to: "/diffuseur" },
];

const navLinks = [
  { label: "À propos", hash: "apropos" },
  { label: "Partenaires", hash: "partenaires" },
];

const contactLink = { label: "Contact", to: "/contact" as const };

export function Header() {
  const { totalItems, isHydrated } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ECECEC]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Barre supérieure : recherche | logo | actions */}
        <div className="relative flex items-center justify-between gap-3 py-4 lg:py-5">

          {/* Recherche desktop (gauche) */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="search"
                placeholder="Rechercher un produit, une catégorie, un vendeur..."
                className="h-10 w-full pl-12 pr-4 rounded-full bg-[#FAF8F4] border border-[#ECECEC] text-sm text-[#1B1B1B] placeholder:text-[#6B7280] outline-none focus:ring-2 focus:ring-[#B8873A]/30 focus:border-[#B8873A] transition-all duration-300"
              />
            </div>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-[#1B1B1B]"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo (centre) */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-shrink-0">
            <img src={logo} alt="AMANYA" className="w-44 h-10 object-contain" />
          </Link>

          {/* Actions utilisateur (droite) */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
            <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#B8873A] hover:text-[#1B1B1B] transition-colors duration-300">
              <User className="h-5 w-5" />
              Se connecter
            </Link>

            <Link to="/wishlist" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#B8873A] hover:text-[#1B1B1B] transition-colors duration-300">
              <Heart className="h-5 w-5" />
              Favoris
            </Link>

            <Link
              to="/panier"
              className="relative flex items-center gap-2 text-sm font-bold text-[#B8873A] hover:text-[#1B1B1B] transition-colors duration-300"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Panier</span>
              {isHydrated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 sm:static sm:ml-0 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-[#B8873A] rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Recherche mobile */}
        {/* <div className="hidden pb-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="search"
              placeholder="Rechercher un produit..."
              className="h-10 w-full pl-12 pr-4 rounded-full bg-[#FAF8F4] border border-[#ECECEC] text-sm placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#B8873A]/30"
            />
          </div>
        </div> */}
      </div>
      {/* Navigation desktop */}
      <nav className="bg-black hidden lg:flex items-center justify-center gap-6 xl:gap-8 p-3" aria-label="Navigation principale">
        <Link to="/" className="relative text-sm font-medium text-white py-1 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B8873A] after:rounded-full">
          Accueil
        </Link>
        <div className="group relative">
          <Link to="/store" className="flex items-center gap-1 text-sm font-medium text-[#B8873A] hover:text-white/80 transition-colors duration-300 py-1">
            Amanya Store
            <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
          </Link>
          <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="overflow-hidden rounded-xl border border-[#B8873A]/20 bg-black shadow-2xl ring-1 ring-white/5">
              <ul className="py-2">
                {storeItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="block px-5 py-2.5 text-sm text-[#E8C98A] transition hover:bg-white/5 hover:text-[#B8873A]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Link to="/marketplace" className="flex items-center gap-1 text-sm font-medium text-[#B8873A] hover:text-white/80 transition-colors duration-300 py-1">
          Marketplace
        </Link>
        {navLinks.map((l) => (
          <a key={l.label} href={`/#${l.hash}`} className="text-sm font-medium text-[#B8873A] hover:text-white/80 transition-colors duration-300 py-1">
            {l.label}
          </a>
        ))}
        <Link to={contactLink.to} className="text-sm font-medium text-[#B8873A] hover:text-white/80 transition-colors duration-300 py-1">
          {contactLink.label}
        </Link>
      </nav>

      {/* Menu mobile déroulant */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[#ECECEC] bg-white" aria-label="Navigation mobile">
          <ul className="max-w-[1280px] mx-auto px-4 py-4 space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl bg-[#B8873A]/5 text-[#B8873A] font-medium"
              >
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#FAF8F4] transition-colors duration-300">
                <Link
                  to="/store"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-left"
                >
                  Amanya Store
                </Link>
                <button
                  onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                  className="ml-2 p-1"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${storeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {storeDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-1">
                  {storeItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={() => {
                          setMobileOpen(false);
                          setStoreDropdownOpen(false);
                        }}
                        className="block px-4 py-2.5 text-sm text-[#6B7280] hover:bg-[#FAF8F4] rounded-lg transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#FAF8F4] transition-colors duration-300">
                Marketplace
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={`/#${l.hash}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#FAF8F4] transition-colors duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to={contactLink.to} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#FAF8F4] transition-colors duration-300">
                {contactLink.label}
              </Link>
            </li>
            <li className="pt-2 border-t border-[#ECECEC] mt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-[#6B7280]">
                <User className="h-5 w-5" />
                Se connecter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
