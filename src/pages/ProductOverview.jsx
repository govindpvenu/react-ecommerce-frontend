import { useState } from "react";
import { Link, useParams } from "react-router";
import useSWR from "swr";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

export default function ProductOverview() {
  const { product_id } = useParams();

  async function fetchProducts(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  }

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    `https://api.escuelajs.co/api/v1/products/${product_id}`,
    fetchProducts
  );

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-center text-red-500">Unable to fetch data.</p>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>
      </div>
    );

  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://placehold.co/800x600?text=No+Image"];

  const categoryName = product?.category?.name || "Category";
  const categoryPath = `/${categoryName.toLowerCase()}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={categoryPath} className="hover:text-green-600 capitalize">
              {categoryName}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium line-clamp-1">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImageGallery images={images} title={product.title} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 capitalize">
                {categoryName}
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold mt-3">
                {product.title}
              </h1>
            </div>
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
              aria-label="Back"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <PurchaseActions product={product} />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard
              icon={<Truck className="size-5 text-green-600" />}
              title="Fast delivery"
              subtitle="2-5 business days"
            />
            <InfoCard
              icon={<RotateCcw className="size-5 text-green-600" />}
              title="Easy returns"
              subtitle="30-day policy"
            />
            <InfoCard
              icon={<ShieldCheck className="size-5 text-green-600" />}
              title="Secure checkout"
              subtitle="256-bit encryption"
            />
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts
        categoryId={product?.category?.id}
        currentProductId={product.id}
      />
    </div>
  );
}

function ImageGallery({ images, title }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className="border rounded-xl bg-white p-4 shadow-sm">
        <img
          src={images[selectedIndex]}
          alt={title}
          className="w-full h-80 md:h-[28rem] object-contain"
        />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {images.map((src, index) => (
          <button
            key={src + index}
            onClick={() => setSelectedIndex(index)}
            className={`border rounded-lg p-2 bg-white transition outline-none ${
              index === selectedIndex ? "ring-2 ring-green-500" : "hover:shadow"
            }`}
            aria-label={`Preview ${index + 1}`}
          >
            <img
              src={src}
              alt={`${title} thumbnail ${index + 1}`}
              className="h-16 w-16 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PurchaseActions({ product }) {
  const [quantity, setQuantity] = useState(1);

  function decrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increase() {
    setQuantity((q) => q + 1);
  }

  function addToCart() {
    // Placeholder action for now
    console.log("Add to cart", { productId: product.id, quantity });
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-auto">
        <button
          onClick={decrease}
          className="px-4 py-2 hover:bg-green-50"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          aria-label="Quantity"
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            setQuantity(Number.isFinite(value) && value > 0 ? value : 1);
          }}
          className="w-16 text-center py-2 outline-none"
          inputMode="numeric"
        />
        <button
          onClick={increase}
          className="px-4 py-2 hover:bg-green-50"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={addToCart}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-sm"
      >
        <ShoppingCart className="size-5" /> Add to cart
      </button>

      <button
        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border hover:bg-green-50"
        aria-label="Add to wishlist"
        title="Add to wishlist"
      >
        <Heart className="size-5" />
      </button>
    </div>
  );
}

function InfoCard({ icon, title, subtitle }) {
  return (
    <div className="border rounded-xl p-4 hover:bg-green-50 transition-colors duration-300">
      <div className="flex items-start gap-2">
        {icon}
        <div className="flex flex-col w-full gap-1">
          <p className="font-medium ">{title}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ categoryId, currentProductId }) {
  const shouldFetch = Boolean(categoryId);

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
    shouldFetch
      ? `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      : null,
    fetchProducts
  );

  const related = Array.isArray(products)
    ? products.filter((p) => p.id !== currentProductId).slice(0, 4)
    : [];

  if (!shouldFetch) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
        You might also like
      </h2>
      {isLoading && <LoadingSpinner />}
      {error && (
        <p className="text-sm text-red-500">Unable to load related products.</p>
      )}
      {!isLoading && !error && related.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
