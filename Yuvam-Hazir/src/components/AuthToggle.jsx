import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";
import { logout } from "../store/authSlice";
import CartIcon from "./CartIcon";
import { toast } from "react-toastify";

const AuthToggle = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.info('Çıkış yapıldı');
    history.push("/");
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-blue-600">
          Merhaba, <strong>{user.fullName}</strong>
        </span>
        <CartIcon
          onClick={() => history.push("/Cart")}
          className="w-6 h-6 cursor-pointer hover:text-blue-500"
        />
        <User
          onClick={() => history.push("/Profile")}
          className="w-6 h-6 cursor-pointer hover:text-blue-500"
        />
        <LogOut
          onClick={handleLogout}
          className="w-6 h-6 cursor-pointer hover:text-red-500"
        />
      </div>
    );
  }

  // Kullanıcı yoksa giriş/kayıt toggle + modal açıcı buton
  return (
    <div className="flex items-center gap-2">
      {/* Yazı ve Toggle Container */}
      <div className="flex items-center space-x-3">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.span
              key="login"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium text-gray-700"
            >
              Giriş Yap
            </motion.span>
          ) : (
            <motion.span
              key="register"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium text-gray-700"
            >
              Kayıt Ol
            </motion.span>
          )}
        </AnimatePresence>

        {/* Toggle Switch */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200"
        >
          <motion.span
            className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
            animate={{
              x: isLogin ? 1 : 26,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.5,
            }}
          />
        </button>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsRegister(isLogin); // dikkat: toggle ters mantıkta!
        }}
        className={`px-2 py-2 rounded-md transition-all duration-300 ${
          isLogin
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50"
        }`}
      >
        {isLogin ? "Kayıt Ol" : "Giriş Yap"}
      </button>

      {/* Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isRegister={isRegister}
      />
    </div>
  );
};

export default AuthToggle;
