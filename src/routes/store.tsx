import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye, Grid3X3, Heart, List, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import heroVideo from "../assets/slide-amanya.mp4";
import { AddToCartModal } from "../components/AddToCartModal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  formatFCFA,
  getAllPerfumesForAdmin,
  type Perfume,
  type PerfumeFamily,
  type Volume,
} from "../lib/supabase";

export const Route = createFileRoute("/store")({
  loader: () => getAllPerfumesForAdmin(),
  component: StorePage,
  head: () => ({ meta: [
    { title: "Amanya Store — AMANYA" },
    { name: "description", content: "Découvrez tous les produits disponibles dans l'Amanya Store." },
  ] }),
});

const CATEGORIES = [
  ["diffuseur", "Diffuseur"],
  ["femme", "Parfum Authentique Femme"],
  ["homme", "Parfum Authentique Homme"],
  ["prestige-femme", "Prestige Femme"],
  ["prestige-homme", "Prestige Homme"],
] as const;

const FAMILIES: PerfumeFamily[] = ["Aquatique", "Aromatique", "Boisé", "Chypré", "Épicé", "Floral", "Fruité", "Oriental"];

function toggleItem<T>(items: T[], item: T) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}

function StorePage() {
  const products = Route.useLoaderData();
  return <StoreExperience products={products} />;
}

