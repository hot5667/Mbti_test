import React from "react";
import { Link,useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

const Home = () => {
  const navigate  = useNavigate();
  const { user } = useAuthStore(state => ({user : state.user}))

  const handleTestClick = () => {
    if(!user) {
      alert("로그인이 필요합니다.")
      navigate("/login")
      return;
    } else {
      navigate("/test");
    }
  }


  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">무료 성격 테스트</h1>
      <p className="mb-4">자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      <button
        onClick={handleTestClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        검사하기
      </button>
      <div className="mt-4">
        <p>회원가입이 안되어있나요?</p>
        <Link to="/signup" className="text-blue-500 hover:underline">
          회원가입 하러 가기
        </Link>
      </div>
    </div>
  );
};

export default Home;