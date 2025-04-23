"use server";

import type { Cart, Product } from "./types";

// Simulate server-side cart storage
const serverCart: Cart = { items: [] };

// Add item to cart
export const addToCart = async (product: Product): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const existingItem = serverCart.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    serverCart.items.push({
      ...product,
      quantity: 1,
    });
  }
};

// Get cart contents
export const getCart = async (): Promise<Cart> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return serverCart;
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  id: string,
  quantity: number,
): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  const item = serverCart.items.find((item) => item.id === id);

  if (item) {
    item.quantity = quantity;
  }
};

// Remove item from cart
export const removeFromCart = async (id: string): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  serverCart.items = serverCart.items.filter((item) => item.id !== id);
};
