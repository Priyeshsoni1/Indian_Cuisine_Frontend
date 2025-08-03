import React from "react";
import DishCard from "./DishCard";

const DishList = ({ dishes, lastDishRef }) => {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 text-lg">
        No dishes found. Try changing your ingredients or filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish, index) => {
        const isLast = index === dishes.length - 1;
        return (
          <div
            key={`${dish.id}-${index}`}
            ref={isLast ? lastDishRef : null}
            className="animate-fadeIn"
          >
            <DishCard dish={dish} />
          </div>
        );
      })}
    </div>
  );
};

export default DishList;
