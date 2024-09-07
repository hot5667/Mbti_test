import axios from 'axios';

export const register = async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`,userData);
  const {token, user} = response.data;

  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem('token', token);

  return user;
};

export const getUserProfile = async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data;
};

export const updateProfile = async (formData, token) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/profile`,formData, {
    headers: {
      Authorization: `Bearer ${token}`, //! 인증 헤더 포함
      'Content-Type' : 'multipart/form-data' // 프로필 사진 등 파일 업로드 시사 사용할 헤더
    },
  });
  return response.data;
};