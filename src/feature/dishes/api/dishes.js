import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/dishes"; // Adjust if needed

// GET /api/dishes – List all dishes
// /api/dishes.js or /api/dishes.ts
export async function fetchAllDishes(pageIndex = 0, pageSize = 10) {
  const res = await fetch(
    `${API_BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

// GET /api/dishes/search?name=Modak – Get a single dish by name
export const fetchDishSuggestions = async (query) => {
  const res = await fetch(
    `${API_BASE_URL}/suggest?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
};

// POST /api/dishes/possible – Get dishes based on available ingredients
export const fetchDishesByIngredients = async (ingredients) => {
  const res = await axios.post(`${API_BASE_URL}/possible`, { ingredients });
  return res.data;
};
// GET /api/dishes/:id – Get dish by ID
export const fetchDishById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching dish by ID", err);
    return null;
  }
};
