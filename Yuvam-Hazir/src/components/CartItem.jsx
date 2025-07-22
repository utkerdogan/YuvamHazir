import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
    removeFromCartAsync,
    updateQuantityAsync,
} from "../store/cartSlice";
import ConfirmModal from "./ConfirmModal";

const CartItem = ({ item, userId }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDecrease = () => {
        if (item.quantity > 1) {
        dispatch(updateQuantityAsync(userId, item.id, item.quantity - 1));
        }
    };

    const handleIncrease = () => {
        dispatch(updateQuantityAsync(userId, item.id, item.quantity + 1));
    };

    const handleRemove = () => {
        dispatch(removeFromCartAsync(userId, item.id));
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 hover:bg-gray-50 transition-colors">
        <div className="w-20 h-20 flex-shrink-0">
            <img
            src={item.imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover rounded-lg"
            />
        </div>

        <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{item.productName}</h3>
            <p className="text-sm text-gray-500 mt-1">
            {parseFloat(item.unitPrice).toFixed(2)}₺
            </p>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg">
            <button
            onClick={handleDecrease}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
            disabled={item.quantity <= 1}
            >
            <Minus size={16} className={item.quantity <= 1 ? "opacity-30" : ""} />
            </button>
            <span className="px-3 font-medium w-8 text-center">{item.quantity}</span>
            <button
            onClick={handleIncrease}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
            <Plus size={16} />
            </button>
        </div>

        <div className="font-semibold text-gray-900 whitespace-nowrap ml-4">
            {(parseFloat(item.unitPrice) * item.quantity).toFixed(2)}₺
        </div>

        <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
            aria-label="Ürünü kaldır"
        >
            <Trash2 size={18} />
        </button>

        <ConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleRemove}
            title="Ürünü Silmek Üzeresiniz"
            description={`“${item.productName}” ürününü sepetten silmek istediğinize emin misiniz?`}
        />
        </div>
    );
};

export default CartItem;
