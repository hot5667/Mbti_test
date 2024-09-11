import React, { useState, useEffect } from 'react';
import useAuthStore from '../authStore';
import { getUserProfile, updateProfile } from '../api/auth'; // 사용자 프로필 관련 API 요청

const ProfilePage = () => {
  const [nickname, setNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const user = useAuthStore((state)=>state.user);
  const setUser = useAuthStore((state)=>state.setUser);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 프로필 정보를 가져옴
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setNickname(profile);
      } catch (error) {
        console.error('프로필을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNickname(user.nickname); // 취소 시 원래 닉네임으로 복원
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ nickname });
      setUser({ ...user, nickname }); // 상태 업데이트
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">프로필 페이지</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={nickname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                저장
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="w-full py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-700 text-center">닉네임: <span className="font-semibold">{nickname}</span></p>
            <button
              onClick={handleEditClick}
              className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              닉네임 수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;