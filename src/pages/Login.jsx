import React, { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLogin } from '../api/auth';
import useAuthStore from '../authStore';

const AuthForm = lazy(() => import('../components/AuthForm'));

const Login = () => {
  const { login: setLogin } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: login, isSuccess, data, isError, error } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      setLogin(data.user);
      navigate('/');
    }
  }, [isSuccess, data, setLogin, navigate]);

  const handleLogin = async (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (isError) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }, [isError, error]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <Suspense fallback = {<div>Loading...</div>}>
        <AuthForm mode="login" onSubmit={handleLogin} />
      </Suspense>
    </div>
  );
};

export default Login;