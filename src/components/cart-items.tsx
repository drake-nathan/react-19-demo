"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import type { CartItem } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { removeFromCart, updateCartItemQuantity } from "@/lib/cart-actions";
import { useCartStore } from "@/lib/cart-store";

interface CartItemsProps {
  items: CartItem[];
}

export const CartItems = ({ items }: CartItemsProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Set loading state for this item
    setIsLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const updatedCart = await updateCartItemQuantity(id, newQuantity);
      updateQuantity(id, newQuantity);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleRemoveItem = async (id: string) => {
    // Set loading state for this item
    setIsLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const updatedCart = await removeFromCart(id);
      removeItem(id);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div className="flex items-center rounded-lg border p-4" key={item.id}>
          <div className="flex-grow">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              disabled={item.quantity <= 1 || isLoading[item.id]}
              onClick={() => {
                void handleUpdateQuantity(item.id, item.quantity - 1);
              }}
              size="icon"
              variant="outline"
            >
              {isLoading[item.id] ? "..." : <Minus className="h-4 w-4" />}
            </Button>

            <span className="w-8 text-center">{item.quantity}</span>

            <Button
              disabled={isLoading[item.id]}
              onClick={() => {
                void handleUpdateQuantity(item.id, item.quantity + 1);
              }}
              size="icon"
              variant="outline"
            >
              {isLoading[item.id] ? "..." : <Plus className="h-4 w-4" />}
            </Button>
          </div>

          <div className="ml-6 text-right">
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              className="mt-1 text-red-500 hover:text-red-700"
              disabled={isLoading[item.id]}
              onClick={() => {
                void handleRemoveItem(item.id);
              }}
              size="sm"
              variant="ghost"
            >
              {isLoading[item.id] ?
                "Removing..."
              : <>
                  <Trash2 className="mr-1 h-4 w-4" />
                  Remove
                </>
              }
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
