import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { CartItems } from "@/components/cart-items";
import { CheckoutForm } from "@/components/checkout-form";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/cart-actions";

const CartPage = async () => {
  const cart = await getCart();
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link className="mb-6 flex items-center text-sm hover:underline" href="/">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to shopping
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {cart.items.length === 0 ?
        <div className="py-12 text-center">
          <h2 className="mb-4 text-xl font-medium">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to continue.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      : <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItems items={cart.items} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="my-4 border-t" />
              <div className="mb-6 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <CheckoutForm />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CartPage;
