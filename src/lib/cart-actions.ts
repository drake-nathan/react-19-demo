"use server";

import type { Cart, Product } from "./types";

// Server-side in-memory cart storage
// This ensures the cart persists between server actions
const serverCart: Cart = { items: [] };

// Get cart contents
export const getCart = async (): Promise<Cart> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // Return a deep copy of the cart to prevent direct mutations
  return { 
    items: serverCart.items.map(item => ({ ...item })) 
  };
};

// Add item to cart
export const addToCart = async (product: Product): Promise<Cart> => {
  // Simulate network delay - longer delay to clearly demonstrate optimistic UI
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

  // Return a deep copy of the updated cart
  return { 
    items: serverCart.items.map(item => ({ ...item })) 
  };
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  id: string,
  quantity: number,
): Promise<Cart> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  const item = serverCart.items.find((item) => item.id === id);

  if (item) {
    item.quantity = quantity;
  }

  // Return a deep copy of the updated cart
  return { 
    items: serverCart.items.map(item => ({ ...item })) 
  };
};

// Remove item from cart
export const removeFromCart = async (id: string): Promise<Cart> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  serverCart.items = serverCart.items.filter((item) => item.id !== id);

  // Return a deep copy of the updated cart
  return { 
    items: serverCart.items.map(item => ({ ...item })) 
  };
};
