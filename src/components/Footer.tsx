import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[var(--onyx)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="md:max-w-xs">
            <span className="font-display text-3xl font-black tracking-[0.25em] bg-gradient-to-b from-[var(--ruby-bright)] via-[var(--ruby)] to-[var(--ruby-bright)] bg-clip-text text-transparent">
              AMANYA
            </span>
            <p className="mt-4 text-sm text-white/60">
              Parfums, vêtements et diffuseurs authentiques pour grossistes, revendeurs et
              particuliers au Sénégal.
            </p>
          </div>

          {/* Right group: 3 columns equally spaced */}
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 md:max-w-3xl md:pl-12">
            {/* Navigation */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Nos partenaires", href: "/#partenaires" },
                  { label: "À propos", href: "/#about" },
                  { label: "Contact", href: "/#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/60 transition hover:text-[var(--gold)]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Catégories */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Catégories
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { label: "Vêtements", href: "/vetements" },
                  { label: "Homme", href: "/homme" },
                  { label: "Femme", href: "/femme" },
                  { label: "Diffuseur", href: "/diffuseur" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/60 transition hover:text-[var(--gold)]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Contact
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                  <a href="mailto:contact@amanya.sn" className="hover:text-[var(--gold)]">
                    contact@amanya.sn
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[var(--gold)]" />
                  <a href="tel:+221770000000" className="hover:text-[var(--gold)]">
                    +221 77 000 00 00
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--gold)]" />
                  Dakar, Sénégal
                </li>
                <li className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-white/50">
                  <a href="#" className="hover:text-[var(--gold)] transition">CGV</a>
                  <span className="text-white/30">·</span>
                  <a href="#" className="hover:text-[var(--gold)] transition">Politiques de confidentialité</a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} AMANYA. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
