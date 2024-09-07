import { create }  from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: async (userData) => {
        try {
          set({ user: userData });
        } catch (error) {
          console.error('로그인 오류:', error);
        }
      },
      logout: () => {
        set({ user: null });
      },
      setUser: (user) => set({ user }), // 유저 정보를 직접 설정할 수 있는 방법 추가
    }),
    {
      name: 'auth-store', // 로컬 스토리지의 키
    }
  )
);

export default useAuthStore;
