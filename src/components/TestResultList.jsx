import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestResultItem from './TestResultItem';

const VITE_LOCALHOST_API_URL = import.meta.env.VITE_LOCALHOST_API_URL;

const TestResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(VITE_LOCALHOST_API_URL);
        setResults(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => (
          <TestResultItem key={result.id} result={result} />
        ))
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default TestResultList;