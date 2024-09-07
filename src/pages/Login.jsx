import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../api/auth'; 

const Login = ({ setUser }) => {
  const handleLogin = async (formData) => {
    try {
      const user = await login(formData);
      setUser(user);
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
