import React, { Suspense, lazy } from "react";
import calculateMBTI from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate, Navigate } from "react-router-dom";
import useAuthStore from "../authStore";

const TestForm = lazy(() => import('../components/TestForm'));

const Test = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore(state => ({ user: state.user }));

  // user가 없으면 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleTestSubmit = async (answers) => {
    try {
      const result = calculateMBTI(answers);
      const resultData = {
        userId: user.id,
        nickname: user.nickname,
        result,
        answers,
        date: new Date().toISOString(),
        visibility: true,
      };
      await createTestResult(resultData);
      navigate("/results");
    } catch (error) {
      console.error("테스트 제출 실패:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <Suspense fallback={<div>로딩중...</div>}>
        <TestForm onSubmit={handleTestSubmit} />
      </Suspense>
    </div>
  );
};

export default Test;
