import React, { useEffect, useState } from "react";
import { fetchAllDishes } from "../api/dishes";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
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
      setLoading(true);
      const result = await fetchAllDishes(pageIndex, pageSize); // Only send pagination
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
      setLoading(false);
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
      <ChevronUpIcon className="w-4 h-4 ml-1 text-gray-500" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
    );
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded shadow">
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider">
            <tr>
              {[
                { label: "Name", field: "name" },
                { label: "Prep Time", field: "prep_time" },
                { label: "Cook Time", field: "cook_time" },
                { label: "Diet", field: "diet" },
                { label: "Flavor", field: "flavor_profile" },
                { label: "State", field: "region" },
              ].map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() => toggleSort(field)}
                  className="cursor-pointer px-4 py-3 border border-gray-200 hover:bg-gray-200 transition select-none"
                >
                  <div className="flex items-center justify-between">
                    {label}
                    {getSortIcon(field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  <DishLoader />
                </td>
              </tr>
            ) : dishes.length > 0 ? (
              dishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-gray-50 transition">
                  <td
                    onClick={() => navigate(`/dishes/${dish.id}`)}
                    className="border px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                  >
                    {dish.name}
                  </td>
                  <td className="border px-4 py-2">{dish.prep_time} min</td>
                  <td className="border px-4 py-2">{dish.cook_time} min</td>
                  <td className="border px-4 py-2 capitalize">{dish.diet}</td>
                  <td className="border px-4 py-2 capitalize">
                    {dish.flavor_profile}
                  </td>
                  <td className="border px-4 py-2 capitalize">{dish.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No dishes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 text-sm">
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {pageIndex + 1} of {totalPages}
        </p>
        <button
          onClick={() =>
            setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={pageIndex + 1 >= totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DishTable;
