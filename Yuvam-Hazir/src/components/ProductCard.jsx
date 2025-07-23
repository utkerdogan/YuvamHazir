import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCartAsync } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

const handleAdd = () => {
  if (!user) {
    alert("Lütfen önce giriş yapın.");
    return;
  }

  const itemToAdd = {
    productId: product.id,    
    productName: product.name,      
    imageUrl: product.imageUrl || "",
    unitPrice: product.price,
    quantity: 1,
    isSavedForLater: false
  };

  dispatch(addToCartAsync(user.id, itemToAdd));
};


  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        onClick={() => history.push(`/product/${product.id}`)}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {product.description || 'Açıklama bulunmamaktadır.'}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-lg">
            {product.price} TL
          </span>

          {user && (
            <button 
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-2 rounded-md duration-200"
              onClick={handleAdd}
            >
              Sepete Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
