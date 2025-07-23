import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { StarIcon, ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../store/cartSlice";
import { toast } from "react-toastify";

const fetchProduct = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

const fetchFavorites = async (userId) => {
  if (!userId) return [];
  const { data } = await api.get(`/favorites?userId=${userId}`);
  return data;
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // Ürün ve favoriler sorguları
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const { data: favorites = [], refetch: refetchFavorites } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => fetchFavorites(user?.id),
    enabled: !!user?.id,
  });

  // Favoride mi?
  const isFavorite = favorites.includes(Number(id));

  // Favori ekle/çıkar işlemleri
  const handleToggleFavorite = async () => {
    if (!user) {
      toast.info("Favorilere eklemek için giriş yapmalısınız.");
      return;
    }
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}?userId=${user.id}`);
        toast.info("Favorilerden çıkarıldı.");
      } else {
        await api.post(`/favorites/${id}?userId=${user.id}`);
        toast.success("Favorilere eklendi!");
      }
      // Favoriler listesini güncelle
      queryClient.invalidateQueries(["favorites", user.id]);
    } catch (err) {
      toast.error("Favori işlemi başarısız.");
    }
  };

  const handleAdd = () => {
    dispatch(setCartItems(product));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarIcon key="half" className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-10">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ürün Yüklenirken Hata Oluştu</h2>
          <p className="text-gray-600 mb-6">{error?.message || "Bilinmeyen bir hata oluştu"}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-6">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <Skeleton height={400} className="rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton height={40} />
            <Skeleton count={4} />
            <Skeleton height={30} width={100} />
            <Skeleton height={30} width={150} />
            <Skeleton height={45} width={200} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-screen">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Geri Dön
      </button>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Ürün Resmi */}
          <div className="w-full md:w-1/2 p-6">
            <div className="relative group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-auto max-h-[500px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <button 
                className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors`}
                onClick={handleToggleFavorite}
                title={isFavorite ? "Favoriden Çıkar" : "Favorilere Ekle"}
              >
                {isFavorite ? 
                  <SolidHeart className="w-6 h-6 text-red-500" /> 
                  : 
                  <OutlineHeart className="w-6 h-6 text-gray-400 hover:text-red-500" />
                }
              </button>
            </div>
            
            {/* Küçük resimler (opsiyonel) */}
            <div className="flex mt-4 space-x-2">   
                <div className="w-16 h-16 border rounded-md overflow-hidden cursor-pointer hover:border-blue-500">
                  <img 
                    src={product.imageUrl} 
                    alt={`${product.name}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {product.Category || "Kategori"}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(product.Rating || 0)}
              </div>
              <span className="text-gray-500 text-sm">({product.ReviewCount || 0} değerlendirme)</span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{product.Price} TL</span>
              {product.OldPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">{product.OldPrice} TL</span>
              )}
              {product.Discount && (
                <span className="ml-2 text-green-600 font-medium">{product.Discount}% indirim</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{product.Description}</p>

            <div className="flex space-x-4">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors">
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Sepete Ekle
              </button>
              <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium transition-colors">
                Hemen Al
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-20">
              <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900">Kargo</h4>
                  <p>Ücretsiz Kargo</p>
                  <p>Tahmini Teslimat: 2-3 iş günü</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ürün Detayları ve Yorumlar Bölümü */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600">
              Ürün Detayları
            </button>
          </nav>
        </div>
        
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ürün Açıklaması</h3>
          <p className="text-gray-600">
            {product.Description || "Bu ürünle ilgili detaylı açıklama bulunmamaktadır."}
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Teknik Özellikler</h4>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li className="flex">
                  <span className="text-gray-500 w-32">Marka</span>
                  <span>{product.Brand || "Bilinmiyor"}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-500 w-32">Model</span>
                  <span>{product.Model || "Bilinmiyor"}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-500 w-32">Stok Kodu</span>
                  <span>{product.StockCode || "Bilinmiyor"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;