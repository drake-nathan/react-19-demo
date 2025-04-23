"use server";

// Process checkout
export const processCheckout = async (formData: FormData): Promise<void> => {
  // Simulate network delay and processing
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  // Simulate validation
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  // In a real app, you would process payment and create an order here

  // Clear the server-side cart
  // This is handled by the client after successful checkout
};
