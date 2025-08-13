import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Handbag, Heart, ShoppingCart } from "lucide-react";
import Clothes from "./pages/categories/Clothes";
import Electronics from "./pages/categories/Electronics";
import Furniture from "./pages/categories/Furniture";
import Shoes from "./pages/categories/Shoes";
import Miscellaneous from "./pages/categories/Miscellaneous";
import ProductOverview from "./pages/ProductOverview";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} />
        <Route path="/product/:product_id" element={<ProductOverview />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

import { useState } from "react";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Clothes", path: "/clothes" },
    { name: "Electronics", path: "/electronics" },
    { name: "Furniture", path: "/furniture" },
    { name: "Shoes", path: "/shoes" },
    { name: "Miscellaneous", path: "/miscellaneous" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-green-500 bg-green-50">
      <div className="flex justify-between items-center gap-4 p-4 h-16">
        <Link to="/">
          <div className="flex items-center gap-2 text-green-500">
            <Handbag className="size-8" strokeWidth={2.5} />
            <span className="text-lg font-bold">GreenCart</span>
          </div>
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <X className="size-8 text-green-600" />
          ) : (
            <Menu className="size-8 text-green-600" />
          )}
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex flex-wrap items-center gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-200 hover:text-green-500 font-semibold ${
                  isActive
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop icons */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/wishlist">
            <Heart className="size-10 hover:text-green-500" strokeWidth={1.2} />
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCart
              className="size-10 hover:text-green-500"
              strokeWidth={1.2}
            />
          </NavLink>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-50 border-t border-green-200 px-4 pb-4">
          <div className="flex flex-col gap-3 mt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block w-full py-2 px-2 rounded transition-colors duration-200 hover:bg-green-100 hover:text-green-600 font-semibold ${
                    isActive ? "text-green-600 bg-green-100" : "text-gray-700"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 mt-2">
              <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
                <Heart
                  className="size-8 hover:text-green-500"
                  strokeWidth={1.2}
                />
              </NavLink>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                <ShoppingCart
                  className="size-8 hover:text-green-500"
                  strokeWidth={1.2}
                />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <span className="font-bold text-lg">GreenCart</span>
          <span className="ml-2 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:contact@greencart.com"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
          <a
            href="https://github.com/greencart"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/greencart"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
