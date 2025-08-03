import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/dishes"; // Adjust if needed

// GET /api/dishes – List all dishes
export const fetchAllDishes = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// GET /api/dishes/search?name=Modak – Get a single dish by name
export const fetchDishByName = async (name) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/search`, {
      params: { name },
    });
    return res.data;
  } catch (err) {
    console.log("Error in Fetch Dish By Name", err);
    return null;
  }
};

// POST /api/dishes/possible – Get dishes based on available ingredients
export const fetchDishesByIngredients = async (ingredients) => {
  const res = await axios.post(`${API_BASE_URL}/possible`, { ingredients });
  return res.data;
};
