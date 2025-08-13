import useSWR from "swr";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

function Shoes() {
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
    "https://api.escuelajs.co/api/v1/categories/4/products",
    fetchProducts
  );

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Unable to fetch data.</p>
    );

  return (
    <div className="flex flex-col justify-center items-center w-full px-4  ">
      <div className="w-full p-6">
        <h1 className="text-3xl w-full text-center font-bold mb-8 text-green-500">
          All Shoes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shoes;
