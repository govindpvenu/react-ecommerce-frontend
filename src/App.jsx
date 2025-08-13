import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Handbag, ShoppingCart } from "lucide-react";
import Clothes from "./pages/categories/Clothes";
import Electronics from "./pages/categories/Electronics";
import Furniture from "./pages/categories/Furniture";
import Shoes from "./pages/categories/Shoes";
import Miscellaneous from "./pages/categories/Miscellaneous";
import ProductOverview from "./pages/ProductOverview";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center gap-4 p-4 h-16 sticky border-b bg-green-50">
        <Link to="/">
          <div className="flex items-center gap-2 text-green-500">
            <Handbag className="size-8" strokeWidth={2.5} />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <NavLink className="hover:text-green-500" to="/">
            Home
          </NavLink>

          <NavLink className="hover:text-green-500" to="/clothes">
            Clothes
          </NavLink>
          <NavLink className="hover:text-green-500" to="/electronics">
            Electronics
          </NavLink>
          <NavLink className="hover:text-green-500" to="/furniture">
            Furniture
          </NavLink>
          <NavLink className="hover:text-green-500" to="/shoes">
            Shoes
          </NavLink>
          <NavLink className="hover:text-green-500" to="/miscellaneous">
            Miscellaneous
          </NavLink>
        </div>
        <div className="hover:text-green-500">
          <NavLink to="/cart">
            <ShoppingCart className="size-10" strokeWidth={1.2} />
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} />
        <Route path="/product/:product_id" element={<ProductOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
