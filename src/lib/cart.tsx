// src/lib/cart.ts
import { useSyncExternalStore } from "react";
import type { Perfume, Volume } from "./perfumes";

// ═══════════════════════════════════════════
// NOUVEAU MODÈLE — Panier basé sur des PACKS
// Un pack = groupe de parfums de la même catégorie + volume
// ═══════════════════════════════════════════

export type PackCategory = "homme" | "femme" | "diffuseur" | "prestige-homme" | "prestige-femme";

export type PackKey = string; // "homme-100", "femme-50", "diffuseur-100"

export function makePackKey(category: PackCategory, volume: Volume): PackKey {
  return `${category}-${volume}`;
}

export function parsePackKey(key: PackKey): { category: PackCategory; volume: Volume } {
  const [category, volume] = key.split("-");
  return { category: category as PackCategory, volume: Number(volume) as Volume };
}

/**
 * Un item du pack = un parfum avec une quantité
 * On stocke aussi les infos affichables (nom, marque, image, prix)
 * pour ne pas dépendre du store parfums quand on relit le panier
 */
export type PackItem = {
  perfumeId: string;
  name: string;
  brand: string;
  image: string;
  volume: Volume;
  unitPrice: number;
  quantity: number;
};

/**
 * Un pack = groupe d'items de la même catégorie + volume
 */
export type Pack = {
  key: PackKey;
  category: PackCategory;
  volume: Volume;
  minPieces: number; // 20 pour 50ml / diffuseur, 25 pour 100ml
  unitPrice: number; // prix unitaire de la catégorie
  items: PackItem[];
};

// ═══════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════

/** Retourne le minimum de pièces pour une catégorie+volume */
export function getMinPieces(category: PackCategory, volume: Volume): number {
  if (category === "diffuseur") return 20;
  if (category === "prestige-homme" || category === "prestige-femme") return 20;
  if (volume === 50) return 20;
  return 25;
}

/** Retourne le prix unitaire pour une catégorie+volume */
export function getUnitPrice(category: PackCategory, volume: Volume): number {
  if (category === "diffuseur") return 3000;
  if (category === "prestige-homme" || category === "prestige-femme") return 6000;
  if (volume === 50) return 3500;
  return 20000;
}

/** Retourne le libellé d'un pack (ex: "Parfums Homme 100ml") */
export function getPackLabel(category: PackCategory, volume: Volume): string {
  if (category === "diffuseur") return "Diffuseurs";
  if (category === "prestige-homme") return "Prestige Homme 50ml";
  if (category === "prestige-femme") return "Prestige Femme 50ml";
  const cat = category === "homme" ? "Homme" : "Femme";
  return `Parfums ${cat} ${volume}ml`;
}

/** Total de pièces d'un pack */
export function getPackTotalPieces(pack: Pack): number {
  return pack.items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Prix total d'un pack */
export function getPackTotalPrice(pack: Pack): number {
  return getPackTotalPieces(pack) * pack.unitPrice;
}

/** Un pack est-il valide (>= min pieces) ? */
export function isPackValid(pack: Pack): boolean {
  return getPackTotalPieces(pack) >= pack.minPieces;
}

/** Combien de pièces manquent pour valider ? */
export function getMissingPieces(pack: Pack): number {
  return Math.max(0, pack.minPieces - getPackTotalPieces(pack));
}

// ═══════════════════════════════════════════
// STORE (localStorage + subscribe)
// ═══════════════════════════════════════════

const STORAGE_KEY = "amanya_cart_v2"; // v2 pour invalider l'ancien panier v1
const OLD_STORAGE_KEY = "amanya_cart"; // ancien pour cleanup

type CartState = {
  packs: Pack[];
};

let state: CartState = { packs: [] };
let hydrated = false;
const listeners = new Set<() => void>();

function loadFromStorage() {
  if (typeof window === "undefined") return;

  // Cleanup ancien panier (migration v1 → v2)
  try {
    localStorage.removeItem(OLD_STORAGE_KEY);
  } catch {}

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.packs)) {
        state = { packs: parsed.packs };
      }
    }
  } catch (err) {
    console.warn("Cart load error:", err);
  }
  hydrated = true;
}

function saveToStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Cart save error:", err);
  }
}

function notify() {
  listeners.forEach((l) => l());
}

