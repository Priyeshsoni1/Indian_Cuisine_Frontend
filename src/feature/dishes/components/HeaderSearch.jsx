import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchDishSuggestions } from "../api/dishes";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchDishSuggestions(query);
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    }, 400); // ⏱ You can adjust debounce delay here

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (dish) => {
    navigate(`/dish/${dish.id}`, { state: { dish } });
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative max-w-xl w-full mx-auto mt-4">
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search dishes by name, ingredient or region..."
          className="w-full outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-lg mt-2 rounded-lg max-h-60 overflow-auto">
          {suggestions.map((dish, index) => (
            <li
              key={`${dish.id}-${index}`}
              onClick={() => handleSelect(dish)}
              className="px-4 py-2 cursor-pointer hover:bg-orange-50"
            >
              <strong>{dish.name}</strong>{" "}
              <span className="text-sm text-gray-500">({dish.region})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
