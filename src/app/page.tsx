import { ProductList } from "@/components/product-list";
import { getProducts } from "@/lib/products";

const Home = async () => {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">React 19 E-commerce Demo</h1>
      <p className="mb-8 text-lg">
        This demo showcases React 19 features like useOptimistic, form actions,
        and useActionState.
      </p>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
