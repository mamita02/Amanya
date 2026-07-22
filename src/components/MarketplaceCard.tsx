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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ECECEC] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B8873A]/50 shadow-sm hover:shadow-xl hover:shadow-[#161616]/5"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: marketplace.bgColor ?? "#F5EDE5" }}
      >
        {marketplace.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#161616] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#B8873A] shadow-md">
            En vedette
          </span>
        )}
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#161616] backdrop-blur transition-all group-hover:bg-[#B8873A] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <img
          src={marketplace.logo}
          alt={marketplace.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-medium leading-snug text-[#161616] line-clamp-1 transition-colors group-hover:text-[#B8873A]">
          {marketplace.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6B7280]">
          <MapPin className="h-3.5 w-3.5 text-[#B8873A]" />
          <span>{marketplace.location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#ECECEC]/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8873A]">
            {marketplace.domain}
          </span>
          <BadgeCheck className="h-5 w-5 text-[#B8873A]" />
        </div>
      </div>
    </Link>
  );
}