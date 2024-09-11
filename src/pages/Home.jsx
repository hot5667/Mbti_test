import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore(state => ({ user: state.user }));

  console.log('현재 사용자:', user);

  const handleTestClick = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/test");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
    }
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-r">
      <div className="text-center p-8 bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-extrabold mb-4">무료 성격 테스트</h1>
        <p className="text-lg mb-6 text-gray-700">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </p>
        <button
          onClick={handleTestClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          검사하기
        </button>
      </div>
    </div>
  );
};

export default Home;