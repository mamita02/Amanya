// src/lib/cart.ts
// Gestion globale du panier : React Context + persistence localStorage.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ============================================
// RÈGLE MÉTIER : minimum panier global
// ============================================
export const MIN_CART_QUANTITY = 25;

export type CartItem = {
  id: string;
  perfumeId: string;
  name: string;
  brand: string;
  image: string;
  volume: number;
  quantity: number;
  unitPrice: number;
  minQuantity: number; // gardé pour compat BD mais NON utilisé pour la validation
  category: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartValid: boolean;           // true si totalItems >= MIN_CART_QUANTITY
  remainingToMinimum: number;     // combien il manque pour valider (0 si atteint)
  progressPercent: number;        // progression 0-100 pour la barre visuelle
  isHydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "amanya_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

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
        // Plus de min par item : on autorise dès 1 pièce (jamais 0)
        i.id === id ? { ...i, quantity: Math.max(1, newQty) } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  const isCartValid = totalItems >= MIN_CART_QUANTITY;
  const remainingToMinimum = Math.max(0, MIN_CART_QUANTITY - totalItems);
  const progressPercent = Math.min(100, Math.round((totalItems / MIN_CART_QUANTITY) * 100));

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
        isCartValid,
        remainingToMinimum,
        progressPercent,
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