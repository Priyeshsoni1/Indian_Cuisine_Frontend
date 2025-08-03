import React, { useState } from "react";
import { fetchDishesByIngredients } from "../api/dishes";
import DishList from "./DishList";

const DishSuggester = () => {
  const [ingredients, setIngredients] = useState("");
  const [suggested, setSuggested] = useState([]);

  const handleSearch = async () => {
    const list = ingredients.split(",").map((i) => i.trim());
    const result = await fetchDishesByIngredients(list);
    setSuggested(result);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Enter ingredients separated by commas"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Suggest Dishes
      </button>
      {suggested.length > 0 && <DishList dishes={suggested} />}
    </div>
  );
};

export default DishSuggester;
