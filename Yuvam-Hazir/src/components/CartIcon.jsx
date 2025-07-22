import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const CartIcon = ({ onClick }) => {
    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) =>
        state.auth.user ? state.cart.userCarts[state.auth.user.id] || [] : []
    );


    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative cursor-pointer" onClick={onClick}>
        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
        {total > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {total}
            </span>
        )}
        </div>
    );
};

export default CartIcon;
