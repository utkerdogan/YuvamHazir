// src/components/TopRatedProducts.jsx

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../api/api";

const TopRatedProducts = ({ limit = 6 }) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    api
      .get("/Product")
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
          .slice(0, limit);

        setTopProducts(sorted);

    console.log("Fetching top rated products..." + topProducts);
      })
      .catch((err) => console.error("Top rated ürünler alınamadı:", err));
  }, [limit]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">En Çok Beğenilenler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedProducts;
