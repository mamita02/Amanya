export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[var(--navy)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--teal)] to-[var(--cyan)] font-display font-bold text-[var(--navy)]">D</div>
              <span className="font-display text-xl font-bold text-white">DakarMarché</span>
            </div>
            <p className="mt-3 text-sm text-white/60">La plateforme de petites annonces la plus élégante du Sénégal.</p>
          </div>
          {[
            { title: "Catégories", links: ["Véhicules", "Immobilier", "Électronique", "Emploi"] },
            { title: "À propos", links: ["Notre histoire", "Équipe", "Carrières", "Presse"] },
            { title: "Support", links: ["Centre d'aide", "Sécurité", "Contact", "Conditions"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/60 transition hover:text-[var(--cyan)]">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} DakarMarché. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
