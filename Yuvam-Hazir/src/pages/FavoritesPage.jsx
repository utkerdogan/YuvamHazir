import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { fetchFavorites } from "../api/fetchFavorites";

const FavoritesPage = () => {
  // Redux üzerinden aktif userId alıyoruz
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavorites(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div className="text-center my-10">Favoriler yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="text-center my-10 text-red-500">
        Favoriler yüklenirken bir hata oluştu!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Favorilerim</h2>
      {products.length === 0 ? (
        <div className="text-gray-500 text-lg">Hiç favori ürününüz yok.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
