"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useOptimistic } from "react";

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

  // Optimistic cart items state
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    items,
    (
      state,
      {
        id,
        quantity,
        remove,
      }: { id: string; quantity?: number; remove?: boolean },
    ) => {
      if (remove) {
        return state.filter((item) => item.id !== id);
      }

      return state.map((item) =>
        item.id === id ? { ...item, quantity: quantity as number } : item,
      );
    },
  );

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Update optimistically
    updateOptimisticItems({ id, quantity: newQuantity });

    // Perform the actual update
    try {
      await updateCartItemQuantity(id, newQuantity);
      updateQuantity(id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity", error);
      // The optimistic state will be reset with the actual state if there's an error
    }
  };

  const handleRemoveItem = async (id: string) => {
    // Update optimistically
    updateOptimisticItems({ id, remove: true });

    // Perform the actual removal
    try {
      await removeFromCart(id);
      removeItem(id);
    } catch (error) {
      console.error("Failed to remove item", error);
      // The optimistic state will be reset with the actual state if there's an error
    }
  };

  return (
    <div className="space-y-4">
      {optimisticItems.map((item) => (
        <div className="flex items-center rounded-lg border p-4" key={item.id}>
          <div className="bg-muted mr-4 h-20 w-20 overflow-hidden rounded-md">
            <img
              alt={item.name}
              className="h-full w-full object-cover"
              src={item.image || "/placeholder.svg"}
            />
          </div>

          <div className="flex-grow">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-muted-foreground text-sm">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              disabled={item.quantity <= 1}
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              size="icon"
              variant="outline"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center">{item.quantity}</span>

            <Button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              size="icon"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="ml-6 text-right">
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              className="mt-1 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveItem(item.id)}
              size="sm"
              variant="ghost"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
