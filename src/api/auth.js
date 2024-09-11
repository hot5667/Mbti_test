import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import {
  z
} from 'zod';
import axios from 'axios';
import useAuthStore from '../authStore';

// API URL 설정
const API_URL =
  import.meta.env.VITE_API_URL;

const registerSchema = z.object({
  username: z.string().min(1, '사용자 이름을 입력하세요').optional(),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
})

// 사용자 등록
export const register = async (userData) => {
  //데이터 검증
  registerSchema.parse(userData);

  try {
    console.log('회원가입 데이터:', userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("회원 가입 실패", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 사용자 로그인
export const login = async (userData) => {
  try {
    console.log('로그인 데이터:', userData);
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error('로그인 실패', error);
  }
};

// 사용자 프로필 가져오기
export const getUserProfile = async () => {
  const authStore = localStorage.getItem("auth-store");

  if (!authStore) {
    throw new Error("로그인이 필요합니다.");
  }

  // authStore에서 토큰 추출
  const parsedAuthStore = JSON.parse(authStore);
  const accessToken = parsedAuthStore.state.user.accessToken;

  if (!accessToken) {
    throw new Error("유효한 토큰이 없습니다.");
  }

  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });

  console.log(response.data.nickname);
  // 유저 닉네임만 반환
  return response.data.nickname;
};


// 사용자 프로필 수정
export const updateProfile = async (formData) => {
  const authStore = localStorage.getItem("auth-store");

  if (!authStore) {
    throw new Error("로그인이 필요합니다.");
  }

  // authStore에서 토큰 추출
  const parsedAuthStore = JSON.parse(authStore);
  const accessToken = parsedAuthStore.state.user.accessToken;

  if (!accessToken) {
    throw new Error("유효한 토큰이 없습니다.");
  }

  try {
    const response = await axios.patch(`${API_URL}/profile`,
      formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return response.data;// 업데이트된 데이터 반환

  } catch (error) {
    throw new Error("프로필을 수정하는 데 실패했습니다.");
  }
};

// 사용자 등록 Mutation Hook
export const useRegister = () => {
  return useMutation(register);
};

// 사용자 로그인 Mutation Hook
export const useLogin = () => {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // JWT 토큰을 localStorage에 저장
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        setUser({
          ...data,
          token: data.accessToken
        });
        console.log('로그인 성공, 토큰 저장됨:', data.accessToken);
      } else {
        console.error('토큰이 없습니다. 응답 데이터를 확인하세요:', data);
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
    },
  });
};

// 사용자 프로필 Query Hook
export const useUserProfile = (token) => {
  return useQuery(['userProfile'], () => getUserProfile(token), {
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// 사용자 프로필 수정 Mutation Hook
export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};