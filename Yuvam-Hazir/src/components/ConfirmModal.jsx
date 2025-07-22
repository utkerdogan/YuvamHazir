import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
    return (
        <AnimatePresence>
        {isOpen && (
            <motion.div
            className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <motion.div
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-4">{description}</p>

                <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                >
                    Vazgeç
                </button>
                <button
                    onClick={() => {
                    onConfirm();
                    onClose();
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Evet, Sil
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
