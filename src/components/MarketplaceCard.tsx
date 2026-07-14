import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import type { MarketPlace } from "../lib/marketplace";

export type { MarketPlace };

export function MarketplaceCard({ marketplace }: { marketplace: MarketPlace }) {
  return (
    <Link
      to="/marketplace/$id"
      params={{ id: marketplace.id }}
      title={marketplace.name}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-xl hover:shadow-[var(--onyx)]/10"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: marketplace.bgColor ?? "#F5EDE5" }}
      >
        {marketplace.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--onyx)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] shadow-md">
            En vedette
          </span>
        )}
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur transition group-hover:bg-white group-hover:text-[var(--ruby)]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <img
          src={marketplace.logo}
          alt={marketplace.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-[var(--ruby)]">
          {marketplace.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{marketplace.location}</span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="font-display text-sm font-bold text-[var(--ruby)]">
            {marketplace.domain}
          </div>
          <BadgeCheck className="h-5 w-5 text-[var(--gold)]" />
        </div>
      </div>
    </Link>
  );
}
