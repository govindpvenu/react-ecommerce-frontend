//useEffect Method

import { useEffect } from "react";
import ProductCard from "../ProductCard";
import { useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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

// 1. js fetch()
// 2. js json()
// 3. throw new Error
// 4. Promise
// 5. aync await
// 6. Whenever state changes the component re-renders.
// 7. useEffect
// 8. Conditional rendering
// 9. try catch
// 10. useSWR
