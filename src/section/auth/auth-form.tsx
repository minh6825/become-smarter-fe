'use client'
import { FormEvent, useState } from "react";
import PopupWrap from "../../components/common/popup-wrap";
import '@/style/css/google-btn.css'
import { NEXT_PUBLIC_SERVER } from "@/assets/constant";

export default function AuthForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true: Login, false: Signup

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleFormType = () => setIsLogin(!isLogin);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Xử lý logic đăng nhập/đăng ký ở đây
    alert(isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!");
  };

  const handleLoginGoogle = async () => {
    try {
      window.location.href = `${NEXT_PUBLIC_SERVER}/auth/google-login`; 
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="px-4 py-2 bg-primary text-primary-background font-bold rounded-md"
        onClick={togglePopup}
      >
        {isLogin ? "Đăng Nhập" : "Đăng Ký"}
      </button>

      <PopupWrap isOpen={isPopupOpen} onClose={togglePopup}>
        <h2 className="text-xl font-semibold mb-4 text-primary  text-center">
          {isLogin ? "Đăng Nhập" : "Đăng Ký"} (Chỉ hỗ trợ sign in google)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nhập email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-background  rounded-md"
          >
            {isLogin ? "Đăng Nhập" : "Đăng Ký"} 
          </button>
        </form>
        <button type="button" className="login-with-google-btn my-4  w-full" onClick={handleLoginGoogle}>
          Sign in with Google
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleFormType}
            className="text-primary hover:underline"
          >
            {isLogin
              ? "Chưa có tài khoản? Đăng ký ngay"
              : "Đã có tài khoản? Đăng nhập"}
          </button>
        </div>
      </PopupWrap>
    </div>
  );
}
