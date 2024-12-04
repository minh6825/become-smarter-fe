"use client";

import { motion, AnimatePresence } from "framer-motion";

const PopupWrap = ({ isOpen, onClose, children }: {isOpen: boolean, children: React.ReactNode, onClose:  () => void}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close popup when clicking outside
          ></motion.div>

          {/* Popup Content */}
          <motion.div
            className="fixed top-1/2 left-1/2  w-[90%] max-w-lg bg-white rounded-lg shadow-lg z-50 p-6"
            initial={{ opacity: 0, y: '-55%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-4 right-6 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupWrap;
