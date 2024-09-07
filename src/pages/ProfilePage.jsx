import React, { useState, useEffect } from 'react';
import { getUserProfile, updateProfile } from '../api/auth'; // 사용자 프로필 관련 API 요청

const ProfilePage = ({ user, setUser }) => {
  const [nickname, setNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 프로필 정보를 가져옴
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setNickname(profile.nickname);
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
    // 취소 시 원래 닉네임으로 되돌리기
    setNickname(user.nickname);
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
    <div className="p-4">
      <h1 className="text-2xl mb-4">프로필 페이지</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              저장
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="text-lg mb-2">닉네임: {nickname}</p>
          <button
            onClick={handleEditClick}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            닉네임 수정
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
