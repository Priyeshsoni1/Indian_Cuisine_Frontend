import React, { useState } from "react";
import { fetchDishesByIngredients } from "../api/dishes";
import DishList from "./DishList";
import { ingredients as INGREDIENT_LIST } from "../utils/ingredient";
import DishLoader from "./Loader";

const DishSuggester = () => {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggested, setSuggested] = useState(null); // use `null` to know if search has occurred
  const [loading, setLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      const filtered = INGREDIENT_LIST.filter(
        (item) =>
          item.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.includes(item.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddIngredient = (ingredient = null) => {
    const trimmed =
      ingredient?.trim().toLowerCase() || inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        handleAddIngredient(filteredSuggestions[0]); // Use first suggestion
      } else {
        handleAddIngredient(); // fallback to raw input
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleAddIngredient(suggestion);
  };

  const handleRemoveIngredient = (item) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const handleSearch = async () => {
    setLoading(true);
    if (ingredients.length === 0) return;
    const result = await fetchDishesByIngredients(ingredients);
    setSuggested(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🍳 Find Recipes by Ingredients
        </h2>
        <p className="text-gray-500 text-sm">
          Start typing and pick from suggestions or hit Enter to add manually.
        </p>
      </div>

      {/* Ingredient input and chips */}
      <div className="flex flex-col gap-3 relative w-full">
        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {ingredients.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {item}
              <button
                onClick={() => handleRemoveIngredient(item)}
                className="text-blue-500 hover:text-red-600 text-xs"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Input + Suggestions */}
        <div className="relative w-full">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Start typing an ingredient (e.g. tomato)"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full max-h-40 overflow-y-auto shadow-md">
              {filteredSuggestions.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          🔍 Suggest Dishes
        </button>
      </div>
      {loading && <DishLoader />}
      {/* Results */}
      {suggested && (
        <div className="w-full">
          <h3 className="text-lg font-semibold mt-6 text-gray-700 mb-2">
            Suggested Recipes 🍲
          </h3>
          {suggested.length > 0 ? (
            <DishList dishes={suggested} />
          ) : (
            <div className="text-gray-500 text-sm border border-dashed border-gray-300 p-4 rounded-lg text-center">
              😕 No matching recipes found for selected ingredients.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DishSuggester;
