import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      login: async (userData) => {
        try {
          const response = await axios.post(`${API_URL}/login`, userData);
          const { accessToken, ...user } = response.data;

          // 상태와 로컬 스토리지에 토큰 저장
          localStorage.setItem('token', accessToken);
          set({ user, accessToken });
        } catch (error) {
          console.error('로그인 오류:', error);
          throw error;
        }
      },
      logout: () => {
        // 상태와 로컬 스토리지에서 토큰 및 사용자 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null });
      },
      setUser: (user) => set({ user }), // 유저 정보를 직접 설정할 수 있는 방법 추가
    }),
    {
      name: 'auth-store', // 로컬 스토리지의 키
    }
  )
);

export default useAuthStore;