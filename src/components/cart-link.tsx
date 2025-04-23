"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useCartStore } from "@/lib/cart-store";

export const CartLink = () => {
  // Initialize cart state from localStorage
  const [mounted, setMounted] = React.useState(false);

  // Force re-render when items change by subscribing to the items array
  const items = useCartStore((state) => state.items);

  // Calculate the total price
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Hydrate the store after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  console.info("CartLink rendering with items:", items, "total:", totalPrice);

  // Show a placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Link className="flex items-center" href="/cart">
        <ShoppingCart className="mr-2" size={24} />
        <span>
          Cart
          <span className="ml-2 font-medium" data-component-name="CartLink">
            $0.00
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link className="flex items-center" href="/cart">
      <ShoppingCart className="mr-2" size={24} />
      <span>
        Cart
        <span className="ml-2 font-medium" data-component-name="CartLink">
          ${totalPrice.toFixed(2)}
        </span>
      </span>
    </Link>
  );
};
