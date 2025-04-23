"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { processCheckout } from "@/lib/checkout-actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? "Processing..." : "Complete Order"}
    </Button>
  );
};

export const CheckoutForm = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  // Use the new useActionState hook to handle form submission and errors
  const [error, formAction] = useActionState(async (prevState, formData) => {
    try {
      // Process the checkout
      await processCheckout(formData);

      // Clear the cart on successful checkout
      clearCart();

      // Show success toast
      toast("Thank you for your order.");

      return null;
    } catch {
      // Return error message to display in the form
      return "There was an error processing your order. Please try again.";
    }
  }, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" required type="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Shipping Address</Label>
        <Input id="address" name="address" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" name="zip" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="card">Credit Card</Label>
        <Input
          id="card"
          name="card"
          placeholder="**** **** **** ****"
          required
        />
      </div>

      {error ?
        <div className="text-sm text-red-500">{error}</div>
      : null}

      <SubmitButton />
    </form>
  );
};
