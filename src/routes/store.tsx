import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye, Grid3X3, Heart, List, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import heroVideo from "../assets/slide-amanya.mp4";
import heroVideoMobile from "../assets/slid_mobile.mp4";
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
          <video src={heroVideo} autoPlay muted loop playsInline aria-label="Présentation d'AMANYA" className="absolute inset-0 h-full w-full object-cover hidden md:block" />
          <video src={heroVideoMobile} autoPlay muted loop playsInline className="absolute inset-0 block h-full w-full object-cover md:hidden" />
        </div>
      </section>}

        <main className="mx-auto w-full max-w-[1600px] min-w-0 px-3 sm:px-6 lg:px-10 py-8">
        {wishlistOnly && <div className="mb-12 border-b border-black pb-6"><h1 className="font-display text-4xl font-bold">Ma wishlist</h1><p className="mt-2 text-sm text-neutral-500">{wishlist.length} produit{wishlist.length > 1 ? "s" : ""} enregistré{wishlist.length > 1 ? "s" : ""}</p></div>}
        {!wishlistOnly && <section id="collection" className="py-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mt-7 font-serif text-4xl font-medium text-[#161616] sm:text-5xl">
            Nos Produits
          </h2>
          <p className="font-serif mx-auto mt-7 max-w-3xl text-gray-600">
            Chaque produit disponible sur AMANYA Store est sélectionné
            avec exigence afin de proposer des fragrances durables,
            élégantes et adaptées aussi bien aux particuliers qu'aux
            professionnels.
          </p>
        </div>
      </section>}
        <div className="mb-8 flex justify-center w-full min-w-0 gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(([value, label]) => {
            const active = categories.includes(value);
            return (
              <button 
                key={value} 
                onClick={() => setCategories(toggleItem(categories, value))} 
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  active 
                    ? "border-[#B8873A] bg-[#B8873A] text-white shadow-sm" 
                    : "border-[#D9D2C8] bg-white text-[#161616] hover:border-[#B8873A]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* <div className="grid gap-8 xl:grid-cols-[270px_1fr]"> */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="min-w-0 self-start">

            <div className="rounded-[28px] w-full border border-[#E8E1D8] bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#B8873A]">FILTRES</p>
                  <h2 className="mt-3 font-serif text-3xl font-medium text-[#161616]">
                    Affiner votre recherche
                  </h2>
                </div>
                {(types.length || brands.length || families.length || quantities.length || volumes.length || categories.length) > 0 && (
                  <button onClick={() => {setTypes([]);setBrands([]);setFamilies([]);setQuantities([]);setVolumes([]);setCategories([]);}} className="text-sm cursor-pointer font-medium text-[#B8873A] hover:underline">
                    Réinitialiser
                  </button>
                )}
              </div>
              <div className="mt-10 space-y-10">
                <FilterSection title="Type">{["Authentique", "Standard"].map((type) => (
                    <CheckFilter key={type} label={type} count={typeCount(type)} checked={types.includes(type)} onChange={() => setTypes(toggleItem(types, type)) }/> ))}
                </FilterSection>
                <FilterSection title="Marques"> <div className="max-h-56 space-y-3 overflow-y-auto pr-2"> {brandOptions.map((brand) => (
                      <CheckFilter key={brand} label={brand} count={products.filter((p) => p.brand === brand).length} checked={brands.includes(brand)} onChange={() => setBrands(toggleItem(brands, brand))} /> ))} </div>
                </FilterSection>
                <FilterSection title="Familles"> <div className="flex flex-wrap gap-2">{FAMILIES.map((family) => (
                      <SquareChoice key={family} active={families.includes(family)} onClick={() => setFamilies(toggleItem(families, family))}> {family} </SquareChoice>))} </div>
                </FilterSection>
                <FilterSection title="Volume"> <div className="flex gap-3"> {([50, 100] as Volume[]).map((volume) => (
                      <SquareChoice key={volume} active={volumes.includes(volume)} onClick={() => setVolumes(toggleItem(volumes, volume))}> {volume} ml </SquareChoice> ))} </div>
                </FilterSection>
                <FilterSection title="Commande minimum"> <div className="flex flex-wrap gap-2"> {quantityOptions.map((qty) => (
                      <SquareChoice key={qty} active={quantities.includes(qty)} onClick={() => setQuantities(toggleItem(quantities, qty))}> {qty} </SquareChoice> ))} </div>
                </FilterSection>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-[#E8E1D8] pb-8">
              <div> <p className="text-xs uppercase tracking-[0.35em] text-[#B8873A]">Collection</p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-[#161616]">Nos parfums</h3>
                <p className="mt-2 text-gray-500">{filtered.length} produit{filtered.length > 1 && "s"} disponible{filtered.length > 1 && "s"}</p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[#E8E1D8] bg-white p-2">
                <button onClick={() => setView("grid")} className={`rounded-full p-3 transition ${view === "grid" ? "bg-[#161616] text-white" : "text-gray-500 hover:bg-[#F3F0EB]"}`}>
                  <Grid3X3 size={18} />
                </button>
                
                <button onClick={() => setView("list")} className={`rounded-full p-3 transition ${view === "list" ? "bg-[#161616] text-white" : "text-gray-500 hover:bg-[#F3F0EB]"}`}>
                  <List size={18} />
                </button>
              </div>
            </div>

              <div className={view === "grid" ? "grid min-w-0 items-stretch grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" : "space-y-8"}>
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

  return (
    <nav aria-label="Pagination des produits" className="mt-14 flex items-center justify-center gap-2">
      <button
        aria-label="Page précédente"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-[#DDD5CB] bg-white text-[#161616] transition hover:border-[#B8873A] hover:text-[#B8873A] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          aria-current={number === page ? "page" : undefined}
          onClick={() => onChange(number)}
          className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition ${
            number === page
              ? "border-[#B8873A] bg-[#B8873A] text-white shadow-lg shadow-[#B8873A]/20"
              : "border-[#DDD5CB] bg-white text-[#161616] hover:border-[#B8873A] hover:text-[#B8873A]"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        aria-label="Page suivante"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#DDD5CB] bg-white text-[#161616] transition hover:border-[#B8873A] hover:text-[#B8873A] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (<section><h3 className="mb-5 font-serif text-xl font-medium text-[#161616]">{title}</h3>{children}</section>);
}


function CheckFilter({label,count,checked,onChange,}: {label: string;count?: number;checked: boolean;onChange: () => void;}) {
  return (<label className="flex cursor-pointer items-center gap-3 py-1"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#B8873A]" /><span className="flex-1 text-[15px] text-[#161616]">{label}</span> {count !== undefined && (<span className="text-sm text-gray-400">{count}</span>)}</label>);
}

function SquareChoice({active,onClick,children,}: {active: boolean;onClick: () => void;children: React.ReactNode;}) {
  return (<button onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-[#B8873A] bg-[#B8873A] text-white" : "border-[#DDD5CB] bg-white hover:border-[#B8873A] hover:text-[#B8873A]"}`}>{children}</button>);
}


function ProductCard({product, list, wished, onWishlist, onView, onOrder, }: {product: Perfume; list: boolean; wished: boolean; onWishlist: () => void; onView: () => void; onOrder: () => void;}) {
  const [showSecond, setShowSecond] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (!product.hoverImage) return;
    setShowSecond(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowSecond(false), 2500);
  };

  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    setShowSecond(false);
  };

  return (
    <article
      className={
        list
          ? "grid min-w-0 gap-8 rounded-[28px] border border-[#E8E1D8] bg-white p-6 shadow-sm lg:grid-cols-[300px_1fr]"
          : "group flex h-auto flex-col overflow-hidden rounded-[28px] border border-[#ECE5DC] bg-white shadow-sm transition-transform duration-700 ease-out group-hover:scale-110 hover:shadow-lg"
      }
    >
      {/* Conteneur d'image fixe (Ratio 4/5 luxe) */}
      <div onClick={onOrder} onMouseEnter={enter} onMouseLeave={leave} role="button" tabIndex={product.isActive ? 0 : -1} className={`relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#F7F4EF] ${list ? "rounded-2xl" : ""} ${product.isActive ? "cursor-pointer" : "cursor-not-allowed"}`}>
        {/* Image principale */}
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />

        {/* Image au survol */}
        {product.hoverImage && (
          <img src={product.hoverImage} alt={`${product.name}, seconde vue`} className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${showSecond ? "opacity-100" : "opacity-0"}`} />
        )}

        {/* Badges */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <span className="rounded-full bg-[#B8873A] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
              {product.badge}
            </span>
          )}
          {!product.isActive && (
            <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
              Épuisé
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label={wished ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition hover:bg-[#161616] hover:text-white"
        >
          <Heart
            className={`h-5 w-5 transition ${
              wished ? "fill-current text-[#B8873A]" : ""
            }`}
          />
        </button>
      </div>

      {/* Contenu textuel */}
      <div className={list ? "flex flex-col justify-center" : "flex flex-1 flex-col justify-between p-5"}>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.families.map((family) => (
              <span
                key={family}
                className="rounded-full border border-[#E6DED4] px-3 py-0.5 text-[11px] uppercase tracking-wide text-gray-600"
              >
                {family}
              </span>
            ))}
          </div>

          <h3 className="mt-3 font-serif text-xl font-medium text-[#161616] line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-[#B8873A]">
            {product.brand}
          </p>

          {list && product.description && (
            <p className="mt-3 text-gray-600">{product.description}</p>
          )}
        </div>

        {/* Pied de carte */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#161616] font-medium">
              {product.volumes.join(" • ")} ml
            </p>
            <p className="font-serif text-lg font-medium text-[#161616]">
              {formatFCFA(product.price)}
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={onOrder}
              disabled={!product.isActive}
              className="flex-1 cursor-pointer rounded-xl bg-[#B8873A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#A5782F] disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {product.isActive ? "Commander" : "Épuisé"}
            </button>

            <button
              onClick={onView}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#DDD5CB] transition hover:border-[#B8873A] hover:bg-[#B8873A] hover:text-white"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
} 



function QuickView({ product, onClose, onOrder }: { product: Perfume; onClose: () => void; onOrder: (volume: Volume) => void }) {
  const images = [product.image, product.hoverImage].filter(Boolean) as string[];
  const [imageIndex, setImageIndex] = useState(0);
  const [volume, setVolume] = useState(product.volumes[0]);

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[28px] bg-[#FAF8F4] shadow-2xl lg:grid lg:grid-cols-[1.1fr_0.9fr]">

        <button aria-label="Fermer" onClick={onClose} className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition hover:bg-[#161616] hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="bg-[#F4EFE8] p-6">
          <div className="overflow-hidden rounded-[24px] bg-white">
            <img src={images[imageIndex]} alt={product.name} className="h-[320px] w-full object-contain sm:h-[420px]" />
          </div>

          {images.length > 1 && (
            <div className="mt-5 flex gap-3 justify-center">
              {images.map((image, index) => (
                <button key={image} onClick={() => setImageIndex(index)} className={`overflow-hidden rounded-xl border-2 transition ${index === imageIndex ? "border-[#B8873A]" : "border-transparent hover:border-[#DDD5CB]"}`}>
                  <img src={image} alt="" className="h-16 w-10 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 lg:p-10">
          <span className="text-xs uppercase tracking-[0.35em] text-[#B8873A]">{product.brand}</span>

          <h2 className="mt-3 font-serif text-4xl font-medium text-[#161616]">{product.name}</h2>

          {product.description && <p className="mt-5 text-gray-600">{product.description}</p>}

          <p className="mt-6 font-serif text-3xl font-medium text-[#161616]">{formatFCFA(product.price)}</p>

          <div className="mt-7 grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.30em] text-gray-500">Volume</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.volumes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setVolume(item)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                      volume === item
                        ? "border-[#B8873A] bg-[#B8873A] text-white"
                        : "border-[#DDD5CB] bg-white hover:border-[#B8873A] hover:text-[#B8873A]"
                    }`}
                  >
                    {item} ml
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.30em] text-gray-500">Familles</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.families.map((family) => (
                  <span key={family} className="rounded-full border border-[#DDD5CB] px-4 py-2 text-xs uppercase tracking-wide text-gray-600">
                    {family}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-white p-4">
            <p className="text-sm text-gray-500">Commande minimum</p>
            <p className="mt-1 font-medium text-[#161616]">
              {product.minQuantity} unité{product.minQuantity > 1 ? "s" : ""}
            </p>
          </div>

          <button
            disabled={!product.isActive}
            onClick={() => onOrder(volume)}
            className="cursor-pointer mt-7 rounded-xl bg-[#B8873A] px-6 py-4 font-medium text-white transition hover:bg-[#A5782F] disabled:cursor-not-allowed disabled:bg-neutral-300">
            {product.isActive ? "Commander maintenant" : "Produit indisponible"}
          </button>
        </div>

      </div>
    </div>
  );
}