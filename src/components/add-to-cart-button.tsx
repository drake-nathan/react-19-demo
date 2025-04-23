"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useOptimistic } from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-actions";
import { useCartStore } from "@/lib/cart-store";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItemToCart = useCartStore((state) => state.addItem);

  // Track optimistic state for the button
  const [optimisticAdding, addOptimistically] = useOptimistic(
    false,
    (state, adding) => adding,
  );

  const handleAddToCart = async () => {
    // Set optimistic state to true
    addOptimistically(true);

    try {
      // Simulate server action with delay
      await addToCart(product);

      // Update local cart state
      addItemToCart(product);

      toast(`${product.name} has been added to your cart.`);
    } catch {
      toast("Failed to add item to cart. Please try again.");
    } finally {
      // Reset optimistic state
      addOptimistically(false);
    }
  };

  return (
    <Button
      className="relative"
      disabled={optimisticAdding}
      onClick={void handleAddToCart}
    >
      {optimisticAdding ?
        <>
          <Check className="mr-2 h-4 w-4" />
          Adding...
        </>
      : <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      }
    </Button>
  );
};
