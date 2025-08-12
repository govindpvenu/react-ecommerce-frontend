export default function ProductCard({ product }) {
  return (
    <div className="max-w-xs hover:bg-gray-200 rounded-xl shadow-md hover:shadow-xl overflow-hidden border  transition duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-full object-contain p-4"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mb-2 capitalize">
          {product.category}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="text-sm text-yellow-500">
            ⭐ {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>
      </div>
    </div>
  );
}
