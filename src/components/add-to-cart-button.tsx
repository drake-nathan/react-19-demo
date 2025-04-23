"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-actions";
import { useCartStore } from "@/lib/cart-store";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const setCartItems = useCartStore((state) => state.setItems);

  const handleAddToCart = async () => {
    try {
      console.info("Adding to cart:", product);

      // Call server action with delay and get updated cart
      const updatedCart = await addToCart(product);
      console.info("Server response:", updatedCart);

      // Update local cart state with the server response
      setCartItems(updatedCart.items);
      console.info("Cart items updated with:", updatedCart.items);

      toast(`${product.name} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <Button
      className="relative"
      onClick={() => {
        void handleAddToCart();
      }}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
};
