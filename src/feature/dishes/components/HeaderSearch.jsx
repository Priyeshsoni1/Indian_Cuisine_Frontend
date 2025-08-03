import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDishByName } from "../api/dishes";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const res = await fetchDishByName(query);
    if (res) navigate(`/dish/${res.id}`, { state: { dish: res } });
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        className="border rounded px-4 py-2 w-full"
        placeholder="Search dish by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default HeaderSearch;
