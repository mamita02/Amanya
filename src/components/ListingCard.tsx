import { Link } from "@tanstack/react-router";
import { Heart, MapPin, BadgeCheck } from "lucide-react";
import { type Listing, formatPrice } from "../lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-[var(--teal)]/40 hover:shadow-xl hover:shadow-[var(--navy)]/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {listing.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
            En vedette
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur transition hover:bg-white hover:text-destructive"
          aria-label="Favori"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-[var(--ocean)]">
          {listing.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{listing.location}</span>
          <span className="mx-1">·</span>
          <span>{listing.postedAt}</span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="font-display text-lg font-bold text-[var(--navy)]">
              {formatPrice(listing.price, listing.currency)}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={listing.seller.avatar} alt={listing.seller.name} className="h-6 w-6 rounded-full object-cover" />
            {listing.seller.verified && <BadgeCheck className="h-4 w-4 text-[var(--teal)]" />}
          </div>
        </div>
      </div>
    </Link>
  );
}
