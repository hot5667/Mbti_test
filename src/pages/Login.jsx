import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../api/auth';
import useAuthStore from '../authStore';

const AuthForm = lazy(() => import('../components/AuthForm'));

const Login = () => {
  const { login: setLogin } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: login, isSuccess, data, isError, error } = useLogin();

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setLogin(data.user);
      navigate('/');
    }
  }, [isSuccess, data, setLogin, navigate]);

  useEffect(() => {
    if (isError) {
      console.error('로그인 실패:', error);
      setFormError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }, [isError, error]);

  const handleLogin = async (formData) => {
    setFormError(''); // Clear previous errors
    login(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">로그인</h1>
      <Suspense fallback={<div className="flex justify-center items-center h-24"><div className="spinner"></div></div>}>
        <AuthForm mode="login" onSubmit={handleLogin} />
      </Suspense>
      {formError && <p className="text-red-500 mt-4">{formError}</p>}
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;