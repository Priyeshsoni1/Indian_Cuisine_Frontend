import React from "react";
import DishSuggester from "../components/DishSuggester";

const SuggestedDishesPage = () => (
  <div className="p-2">
    <h1 className="text-2xl font-semibold mb-4">Find Dishes by Ingredients</h1>
    <DishSuggester />
  </div>
);

export default SuggestedDishesPage;
