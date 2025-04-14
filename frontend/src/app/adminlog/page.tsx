"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiLock, FiUser, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import Finger from '@/components/SVG/Finger';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Success from '@/components/Toast/success';
import Failed from '@/components/Toast/failed';

interface FormData {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState({
    Success: false,
    Failed: false
  });
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در ورود به سیستم');
      }

      Cookies.set('adminToken', data.token, { expires: 1 });
      setWarning("خوش آمدید.");
      setShowToast({ Success: true, Failed: false });
      setTimeout(() => {
        setShowToast({ Success: false, Failed: false });
        setWarning("");
        router.push('/admin');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'خطا در ارتباط با سرور');
      setShowToast({ Success: false, Failed: true });
      setWarning(err.message || 'خطا در ارتباط با سرور');
      setTimeout(() => {
        setShowToast({ Success: false, Failed: false });
        setWarning("");
      }, 3000);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-color1 bg-light-color1">
      <div className="w-full md:w-1/2 dark:bg-color6 bg-light-color6 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 dark:bg-color4 bg-light-color4 dark:bg-opacity-10 bg-opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 dark:bg-color4 bg-light-color4 dark:bg-opacity-10 bg-opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10 text-center dark:text-color2 text-light-color2">
          <Finger />
          <h1 className="text-3xl font-primaryRegular mb-4">پنل مدیریت حرفه‌ای</h1>
          <p className="dark:text-color7 text-light-color7 max-w-md mx-auto font-primaryMedium">
            به سیستم مدیریت یکپارچه خود دسترسی پیدا کنید و تجربه مدیریتی بی‌نظیری داشته باشید
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
        {showToast.Success && <Success showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
        {showToast.Failed && <Failed showToast={() => setShowToast({ Success: false, Failed: false })} text={warning} />}
        <div className="w-full max-w-md dark:bg-color5 bg-light-color5 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 dark:bg-color6 bg-light-color6 rounded-lg flex items-center justify-center mx-auto">
              <FiLock className="w-6 h-6 dark:text-color4 text-light-color4" />
            </div>
            <h1 className="text-2xl font-primaryRegular dark:text-color2 text-light-color2 mt-4">ورود به پنل مدیریت</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-primaryMedium dark:text-color3 text-light-color3 mb-2">
                نام کاربری
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none dark:text-color7 text-light-color7">
                  <FiUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 text-sm border dark:border-color1 border-light-color1 rounded-lg focus:ring-2 dark:focus:ring-color4 dark:focus:border-color4 focus:ring-light-color4 focus:border-light-color4  dark:bg-color6 bg-light-color6 dark:text-color2 text-light-color2 font-primaryLight"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium dark:text-color3 text-light-color3 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none dark:text-color7 text-light-color7">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 text-sm border dark:border-color1 border-light-color1 rounded-lg focus:ring-2 dark:focus:ring-color4 dark:focus:border-color4 focus:ring-light-color4 focus:border-light-color4  dark:bg-color6 bg-light-color6 dark:text-color2 text-light-color2 font-primaryLight"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-color7 text-light-color7 dark:hover:text-color2 hover:text-light-color2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 dark:text-color4 text-light-color4 dark:focus:ring-color4 focus:ring-light-color4 dark:border-color1 border-light-color1 rounded dark:bg-color6 bg-light-color6"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm dark:text-color3 text-light-color3 font-primaryLight">
                  مرا به خاطر بسپار
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-primaryMedium dark:text-color4 text-light-color4 dark:hover:text-color8 hover:text-light-color8">
                  رمز عبور را فراموش کرده‌اید؟
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`font-primaryMedium w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium dark:text-color1 text-light-color1 dark:bg-color4 bg-light-color4 dark:hover:bg-color8 hover:bg-light-color8 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-color9 focus:ring-light-color9 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
              ) : (
                <>
                  <FiLogIn className="ml-2 w-5 h-5" />
                  ورود به سیستم
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm dark:text-color7 text-light-color7 font-primaryMedium">
            <p>© {new Date().getFullYear()} سیستم مدیریت. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;