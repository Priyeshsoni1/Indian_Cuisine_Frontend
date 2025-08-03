import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createDish } from "../api/dishes";
import { ingredients as ALL_INGREDIENTS } from "../utils/ingredient";

export default function AddDishPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    ingredients: [],
    diet: "",
    prep_time: "",
    cook_time: "",
    flavor_profile: "",
    course: "",
    region: "",
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIngredient = (ingredient) => {
    const normalized = ingredient.trim().toLowerCase();
    if (!normalized || form.ingredients.includes(normalized)) return;
    setForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, normalized],
    }));
    setIngredientInput("");
  };

  const handleRemoveIngredient = (ingredient) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== ingredient),
    }));
  };

  const handleIngredientInputKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      const suggestion = filteredSuggestions[0] || ingredientInput.trim();
      if (suggestion) handleAddIngredient(suggestion);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        prep_time: Number(form.prep_time),
        cook_time: Number(form.cook_time),
      };

      await createDish(payload);
      toast.success("Dish created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSuggestions = ingredientInput.trim()
    ? ALL_INGREDIENTS.filter(
        (ing) =>
          ing.toLowerCase().includes(ingredientInput.toLowerCase()) &&
          !form.ingredients.includes(ing.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">
        Add a New Dish
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dish Name */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Dish Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            placeholder="e.g., Paneer Butter Masala"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Diet */}
        <div>
          <label htmlFor="diet" className="block font-medium text-gray-700">
            Diet
          </label>
          <select
            id="diet"
            name="diet"
            value={form.diet}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label htmlFor="course" className="block font-medium text-gray-700">
            Course
          </label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Select Course</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        {/* Flavor Profile */}
        <div>
          <label
            htmlFor="flavor_profile"
            className="block font-medium text-gray-700"
          >
            Flavor Profile
          </label>
          <select
            id="flavor_profile"
            name="flavor_profile"
            value={form.flavor_profile}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Select Flavor</option>
            <option value="spicy">Spicy</option>
            <option value="sweet">Sweet</option>
            <option value="savory">Savory</option>
            <option value="tangy">Tangy</option>
            <option value="bitter">Bitter</option>
          </select>
        </div>

        {/* Prep Time */}
        <div>
          <label
            htmlFor="prep_time"
            className="block font-medium text-gray-700"
          >
            Prep Time (mins)
          </label>
          <input
            id="prep_time"
            name="prep_time"
            type="number"
            placeholder="e.g., 15"
            value={form.prep_time}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Cook Time */}
        <div>
          <label
            htmlFor="cook_time"
            className="block font-medium text-gray-700"
          >
            Cook Time (mins)
          </label>
          <input
            id="cook_time"
            name="cook_time"
            type="number"
            placeholder="e.g., 30"
            value={form.cook_time}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Region */}
        <div>
          <label htmlFor="region" className="block font-medium text-gray-700">
            Region
          </label>
          <input
            id="region"
            name="region"
            type="text"
            autoComplete="off"
            placeholder="e.g., South India"
            value={form.region}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Ingredients
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="ml-2 text-blue-500 hover:text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            autoComplete="off"
            placeholder="Type an ingredient and press enter..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleIngredientInputKeyDown}
          />

          {ingredientInput && filteredSuggestions.length > 0 && (
            <ul className="mt-1 border border-gray-300 rounded bg-white max-h-40 overflow-y-auto shadow-md z-20 relative">
              {filteredSuggestions.map((sugg) => (
                <li
                  key={sugg}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => handleAddIngredient(sugg)}
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Dish"}
        </button>
      </form>
    </div>
  );
}
