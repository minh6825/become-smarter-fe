import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCog, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa';
import ClickOutline from '@/components/common/click-outline';

type Props = {
  userInfo: {
    name: string;
    email: string;
    avatar?: string; // Avatar có thể không tồn tại
  };
};

const UserInfo = ({ userInfo }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };

  // Lấy chữ cái đầu nếu không có avatar
  const getDefaultAvatar = (name: string) =>
    name ? name.charAt(0).toUpperCase() : '?';

  // Cắt tên tối đa 12 ký tự
  const displayName = userInfo.name.length > 12 ? `${userInfo.name.slice(0, 12)}...` : userInfo.name;

  return (
    <div className="relative">
      {/* Avatar and Name */}
      <motion.button 
        className="flex items-center space-x-2 border p-2 rounded-lg shadow-md hover:bg-primary-background transition"
        onClick={() => toggleMenu()}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}  
      >
        {userInfo.avatar ? (
          <img
            src={userInfo.avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-full  text-primary text-lg font-bold">
            {getDefaultAvatar(userInfo.name)}
          </div>
        )}
        <span className="text-sm font-medium">{displayName}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <ClickOutline setIsMenuOpen={setIsMenuOpen}>
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-primary-background z-50 shadow-lg rounded-lg border border-gray-200 "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ul className="py-1">
                <li className="hover:opacity-80 flex items-center space-x-2 px-4 py-2">
                  <FaInfoCircle className="text-blue-500" />
                  <button className="w-full text-left text-sm text-primary">
                    Xem Thông Tin
                  </button>
                </li>
                <li className="hover:opacity-80 flex items-center space-x-2 px-4 py-2">
                  <FaCog className="text-gray-500" />
                  <button className="w-full text-left text-sm text-primary">
                    Cài Đặt
                  </button>
                </li>
                <li className="hover:opacity-80 flex items-center space-x-2 px-4 py-2">
                  <FaSignOutAlt className="text-red-500" />
                  <button className="w-full text-left text-sm text-red-600">
                    Đăng Xuất
                  </button>
                </li>
              </ul>
            </motion.div>
          </ClickOutline>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserInfo;
