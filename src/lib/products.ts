import type { Product } from "./types";

// Mock product data
const products: Product[] = [
  {
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    id: "1",
    image: "/placeholder.svg?height=400&width=400",
    name: "Wireless Headphones",
    price: 249.99,
  },
  {
    description:
      "Track your fitness, receive notifications, and more with this sleek smart watch.",
    id: "2",
    image: "/placeholder.svg?height=400&width=400",
    name: "Smart Watch",
    price: 199.99,
  },
  {
    description:
      "Portable Bluetooth speaker with rich sound and waterproof design.",
    id: "3",
    image: "/placeholder.svg?height=400&width=400",
    name: "Bluetooth Speaker",
    price: 79.99,
  },
  {
    description:
      "Durable backpack with padded laptop compartment and multiple pockets.",
    id: "4",
    image: "/placeholder.svg?height=400&width=400",
    name: "Laptop Backpack",
    price: 59.99,
  },
  {
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    id: "5",
    image: "/placeholder.svg?height=400&width=400",
    name: "Wireless Charger",
    price: 34.99,
  },
  {
    description:
      "Programmable coffee maker with thermal carafe to keep your coffee hot for hours.",
    id: "6",
    image: "/placeholder.svg?height=400&width=400",
    name: "Coffee Maker",
    price: 129.99,
  },
];

// Simulate fetching products from an API
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return products;
};

// Get a single product by ID
export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });
  return products.find((product) => product.id === id);
};
