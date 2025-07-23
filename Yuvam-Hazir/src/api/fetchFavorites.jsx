
import api from "./api";
import { store } from "../store/store";

// Bu fonksiyon component dışı utility olarak kullanılabilir (örn: mutationlarda)
export const getCurrentUserId = () => store.getState().auth.user?.id;

export const fetchFavorites = async (userId) => {
  if (!userId) return [];
  const { data: favoriteIds } = await api.get(`/favorites?userId=${userId}`);
  if (!favoriteIds.length) return [];
  const productPromises = favoriteIds.map((id) => api.get(`/product/${id}`));
  const productResponses = await Promise.all(productPromises);
  return productResponses.map((res) => res.data);
};

export const addFavorite = async (productId, userId) => {
  if (!userId) throw new Error("Kullanıcı yok!");
  await api.post(`/favorites/${productId}?userId=${userId}`);
};

export const removeFavorite = async (productId, userId) => {
  if (!userId) throw new Error("Kullanıcı yok!");
  await api.delete(`/favorites/${productId}?userId=${userId}`);
};
