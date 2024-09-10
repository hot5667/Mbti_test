import React from 'react';
import { useNavigate } from "react-router-dom";
import AuthForm from '../components/AuthForm';
import { useLogin } from '../api/auth';
import useAuthStore from '../authStore';

const Login = () => {
  const { login: setLogin } = useAuthStore();
  const { mutate: login, isSuccess, data, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    login(formData, {
      onSuccess: (data) => {
        setLogin(data.user);  // 로그인 성공 시 사용자 상태 저장
        navigate("/");  // 홈으로 리디렉션
      },
      onError: (error) => {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;