// src/lib/cart.ts
// Gestion globale du panier : React Context + persistence localStorage.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;          // identifiant unique de ligne = `${perfumeId}_${volume}`
  perfumeId: string;
  name: string;
  brand: string;
  image: string;
  volume: number;      // 50 ou 100 (ml)
  quantity: number;
  unitPrice: number;   // prix FCFA / unité
  minQuantity: number; // seuil minimum imposé pour ce parfum
  category: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQty: number) => void;
  clearCart: () => void;
  totalItems: number;   // somme des quantités
  totalPrice: number;   // somme du sous-total
  isHydrated: boolean;  // true une fois le localStorage lu côté client (évite mismatch SSR)
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "amanya_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Charge depuis localStorage uniquement côté client
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (err) {
      console.error("Cart hydration error:", err);
    }
    setIsHydrated(true);
  }, []);

  // Persiste à chaque changement (uniquement après hydratation)
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Cart save error:", err);
    }
  }, [items, isHydrated]);

  const addItem: CartContextValue["addItem"] = (newItem) => {
    const id = `${newItem.perfumeId}_${newItem.volume}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        // Si l'item existe déjà (même parfum + même volume), on cumule les quantités
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, newQty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(i.minQuantity, newQty) } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  return ctx;
}