import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/Logo.png";

export function Footer() {
  return (
    <footer className="border-t border-[#ECECEC] bg-[#FAF8F4] text-[#161616]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Section Marque / Brand */}
          <div className="md:max-w-xs">
            <img
              src={logo}
              alt="AMANYA"
              className="h-14 w-auto md:h-16 object-contain"
            />
            <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
              Parfums, vêtements et diffuseurs authentiques pour grossistes, revendeurs et
              particuliers au Sénégal.
            </p>
          </div>

          {/* Groupe Droite : 3 Colonnes */}
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 md:max-w-3xl md:pl-12">
            {/* Navigation */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#B8873A]">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Nos partenaires", href: "/#partenaires" },
                  { label: "À propos", href: "/#about" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[#161616] transition-colors hover:text-[#B8873A]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Catégories */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#B8873A]">
                Catégories
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "Vêtements", href: "/vetements" },
                  { label: "Homme", href: "/homme" },
                  { label: "Femme", href: "/femme" },
                  { label: "Diffuseur", href: "/diffuseur" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[#161616] transition-colors hover:text-[#B8873A]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#B8873A]">
                Contact
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-[#161616]">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[#B8873A]" />
                  <a href="mailto:contact@amanya-distribution.com" className="transition-colors hover:text-[#B8873A]">
                    contact@amanya-distribution.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#B8873A]" />
                  <a href="tel:+221338200936" className="transition-colors hover:text-[#B8873A]">
                    +221 33 820 09 36
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-[#B8873A] mt-0.5" />
                  <span>Dakar, Ouest Foire, Sénégal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pied de page : Droits réservés & Liens Légaux */}
        <div className="mt-12 border-t border-[#ECECEC] pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} AMANYA. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[#B8873A]">
              CGV
            </a>
            <span>·</span>
            <a href="#" className="transition-colors hover:text-[#B8873A]">
              Politiques de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}