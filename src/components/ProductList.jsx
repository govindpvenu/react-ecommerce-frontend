import useSWR from "swr";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

function ProductList() {
  async function fetchProducts(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  }

  const {
    data: products,
    error,
    isLoading,
  } = useSWR("https://fakestoreapi.com/products", fetchProducts);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Unable to fetch data.</p>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
