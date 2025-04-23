"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, Product } from "./types";

interface CartStore {
  addItem: (product: Product) => void;
  clearCart: () => void;
  items: CartItem[];
  removeItem: (id: string) => void;
  setItems: (items: CartItem[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

// Create a persisted store that saves to localStorage
export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

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
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      items: [],

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      setItems: (items) => {
        set({ items });
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage
    },
  ),
);
