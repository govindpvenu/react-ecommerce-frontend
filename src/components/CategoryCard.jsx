import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/${category.slug}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-green-400 rounded-xl transition"
      aria-label={`View products in ${category.name}`}
    >
      <div className="max-w-xs bg-white hover:bg-green-50 rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-green-200 transition duration-300 flex flex-col h-full">
        <div className="relative bg-gradient-to-t from-green-100 via-white to-white">
          <img
            src={category?.image || "https://placehold.co/600x400"}
            alt={category.name}
            className="h-48 w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex flex-col flex-1 justify-between">
          <h2 className="text-xl font-bold mb-2 text-green-700 line-clamp-2 group-hover:text-green-600 transition-colors">
            {category.name}
          </h2>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full shadow-sm capitalize">
              {category.slug.replace(/-/g, " ")}
            </span>
            <ArrowRight className="size-5 text-green-400 group-hover:text-green-600 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
