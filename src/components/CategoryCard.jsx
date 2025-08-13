function CategoryCard({ category }) {
  return (
    <div className="max-w-xs hover:bg-green-50 rounded-xl shadow-md hover:shadow-xl overflow-hidden border  transition duration-300">
      <img
        src={category?.image || "https://placehold.co/600x400"}
        alt={category.name}
        className="h-64 w-full object-contain p-4"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 line-clamp-2 text-green-500">
          {category.name}
        </h2>
      </div>
    </div>
  );
}

export default CategoryCard;
