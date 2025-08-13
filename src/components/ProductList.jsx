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
  } = useSWR(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=46",
    fetchProducts
  );

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Unable to fetch data.</p>
    );

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl w-full text-center font-bold mb-8 text-green-500">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
