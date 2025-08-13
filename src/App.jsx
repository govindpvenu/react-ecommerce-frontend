import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import { CircleUserRound, Handbag, ShoppingBag } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center gap-4 p-4 h-16 sticky border-b bg-green-50">
        <div className="flex items-center gap-2 text-green-500">
          <Handbag className="size-8" strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-4">
          <NavLink className="hover:text-green-500" to="/">
            Home
          </NavLink>
          <NavLink className="hover:text-green-500" to="/products">
            Products
          </NavLink>
          <NavLink className="hover:text-green-500" to="/cart">
            Cart
          </NavLink>
          <NavLink className="hover:text-green-500" to="/about">
            About
          </NavLink>
        </div>
        <div className="hover:text-green-500">
          <Link to="/profile">
            <CircleUserRound className="size-10" strokeWidth={1.2} />
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
