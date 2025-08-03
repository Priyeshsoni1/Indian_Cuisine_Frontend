import React from "react";
import DishCard from "./DishCard";

const DishList = ({ dishes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {dishes.map((dish) => (
      <DishCard key={dish.id} dish={dish} />
    ))}
  </div>
);

export default DishList;
