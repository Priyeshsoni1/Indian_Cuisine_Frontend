import React, { useEffect, useState } from "react";
import { fetchAllDishes } from "../api/dishes";
import { useNavigate } from "react-router-dom";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import DishLoader from "./Loader";

const pageSize = 10;

const DishTable = () => {
  const [dishes, setDishes] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDishes = async () => {
      const result = await fetchAllDishes(pageIndex, pageSize);
      const sorted = [...(result.data || [])].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });
      setDishes(sorted);
      setTotalPages(result.totalPages);
    };
    loadDishes();
  }, [pageIndex, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 text-gray-500" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
    );
  };

  const formatIngredients = (ingredients = []) => {
    const visible = ingredients.slice(0, 4);
    const extraCount = ingredients.length - visible.length;
    return (
      <div title={ingredients.join(", ")} className="flex flex-wrap gap-1">
        {visible.map((ing, i) => (
          <span
            key={i}
            className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full"
          >
            {ing}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="text-xs text-gray-500 px-2 py-1">
            +{extraCount} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Dishes</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              {[
                { label: "Name", field: "name" },
                { label: "Prep Time", field: "prep_time" },
                { label: "Cook Time", field: "cook_time" },
                { label: "Diet", field: "diet" },
                { label: "Flavor", field: "flavor_profile" },
                { label: "State", field: "region" },
                { label: "Ingredients", field: "ingredients" },
              ].map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() => field !== "ingredients" && toggleSort(field)}
                  className={`px-4 py-3 whitespace-nowrap ${
                    field !== "ingredients"
                      ? "cursor-pointer hover:bg-blue-50 transition rounded-t"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {getSortIcon(field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  <DishLoader />
                </td>
              </tr>
            ) : dishes.length > 0 ? (
              dishes.map((dish) => (
                <tr
                  key={dish.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate(`/dishes/${dish.id}`)}
                >
                  <td className="px-4 py-3 text-blue-600 font-medium hover:underline truncate max-w-[200px]">
                    {dish.name}
                  </td>
                  <td className="px-4 py-3">{dish.prep_time} min</td>
                  <td className="px-4 py-3">{dish.cook_time} min</td>
                  <td className="px-4 py-3 capitalize">{dish.diet}</td>
                  <td className="px-4 py-3 capitalize">
                    {dish.flavor_profile}
                  </td>
                  <td className="px-4 py-3 capitalize">{dish.region}</td>
                  <td className="px-4 py-3">
                    {formatIngredients(dish.ingredients)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
                  No dishes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Prev
        </button>

        <span className="text-sm text-gray-700">
          Page <strong>{pageIndex + 1}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() =>
            setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={pageIndex + 1 >= totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DishTable;
