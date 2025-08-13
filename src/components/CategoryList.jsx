import useSWR from "swr";
import LoadingSpinner from "./LoadingSpinner";
import CategoryCard from "./CategoryCard";

function CategoryList() {
  async function fetchCategories(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  }

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("https://api.escuelajs.co/api/v1/categories", fetchCategories);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Unable to fetch data.</p>
    );
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Categories</h1>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
