import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="max-w-xs bg-white hover:bg-green-50 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-green-200 transition duration-300 group relative">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative bg-gradient-to-t from-green-100 via-white to-white">
          <img
            src={product?.images?.[0] || "https://placehold.co/600x400"}
            alt={product.title}
            className="h-56 w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col h-48 justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1 text-green-700 line-clamp-2 group-hover:text-green-600 transition-colors">
              {product.title}
            </h2>
            <p className="text-gray-500 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className=" bg-green-500/90 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
              {product?.category?.name}
            </div>
            <span className="text-2xl font-extrabold text-green-500 drop-shadow">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