function setState(updater: (s: CartState) => CartState) {
  state = updater(state);
  saveToStorage();
  notify();
}

// ═══════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════

/**
 * Ajoute (ou fusionne) un pack au panier
 * Si un pack de la même catégorie+volume existe déjà → FUSION
 */
export function addPackToCart(newPack: Pack): void {
  setState((s) => {
    const existingIndex = s.packs.findIndex((p) => p.key === newPack.key);

    if (existingIndex === -1) {
      // Nouveau pack
      return { packs: [...s.packs, newPack] };
    }

    // FUSION : additionner les quantités des items communs
    const existing = s.packs[existingIndex];
    const mergedItems: PackItem[] = [...existing.items];

    for (const newItem of newPack.items) {
      const idx = mergedItems.findIndex((i) => i.perfumeId === newItem.perfumeId);
      if (idx === -1) {
        mergedItems.push(newItem);
      } else {
        mergedItems[idx] = {
          ...mergedItems[idx],
          quantity: mergedItems[idx].quantity + newItem.quantity,
        };
      }
    }

    const mergedPack: Pack = { ...existing, items: mergedItems };
    const newPacks = [...s.packs];
    newPacks[existingIndex] = mergedPack;
    return { packs: newPacks };
  });
}

/** Met à jour la quantité d'un item dans un pack */
export function updateItemQuantity(packKey: PackKey, perfumeId: string, quantity: number): void {
  setState((s) => ({
    packs: s.packs.map((p) => {
      if (p.key !== packKey) return p;
      const items = p.items
        .map((i) => (i.perfumeId === perfumeId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);
      return { ...p, items };
    }).filter((p) => p.items.length > 0), // supprime le pack si vide
  }));
}

/** Retire un item d'un pack */
export function removeItemFromPack(packKey: PackKey, perfumeId: string): void {
  setState((s) => ({
    packs: s.packs.map((p) => {
      if (p.key !== packKey) return p;
      return { ...p, items: p.items.filter((i) => i.perfumeId !== perfumeId) };
    }).filter((p) => p.items.length > 0),
  }));
}

/** Supprime un pack entier */
export function removePack(packKey: PackKey): void {
  setState((s) => ({ packs: s.packs.filter((p) => p.key !== packKey) }));
}

/** Vide le panier */
export function clearCart(): void {
  setState(() => ({ packs: [] }));
}

// ═══════════════════════════════════════════
// HELPERS POUR CRÉER UN PACK À PARTIR D'UN PARFUM
// ═══════════════════════════════════════════

/**
 * Crée un pack vide pour la catégorie + volume d'un parfum donné
 */
export function createEmptyPackFromPerfume(perfume: Perfume, volume: Volume): Pack {
  const category = perfume.category as PackCategory;
  return {
    key: makePackKey(category, volume),
    category,
    volume,
    minPieces: getMinPieces(category, volume),
    unitPrice: getUnitPrice(category, volume),
    items: [],
  };
}

/**
 * Crée un PackItem à partir d'un parfum
 */
export function createPackItem(perfume: Perfume, volume: Volume, quantity: number): PackItem {
  return {
    perfumeId: perfume.id,
    name: perfume.name,
    brand: perfume.brand,
    image: perfume.image,
    volume,
    unitPrice: getUnitPrice(perfume.category as PackCategory, volume),
    quantity,
  };
}

// ═══════════════════════════════════════════
// HOOK REACT
// ═══════════════════════════════════════════

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartState {
  return state;
}

function getServerSnapshot(): CartState {
  return { packs: [] };
}

/**
 * Hook principal pour utiliser le panier dans les composants
 */
export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Hydratation côté client au premier appel
  if (typeof window !== "undefined" && !hydrated) {
    loadFromStorage();
  }

  const totalItems = s.packs.reduce(
    (sum, pack) => sum + getPackTotalPieces(pack),
    0
  );

  const totalPrice = s.packs.reduce(
    (sum, pack) => sum + getPackTotalPrice(pack),
    0
  );

  const allPacksValid = s.packs.every(isPackValid);

  const packsCount = s.packs.length;

  return {
    packs: s.packs,
    totalItems,
    totalPrice,
    packsCount,
    allPacksValid,
    isHydrated: hydrated,
  };
}