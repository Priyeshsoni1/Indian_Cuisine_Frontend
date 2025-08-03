import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaClock, FaUtensils, FaGlobeAsia } from "react-icons/fa";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dish/${dish.id}`)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && navigate(`/dish/${dish.id}`)
      }
      aria-label={`View details for ${dish.name}`}
      className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 w-full max-w-2xl mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{dish.name}</h2>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
        </p>
        <p className="flex items-center gap-1">
          <FaLeaf className="text-green-500" />
          <strong>Diet:</strong> {dish.diet}
        </p>
        <p className="flex items-center gap-1">
          <FaClock className="text-blue-500" />
          <strong>Prep:</strong> {dish.prep_time} min &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong>Cook:</strong> {dish.cook_time} min
        </p>
        <p className="flex items-center gap-1">
          <FaUtensils className="text-yellow-500" />
          <strong>Flavor:</strong> {dish.flavor_profile} |{" "}
          <strong>Course:</strong> {dish.course}
        </p>
        <p className="flex items-center gap-1">
          <FaGlobeAsia className="text-red-500" />
          <strong>Region:</strong> {dish.region}
        </p>
      </div>
    </article>
  );
};

export default DishCard;
