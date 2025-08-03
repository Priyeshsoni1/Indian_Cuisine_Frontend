import React, { useEffect, useState } from "react";

import HeaderSearch from "../components/HeaderSearch";
import { fetchAllDishes } from "../api/dishes";
import DishList from "../components/DishList";

const HomePage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchAllDishes().then(setDishes);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <HeaderSearch />
      <DishList dishes={dishes} />
    </div>
  );
};

export default HomePage;
