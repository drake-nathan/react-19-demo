"use client";

import { create } from "zustand";

import type { CartItem, Product } from "./types";

interface CartStore {
  addItem: (product: Product) => void;
  clearCart: () => void;
  items: CartItem[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ?
              { ...item, quantity: item.quantity + 1 }
            : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  clearCart: () => set({ items: [] }),

  items: [],

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    })),
}));
