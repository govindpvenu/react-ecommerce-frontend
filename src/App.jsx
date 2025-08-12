import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <NavLink to="/" style={{ marginRight: "1rem" }}>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
