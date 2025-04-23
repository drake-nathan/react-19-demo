import Link from "next/link";

import type { Product } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AddToCartButton } from "./add-to-cart-button";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card className="flex flex-col" key={product.id}>
          <CardHeader className="pb-4">
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-2 text-muted-foreground">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/product/${product.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
