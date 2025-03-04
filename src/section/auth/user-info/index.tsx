import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCog, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import ClickOutline from "@/components/common/click-outline";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutApi } from "@/api/user/auth.rest";

type Props = {
  userInfo: {
    name: string;
    email: string;
    avatar?: string; // Avatar có thể không tồn tại
  };
};

const UserInfo = ({ userInfo }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Lấy chữ cái đầu nếu không có avatar
  const getDefaultAvatar = (name: string) =>
    name ? name.charAt(0).toUpperCase() : "?";

  // Cắt tên tối đa 12 ký tự
  const displayName =
    userInfo.name.length > 12
      ? `${userInfo.name.slice(0, 12)}...`
      : userInfo.name;

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light"
  );

  // The active theme is not available on the server.
  // If you have styling that is conditionally applied based on the active-theme,
  // you have to await the mounted state before rendering the active theme.
  useEffect(() => setMounted(true), []);
  const themeColor = ['light', 'dark-classic', 'tangerine', 'dark-tangerine', 'mint', 'dark-mint'];
  const themeMapping: Record<string, string> = {
    light: "Default",
    "dark-classic": "Dark",
    tangerine: "Tangerine",
    "dark-tangerine": "Tangerine (dark)",
    mint: "Mint",
    "dark-mint": "Mint (dark)",
  };

  useEffect(() => {
    if (localStorage) {
      const themeCurrent = localStorage.getItem("theme");
      if (themeCurrent !== null) {
        setTheme(themeCurrent);
        document.documentElement.setAttribute("data-theme", themeCurrent);
      }
    }
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
  };

  const handleLogout = async () => {
    try {
      deleteCookie('accessToken')
      await logoutApi()
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
  }

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
                  <Link href={'/profile'}   className="w-full text-left text-sm text-primary">
                    Xem Thông Tin
                  </Link>
                </li>
                <li className="hover:opacity-80 flex items-center space-x-2 px-4 py-2">
                  <FaCog className="text-gray-500" />
                  <button className="w-full text-left text-sm text-primary">
                    Cài Đặt
                  </button>
                </li>
                <li className="hover:opacity-80 flex items-center space-x-2 px-4 py-2">
                  <FaSignOutAlt className="text-red-500" />
                  <button onClick={handleLogout} className="w-full text-left text-sm text-red-600">
                    Đăng Xuất
                  </button>
                </li>
              </ul>
              <div className="px-4 py-2 w-full justify-between flex gap-1">
                {Object.entries(themeMapping).map(([key, value], index) => (
                  <button
                    key={key}
                    className={`font-semibold h-4 w-4 rounded-full transition-colors duration-200 
                      ${themeColor[index] == 'light' && 'bg-primary-root-light'}
                      ${themeColor[index] == 'dark-classic' && 'bg-primary-root-dark'}
                      ${themeColor[index] == 'dark-tangerine' && 'bg-primary-root-green'}
                      ${themeColor[index] == 'tangerine' && 'bg-primary-root-orange'}
                      ${themeColor[index] == 'dark-tangerine' && 'bg-primary-root-orange-dark'}
                      ${themeColor[index] == 'mint' && 'bg-primary-root-mint'}
                      ${themeColor[index] == 'dark-mint' && 'bg-primary-root-mint-dark'}
                      ${                      
                      mounted && theme === key
                        ? "shadow-md border-2 border-primary text-primary"
                        : "text-primary-foreground"
                    }`}
                    onClick={() => handleThemeChange(key)}
                  >
                    
                  </button>
                ))}
              </div>
            </motion.div>
          </ClickOutline>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserInfo;
