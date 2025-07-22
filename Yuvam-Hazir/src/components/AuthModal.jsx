import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast } from "react-toastify";

const AuthModal = ({ isOpen, onClose, isRegister }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

const onSubmit = async (data) => {
  try {
    if (isRegister) {
      await api.post("/auth/register", {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber, 
        password: data.password,
      });
      toast.success("Kayıt başarılı!");
    } else {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      dispatch(login(res.data));
      toast.success("Giriş başarılı!");
    }
    onClose();
    reset();
  } catch (error) {
    console.error("Auth hatası:", error);
    toast.error(
      error.response?.data || "İşlem sırasında bir hata oluştu"
    );
  }
};

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </motion.button>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold mb-4 text-center"
            >
              {isRegister ? "Kayıt Ol" : "Giriş Yap"}
            </motion.h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {isRegister && (
                <>
                  <div>
                    <label className="block mb-1">Ad Soyad</label>
                    <input
                      {...register("fullName", {
                        required: "Ad Soyad gerekli",
                      })}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Telefon Numarası</label>
                    <input
                      {...register("phoneNumber", {
                        required: "Telefon numarası gerekli",
                      })}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label className="block mb-1">Email</label>
                <input
                  {...register("email", {
                    required: "Email gerekli",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Geçerli bir email girin",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1">Şifre</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Şifre gerekli",
                    minLength: {
                      value: 6,
                      message: "En az 6 karakter olmalı",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {isRegister ? "Kayıt Ol" : "Giriş Yap"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
