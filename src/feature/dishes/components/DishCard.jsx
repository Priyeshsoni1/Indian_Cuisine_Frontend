import React from "react";
import { useNavigate } from "react-router-dom";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white w-full max-w-md mx-auto">
      <div
        className="cursor-pointer border rounded-xl p-4 hover:shadow"
        onClick={() => navigate(`/dish/${dish.id}`)}
      >
        <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
        <p>
          <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
        </p>
        <p>
          <strong>Diet:</strong> {dish.diet}
        </p>
        <p>
          <strong>Prep Time:</strong> {dish.prep_time} min
        </p>
        <p>
          <strong>Cook Time:</strong> {dish.cook_time} min
        </p>
        <p>
          <strong>Flavor:</strong> {dish.flavor_profile}
        </p>
        <p>
          <strong>Course:</strong> {dish.course}
        </p>
        <p>
          <strong>Region:</strong> {dish.region}
        </p>
      </div>
    </div>
  );
};

export default DishCard;
