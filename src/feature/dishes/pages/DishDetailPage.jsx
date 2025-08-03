import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDishById } from "../api/dishes";
import {
  Utensils,
  Timer,
  Flame,
  Globe,
  Soup,
  Heart,
  Wheat,
  ListTree,
} from "lucide-react";
import DishLoader from "../components/Loader";

const DishDetailPage = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDish = async () => {
      const result = await fetchDishById(id);
      setDish(result);
      setLoading(false);
    };

    loadDish();
  }, [id]);

  if (loading) return <DishLoader />;
  if (!dish)
    return <div className="p-8 text-center text-red-500">Dish not found</div>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 flex items-center gap-3">
        <Utensils className="w-7 h-7 text-orange-500" /> {dish.name}
      </h1>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Region:</span> {dish.region}
          </p>
          <p className="flex items-center gap-2">
            <Soup className="w-5 h-5 text-pink-500" />
            <span className="font-medium">Course:</span> {dish.course}
          </p>
          <p className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-medium">Flavor Profile:</span>{" "}
            {dish.flavor_profile}
          </p>
          <p className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-green-600" />
            <span className="font-medium">Diet:</span> {dish.diet}
          </p>
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Preparation Time:</span>{" "}
            {dish.prep_time} mins
          </p>
          <p className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-600" />
            <span className="font-medium">Cooking Time:</span> {dish.cook_time}{" "}
            mins
          </p>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
          <ListTree className="w-5 h-5 text-emerald-600" />
          Ingredients
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
          {dish.ingredients.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DishDetailPage;
