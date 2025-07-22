import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCartAsync, fetchCartAsync } from "../store/cartSlice";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) =>
    user ? state.cart.userCarts[user.id] || [] : []
  );

  const dispatch = useDispatch();

    useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.unitPrice) * item.quantity,
    0
  );

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Sepet görüntülemek için giriş yapmalısınız.
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-6">
            Alışverişe devam ederek sepetinizi doldurabilirsiniz
          </p>
          <Link
            to="/Products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sepetim</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {cartItems.length} Ürün
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} userId={user.id} />
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={() => dispatch(clearCartAsync(user.id))}
              className="flex items-center text-red-500 hover:text-red-700 font-medium text-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Sepeti Temizle
            </button>

            <div className="flex flex-col items-end">
              <p className="text-lg text-gray-600 mb-1">Toplam Tutar:</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalPrice.toFixed(2)}₺
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/Products"
              className="flex-1 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Alışverişe Devam Et
            </Link>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Ödemeye Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
