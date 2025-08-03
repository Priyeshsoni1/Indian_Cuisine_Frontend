import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { MdAdd } from "react-icons/md";

import HomePage from "./feature/dishes/pages/HomePage";
import DishDetailPage from "./feature/dishes/pages/DishDetailPage";
import SuggestedDishesPage from "./feature/dishes/pages/SuggestDishesPage";
import AddDishPage from "./feature/dishes/pages/AddDishPage";

// NavItem Component – clean, responsive, colorful
function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`relative inline-block px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
          ${
            isActive
              ? "text-blue-700 font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-1 after:bg-blue-700 after:rounded-full"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    </li>
  );
}

// Navbar – with animation, shadows, mobile spacing, better theming
function Navbar() {
  return (
    <nav
      className="bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 shadow-md sticky top-0 z-50"
      aria-label="Primary"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-blue-700 hover:text-blue-900 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded"
          >
            🍽 Indian Cuisine
          </Link>
          <ul
            className="flex items-center space-x-1 sm:space-x-6"
            role="menubar"
          >
            <NavItem to="/add">Add Dish</NavItem>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/suggested">Suggested</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// App – colorful background, spacing, accessible structure
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 font-sans">
        <Navbar />
        <main className="py-8 sm:py-10" aria-label="Main content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dish/:id" element={<DishDetailPage />} />
              <Route path="/suggested" element={<SuggestedDishesPage />} />
              <Route path="/add" element={<AddDishPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
