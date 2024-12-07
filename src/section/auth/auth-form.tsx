'use client'
import { FormEvent, useState } from "react";
import PopupWrap from "../../components/common/popup-wrap";
import { loginGoogleApi } from "@/api/user/auth.rest";

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
      window.location.href = 'http://localhost:8000/api/v1/auth/google-login'; 
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <button
        className="px-4 py-2 bg-primary text-primary-background font-bold rounded-md"
        onClick={togglePopup}
      >
        {isLogin ? "Đăng Nhập" : "Đăng Ký"}
      </button>

      <PopupWrap isOpen={isPopupOpen} onClose={togglePopup}>
        <h2 className="text-xl font-semibold mb-4 text-primary-background  text-center">
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700">
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
        <button className="text-center text-primary-background w-full mt-4" onClick={handleLoginGoogle}>Login with google</button>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleFormType}
            className="text-primary-background hover:underline"
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
