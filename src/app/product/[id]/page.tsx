import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link className="mb-6 flex items-center text-sm hover:underline" href="/">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-muted aspect-square overflow-hidden rounded-lg">
          <img
            alt={product.name}
            className="h-full w-full object-cover"
            src={product.image || "/placeholder.svg"}
          />
        </div>

        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-medium">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex space-x-4">
            <AddToCartButton product={product} />
            <Link href="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
