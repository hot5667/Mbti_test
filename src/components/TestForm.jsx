import React, { useState, useRef, useEffect } from 'react';
import { questions } from '../data/questions';

const QUESTIONS_PER_PAGE = 5;

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [currentPage, setCurrentPage] = useState(0);

  const questionRefs = useRef([]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  useEffect(() => {
    if (questionRefs.current[currentPage * QUESTIONS_PER_PAGE]) {
      questionRefs.current[currentPage * QUESTIONS_PER_PAGE].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentPage]);

  const handleChange = (index, answer) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((prevAnswer, i) => (i === index ? answer : prevAnswer))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, totalPages - 1);
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 0);
      }
    });
  };

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {currentQuestions.map((q, index) => (
        <div
          key={q.id}
          ref={(el) => (questionRefs.current[startIndex + index] = el)}
          className="mb-6"
        >
          <p className="text-lg font-semibold mb-2">{q.question}</p>
          <p className="text-sm text-gray-500 mb-4">{q.description || "선택해주세요:"}</p>
          <div className="flex flex-col space-y-2">
            {q.options.map((option) => (
              <label
                key={option}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300
                  ${answers[startIndex + index] === option ? 'bg-blue-50 border-blue-400 text-blue-800' : 'border-gray-200'}
                  border-2 hover:bg-blue-100`}
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[startIndex + index] === option}
                  onChange={() => handleChange(startIndex + index, option)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full mr-3
                    ${answers[startIndex + index] === option ? 'bg-blue-500' : 'border-gray-300'}`}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => handlePageChange('prev')}
          className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 0}
        >
          이전
        </button>
        <span className="flex items-center justify-center text-gray-700">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => handlePageChange('next')}
          className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages - 1}
        >
          다음
        </button>
      </div>
      {currentPage === totalPages - 1 && (
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 mt-6"
        >
          제출하기
        </button>
      )}
    </form>
  );
};

export default TestForm;
