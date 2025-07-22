import React, { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const Products = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = searchTerm?.trim()
          ? await api.get(`/Product/search?query=${searchTerm}`)
          : await api.get("/Product");
        setProducts(res.data);
      } catch (err) {
        console.error("Ürünler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Ürünler</h1>
      {loading ? (
        <p className="text-center">Yükleniyor...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">
          Aradığınız kriterlere uygun ürün bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
