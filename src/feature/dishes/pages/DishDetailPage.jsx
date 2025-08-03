import React from "react";
import { useLocation } from "react-router-dom";
import DishCard from "../components/DishCard";

const DishDetailPage = () => {
  const location = useLocation();
  const dish = location.state?.dish;

  if (!dish) return <p>Dish not found</p>;

  return (
    <div className="p-4">
      <DishCard dish={dish} />
    </div>
  );
};

export default DishDetailPage;
