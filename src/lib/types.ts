export interface Product {
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