export function StoreExperience({ products, wishlistOnly = false }: { products: Perfume[]; wishlistOnly?: boolean }) {
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [families, setFamilies] = useState<PerfumeFamily[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState<Perfume | null>(null);
  const [orderSelection, setOrderSelection] = useState<{ product: Perfume; volume: Volume } | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 28;

  useEffect(() => {
    try { setWishlist(JSON.parse(localStorage.getItem("amanya-wishlist") || "[]")); } catch { setWishlist([]); }
  }, []);

  const brandOptions = useMemo(() => [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, "fr")), [products]);
  const quantityOptions = useMemo(() => [...new Set(products.map((p) => Number(p.minQuantity)))].sort((a, b) => a - b), [products]);
  const typeCount = (type: string) => products.filter((p) => p.isActive && p.type === type).length;

  const filtered = useMemo(() => products.filter((product) => {
    if (wishlistOnly && !wishlist.includes(product.id)) return false;
    if (types.length && !types.includes(product.type)) return false;
    if (brands.length && !brands.includes(product.brand)) return false;
    if (families.length && !families.some((family) => product.families.includes(family))) return false;
    if (quantities.length && !quantities.includes(Number(product.minQuantity))) return false;
    if (volumes.length && !product.volumes.some((volume) => volumes.includes(volume))) return false;
    if (categories.length && !categories.includes(product.category)) return false;
    return true;
  }), [products, wishlistOnly, wishlist, types, brands, families, quantities, volumes, categories]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / productsPerPage));
  const visibleProducts = filtered.slice((page - 1) * productsPerPage, page * productsPerPage);

  useEffect(() => {
    setPage(1);
  }, [types, brands, families, quantities, volumes, categories, wishlistOnly]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const toggleWishlist = (id: string) => {
    const next = toggleItem(wishlist, id);
    setWishlist(next);
    localStorage.setItem("amanya-wishlist", JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-white text-[var(--onyx)]">
      <Header />
      {!wishlistOnly && <section className="relative isolate overflow-hidden bg-[var(--onyx)]">
        <div className="relative h-[calc(100vh-120px)] min-h-[540px] w-full">
          <video src={heroVideo} autoPlay muted loop playsInline aria-label="Présentation d'AMANYA" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>}

      <main className="mx-auto max-w-[1600px] px-4 py-14 sm:px-7 lg:px-10">
        {wishlistOnly && <div className="mb-12 border-b border-black pb-6"><h1 className="font-display text-4xl font-bold">Ma wishlist</h1><p className="mt-2 text-sm text-neutral-500">{wishlist.length} produit{wishlist.length > 1 ? "s" : ""} enregistré{wishlist.length > 1 ? "s" : ""}</p></div>}
        {!wishlistOnly && <div className="mb-10 text-center"><h1 className="font-display text-4xl font-bold tracking-wide text-[#701718] sm:text-5xl">NOS PRODUITS</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">Des fragrances choisies avec exigence, pour révéler chaque personnalité et laisser une empreinte inoubliable.</p></div>}
        <div className="mb-12 flex justify-center gap-4 overflow-x-auto pb-2">
          {CATEGORIES.map(([value, label]) => (
            <button key={value} onClick={() => setCategories(toggleItem(categories, value))} className={`shrink-0 cursor-pointer border px-7 py-4 text-base font-semibold transition ${categories.includes(value) ? "border-black bg-black text-white" : "border-black bg-white hover:bg-black hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[270px_1fr]">
          <aside className="space-y-0 self-start">
            <FilterSection title="Type">
              {["Authentique", "Standard"].map((type) => <CheckFilter key={type} label={type} count={typeCount(type)} checked={types.includes(type)} onChange={() => setTypes(toggleItem(types, type))} />)}
            </FilterSection>
            <FilterSection title="Marque">
              <div className="max-h-52 space-y-2 overflow-y-auto pr-2">{brandOptions.map((brand) => <CheckFilter key={brand} label={brand} count={products.filter((p) => p.brand === brand).length} checked={brands.includes(brand)} onChange={() => setBrands(toggleItem(brands, brand))} />)}</div>
            </FilterSection>
            <FilterSection title="Famille">
              <div className="space-y-1">{FAMILIES.map((family) => <button key={family} onClick={() => setFamilies(toggleItem(families, family))} className={`block w-full px-1 py-1.5 text-left text-sm ${families.includes(family) ? "bg-black text-white" : "hover:bg-neutral-100"}`}>{family}</button>)}</div>
            </FilterSection>
            <FilterSection title="Quantité Min.">
              <div className="flex flex-wrap gap-2">{quantityOptions.map((qty) => <SquareChoice key={qty} active={quantities.includes(qty)} onClick={() => setQuantities(toggleItem(quantities, qty))}>{qty}</SquareChoice>)}</div>
            </FilterSection>
            <FilterSection title="Volume">
              <div className="flex gap-2">{([50, 100] as Volume[]).map((volume) => <SquareChoice key={volume} active={volumes.includes(volume)} onClick={() => setVolumes(toggleItem(volumes, volume))}>{volume} ml</SquareChoice>)}</div>
            </FilterSection>
          </aside>

          <section>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
              <div className="flex items-center gap-3 text-sm">Voir comme
                <button aria-label="Affichage grille" onClick={() => setView("grid")} className={view === "grid" ? "text-black" : "text-neutral-300"}><Grid3X3 className="h-6 w-6" /></button>
                <button aria-label="Affichage liste" onClick={() => setView("list")} className={view === "list" ? "text-black" : "text-neutral-300"}><List className="h-7 w-7" /></button>
              </div>
              <p className="text-sm"><strong>{filtered.length}</strong> produit{filtered.length > 1 ? "s" : ""}</p>
            </div>
            <div className={view === "grid" ? "grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-4" : "space-y-8"}>
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} list={view === "list"} wished={wishlist.includes(product.id)} onWishlist={() => toggleWishlist(product.id)} onView={() => setQuickView(product)} onOrder={() => product.isActive && setOrderSelection({ product, volume: product.volumes[0] })} />)}
            </div>
            {!filtered.length && <div className="border border-neutral-200 py-20 text-center text-neutral-500">Aucun produit ne correspond à ces filtres.</div>}
            {filtered.length > productsPerPage && <Pagination page={page} pageCount={pageCount} onChange={setPage} />}
          </section>
        </div>
      </main>
      <Footer />
      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onOrder={(volume) => { if (quickView.isActive) { setOrderSelection({ product: quickView, volume }); setQuickView(null); } }} />}
      {orderSelection && <AddToCartModal perfume={orderSelection.product} defaultVolume={orderSelection.volume} onClose={() => setOrderSelection(null)} />}
    </div>
  );
}

function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (page: number) => void }) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return <nav aria-label="Pagination des produits" className="mt-16 flex items-center justify-center gap-3">
    <button aria-label="Page précédente" disabled={page === 1} onClick={() => onChange(page - 1)} className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#701718] text-[#701718] transition hover:bg-[#701718] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
    {pages.map((number) => <button key={number} aria-current={number === page ? "page" : undefined} onClick={() => onChange(number)} className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#701718] text-sm font-bold transition ${number === page ? "bg-[#701718] text-white" : "bg-white text-[#701718] hover:bg-[#701718] hover:text-white"}`}>{number}</button>)}
    <button aria-label="Page suivante" disabled={page === pageCount} onClick={() => onChange(page + 1)} className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#701718] text-[#701718] transition hover:bg-[#701718] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
  </nav>;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border-b border-neutral-200 py-5"><h2 className="mb-4 text-sm font-bold">{title}</h2>{children}</div>;
}

function CheckFilter({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded-none accent-black" /><span className="flex-1">{label}</span>{count !== undefined && <span className="text-neutral-500">({count})</span>}</label>;
}

function SquareChoice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`border px-3 py-2 text-xs ${active ? "border-black bg-black text-white" : "border-neutral-300 bg-white"}`}>{children}</button>;
}

function ProductCard({ product, list, wished, onWishlist, onView, onOrder }: { product: Perfume; list: boolean; wished: boolean; onWishlist: () => void; onView: () => void; onOrder: () => void }) {
  const [showSecond, setShowSecond] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => { if (!product.hoverImage) return; setShowSecond(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setShowSecond(false), 2500); };
  const leave = () => { if (timer.current) clearTimeout(timer.current); setShowSecond(false); };
  return <article className={list ? "grid gap-6 border-b border-neutral-200 pb-8 sm:grid-cols-[280px_1fr]" : ""}>
    <div onClick={onOrder} onMouseEnter={enter} onMouseLeave={leave} role="button" tabIndex={product.isActive ? 0 : -1} aria-label={`Commander ${product.name}`} className={`relative aspect-[4/5] overflow-hidden bg-neutral-100 ${product.isActive ? "cursor-pointer" : "cursor-not-allowed"}`}>
      <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      {product.hoverImage && <img src={product.hoverImage} alt={`${product.name}, seconde vue`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${showSecond ? "opacity-100" : "opacity-0"}`} />}
      <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1">{product.badge && <span className="bg-[var(--ruby)] px-2.5 py-1 text-[10px] font-bold uppercase text-white">{product.badge}</span>}{!product.isActive && <span className="bg-black px-2.5 py-1 text-[10px] font-bold uppercase text-white">Épuisé</span>}</div>
      <button aria-label={wished ? "Retirer de la wishlist" : "Ajouter à la wishlist"} onClick={(event) => { event.stopPropagation(); onWishlist(); }} className={`absolute right-3 top-3 z-10 grid h-10 w-10 cursor-pointer place-items-center bg-white shadow ${wished ? "text-[var(--ruby)]" : "text-black"}`}><Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} /></button>
    </div>
    <div className={list ? "flex flex-col justify-center" : "pt-4"}>
      <div className="mb-3 flex flex-wrap gap-1.5">{product.families.map((family) => <span key={family} className="border border-neutral-300 px-2 py-1 text-[10px] uppercase">{family}</span>)}</div>
      <h3 className="font-display text-lg font-bold uppercase">{product.name} <span className="whitespace-nowrap text-sm font-medium text-neutral-500">— {product.volumes.join(" / ")} ml</span></h3>
      {list && product.description && <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">{product.description}</p>}
      <div className="mt-3 flex items-center justify-between gap-3 text-sm"><span className="uppercase text-neutral-500">{product.brand}</span><strong>{formatFCFA(product.price)}</strong></div>
      <div className="mt-4 grid grid-cols-[1fr_52px] gap-2"><button disabled={!product.isActive} onClick={onOrder} className="cursor-pointer border border-black bg-[#CE9A65] px-4 py-3 text-xs font-bold uppercase text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-white">{product.isActive ? "Commander" : "Épuisé"}</button><button aria-label="Voir les informations" onClick={onView} className="grid cursor-pointer place-items-center border border-black bg-white transition-colors hover:bg-black hover:text-white"><Eye className="h-5 w-5" /></button></div>
    </div>
  </article>;
}

function QuickView({ product, onClose, onOrder }: { product: Perfume; onClose: () => void; onOrder: (volume: Volume) => void }) {
  const images = [product.image, product.hoverImage].filter(Boolean) as string[];
  const [imageIndex, setImageIndex] = useState(0);
  const [volume, setVolume] = useState(product.volumes[0]);
  return <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="relative grid max-h-[94vh] w-full max-w-6xl overflow-y-auto bg-white lg:grid-cols-2">
      <button aria-label="Fermer" onClick={onClose} className="absolute right-4 top-4 z-20 cursor-pointer text-black"><X className="h-8 w-8" /></button>
      <div className="bg-neutral-100 p-5 pb-3"><div className="flex h-[58vh] min-h-[420px] items-center justify-center"><img src={images[imageIndex]} alt={product.name} className="h-full w-full object-contain" /></div>{images.length > 1 && <div className="mt-3 flex justify-center gap-3">{images.map((image, index) => <button key={image} onClick={() => setImageIndex(index)} className={`h-16 w-14 border ${index === imageIndex ? "border-black" : "border-neutral-300"}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div>}</div>
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{product.name}</h2>
        <p className="mt-2 text-sm uppercase tracking-widest text-neutral-500">{product.brand}</p>
        {product.description && <p className="mt-5 leading-6 text-neutral-700">{product.description}</p>}
        <p className="mt-6 text-2xl">{formatFCFA(product.price)}</p>
        <p className="mt-10 text-sm">Volume</p>
        <div className="mt-3 flex flex-wrap gap-2">{product.volumes.map((item) => <button key={item} onClick={() => setVolume(item)} className={`border px-5 py-3 text-sm tracking-[0.2em] ${volume === item ? "border-black bg-black text-white" : "border-neutral-300"}`}>{item}ML</button>)}</div>
        <div className="mt-8 flex flex-wrap gap-2">{product.families.map((family) => <span key={family} className="border border-neutral-300 px-3 py-2 text-xs uppercase">{family}</span>)}</div>
        <p className="mt-6 text-sm text-neutral-600">Quantité minimum : {product.minQuantity}</p>
        <button disabled={!product.isActive} onClick={() => onOrder(volume)} className="mt-10 max-w-sm cursor-pointer border border-black bg-[#CE9A65] px-6 py-4 font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-white">{product.isActive ? "Commander" : "Épuisé"}</button>
      </div>
    </div>
  </div>;
}
