import React from 'react';
import PropTypes from 'prop-types';

const TestResultItem = ({ result }) => {
//   const formattedDate = new Date(result.date).toLocaleDateString(); // 날짜를 읽기 쉬운 형식으로 변환

  return (
    <div className='border p-4 rounded-lg shadow-md mb-4'>
      <h2 className='text-xl font-bold'>{result.nickname}</h2>
      <p className='mt-2'>결과: {result.result}</p>
      {/* <p className='mt-2'>날짜: {formattedDate}</p> */}
      <p className='mt-2'>답변: {result.answers.join(', ')}</p>
    </div>
  );
};

TestResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TestResultItem;