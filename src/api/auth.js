import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';
import useAuthStore from '../authStore';

// API URL 설정
const API_URL = import.meta.env.VITE_API_URL;

const registerSchema = z.object({
  username : z.string().min(1, '사용자 이름을 입력하세요').optional(),
  password : z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
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
export const getUserProfile = async (accessToken) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// 사용자 프로필 수정
export const updateProfile = async (formData) => {
  const response = await axios.put(`${API_URL}/profile`, formData);
  return response.data;
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
      if(data.accessToken){
        localStorage.setItem('accessToken', data.accessToken);
        setUser({...data, token: data.accessToken });
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
    enabled: !!token, // 토큰이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, //5분간 데이터가 신선한 데이터로 간주
    cacheTime: 10 * 60 *1000, //10분 동안 캐시 유지
  });
};

// 사용자 프로필 수정 Mutation Hook
export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};