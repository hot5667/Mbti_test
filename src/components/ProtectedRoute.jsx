import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../authStore';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && !user) {
      fetchUserFromToken(token)
        .then((userData) => {
          if (userData) {
            setUser(userData);
          } else {
            // 사용자 정보를 가져오는 데 실패한 경우
            setError('사용자 정보를 가져오는 데 실패했습니다.');
          }
        })
        .catch((err) => {
          // API 호출 중 에러 발생
          console.error('사용자 정보를 가져오는 도중 에러 발생:', err);
          setError('사용자 정보를 가져오는 도중 에러가 발생했습니다.');
        })
        .finally(() => {
          // 로딩 상태 해제
          setLoading(false);
        });
    } else {
      // 로딩 상태 해제
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) {
    // 로딩 중 표시
    return <div>Loading...</div>;
  }

  if (error) {
    // 에러 발생 시 표시
    return <div>{error}</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// 토큰으로부터 사용자 정보를 가져오는 예시 함수
const fetchUserFromToken = async (token) => {
  try {
    const response = await fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('사용자 정보를 가져오는 도중 에러 발생:', error);
    return null;
  }
};

export default ProtectedRoute;