import useSWR from "swr";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

function ProductList() {
  const [query, setQuery] = useState("");
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
  const q = query.trim().toLowerCase();
  const filteredProducts = q
    ? products.filter((p) => (p?.title || "").toLowerCase().includes(q))
    : products;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl w-full text-center font-bold mb-8 text-green-500">
        All Products
      </h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          aria-label="Search products"
          className="w-full border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
