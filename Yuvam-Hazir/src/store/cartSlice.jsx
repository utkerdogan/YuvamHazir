import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { mapCartFromBackend } from "../utils/cartMapper";

// Başlangıç state'i
const initialState = {
  userCarts: {}, // userId'ye göre cart listesi
};

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      const { userId, items } = action.payload;
      state.userCarts[userId] = items;
    },
    clearCart: (state, action) => {
      state.userCarts[action.payload] = [];
    },
    removeFromCart: (state, action) => {
      const { userId, cartItemId } = action.payload;
      state.userCarts[userId] = state.userCarts[userId]?.filter(
        (item) => item.id !== cartItemId
      );
    },
    updateQuantity: (state, action) => {
      const { userId, cartItemId, quantity } = action.payload;
      const item = state.userCarts[userId]?.find((i) => i.id === cartItemId);
      if (item) item.quantity = quantity;
    },
    addToCart: (state, action) => {
      const { userId, item } = action.payload;
      if (!state.userCarts[userId]) {
        state.userCarts[userId] = [];
      }

      const existing = state.userCarts[userId].find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.userCarts[userId].push(item);
      }
    },
  },
});

// Export edilen reducer actions
export const {
  setCartItems,
  clearCart,
  removeFromCart,
  updateQuantity,
  addToCart,
} = cartSlice.actions;

// Thunk: Sepeti getir
export const fetchCartAsync = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/cart/${userId}`);
    const mapped = mapCartFromBackend(res.data);
    dispatch(setCartItems({ userId, items: mapped }));
  } catch (err) {
    console.error("Cart fetch error:", err);
  }
};

// Thunk: Ürün ekle
export const addToCartAsync = (userId, item) => async (dispatch) => {
  try {
    const dto = {
      productId: item.productId,
      productName: item.productName,
      imageUrl: item.imageUrl,
      unitPrice: item.unitPrice,
      quantity: item.quantity || 1,
      isSavedForLater: item.isSavedForLater || false
    };

    await api.post(`/Cart/${userId}/add`, dto, {
      headers: { "Content-Type": "application/json" }
    });

    // 🔁 Sepeti baştan getir ki güncellensin
    dispatch(fetchCartAsync(userId));
  } catch (err) {
    console.error("Cart add error:", err);
  }
};



// Thunk: Miktar güncelle
export const updateQuantityAsync = (userId, cartItemId, quantity) => async (dispatch) => {
  try {
    await api.put(`/cart/${userId}/update/${cartItemId}`, { quantity }, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(updateQuantity({ userId, cartItemId, quantity }));
  } catch (err) {
    console.error("Cart quantity update error:", err);
  }
};


// Thunk: Ürün sil
export const removeFromCartAsync = (userId, cartItemId) => async (dispatch) => {
  try {
    await api.delete(`/cart/${userId}/remove/${cartItemId}`);
    dispatch(removeFromCart({ userId, cartItemId }));
  } catch (err) {
    console.error("Cart remove error:", err);
  }
};

// Thunk: Sepeti temizle
export const clearCartAsync = (userId) => async (dispatch) => {
  try {
    await api.delete(`/cart/${userId}/clear`);
    dispatch(clearCart(userId));
  } catch (err) {
    console.error("Cart clear error:", err);
  }
};

export default cartSlice.reducer;
