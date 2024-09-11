import React from 'react';
import { MBTI_INFO } from '../utils/mbtiInfo'; // MBTI 유형에 대한 설명

const TestResultItem = ({ result, onUpdateVisibility, onDelete, user }) => {
    // 현재 사용자가 결과 작성자인지 확인
    const isOwner = result.userId === user.id;
    // 날짜 포맷팅
    const formattedDate = new Date(result.date).toLocaleDateString();
    // MBTI 유형 설명
    const description = MBTI_INFO[result.result] || "MBTI 유형 설명을 찾을 수 없습니다.";

    // 공개 상태를 토글하는 함수
    const handleToggleVisibility = () => {
        onUpdateVisibility(result.id, !result.visibility);
    };

    // 결과를 삭제하는 함수
    const handleDelete = () => {
        onDelete(result.id);
    };

    return (
        <div className="p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
                <h4 className="text-xl font-semibold">{result.nickname}</h4>
                <p className="text-sm ">{formattedDate}</p>
            </div>
            <p className="text-2xl font-bold text-yellow-400 mb-4">{result.result}</p>
            <p className="text-base  mb-4">{description}</p>
            {isOwner && (
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleToggleVisibility}
                        className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                        {result.visibility ? "비공개로 전환" : "공개로 전환"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
};

export default TestResultItem;
