import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full px-4  ">
      <CategoryList />
      <ProductList />
    </div>
  );
}
