import React, { useEffect, useState, useRef, useCallback } from "react";
import HeaderSearch from "../components/HeaderSearch";
import { fetchAllDishes } from "../api/dishes";
import DishList from "../components/DishList";
import DishTable from "../components/DishTable"; // ✅ NEW
import DishLoader from "../components/Loader";

const pageSize = 10;

const HomePage = () => {
  const [dishes, setDishes] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // ✅ "list" | "table"

  const observer = useRef(null);

  const lastDishRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageIndex((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadDishes = async () => {
      setLoading(true);
      const result = await fetchAllDishes(pageIndex, pageSize);
      setDishes((prev) => [...prev, ...result.data]);
      setHasMore(pageIndex + 1 < result.totalPages);
      setLoading(false);
    };

    loadDishes();
  }, [pageIndex]);

  return (
    <div className="p-4 space-y-4">
      <HeaderSearch />

      {/* ✅ Toggle Chip View Mode */}
      <div className="flex gap-2 justify-end">
        <button
          className={`px-4 py-2 rounded-full border ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => setViewMode("list")}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${
            viewMode === "table"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => setViewMode("table")}
        >
          Table View
        </button>
      </div>

      {viewMode === "list" ? (
        <>
          <DishList dishes={dishes} lastDishRef={lastDishRef} />
          {loading && <DishLoader />}
          {!hasMore && (
            <p className="text-center text-gray-400">No more dishes</p>
          )}
        </>
      ) : (
        <DishTable dishes={dishes} />
      )}
    </div>
  );
};

export default HomePage;
