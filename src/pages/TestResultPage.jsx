import React, { useState, useEffect } from "react";
import TestResultList from "../components/TestResultList";
import { getTestResults } from '../api/testResults';
import useAuthStore from "../authStore";
import { useUpdateVisibilityQuery } from '../hook/useUpdateVisibilityQuery'; // 훅 추가
import { useDeleteResultQuery } from '../hook/useDeleteResultQuery'; // 훅 추가

const TestResultPage = () => {
    const { user } = useAuthStore(state => ({ user: state.user }));
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { mutate: updateVisibility } = useUpdateVisibilityQuery(); // 훅 사용
    const { mutate: deleteResult } = useDeleteResultQuery(); // 훅 사용

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const fetchedResults = await getTestResults();
                setResults(fetchedResults);
            } catch (error) {
                setError('테스트 결과를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const handleUpdateVisibility = async (id, visibility) => {
        try {
            await updateVisibility({ id, visibility: visibility }); // 상태를 반전시켜서 전달
            setResults(results.map(result =>
                result.id === id ? { ...result, visibility: visibility } : result
            ));
        } catch (error) {
            setError('가시성을 업데이트하는 데 실패했습니다.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteResult({ id });
            setResults(results.filter(result => result.id !== id));
        } catch (error) {
            setError('결과를 삭제하는 데 실패했습니다.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">모든 테스트 결과</h1>
            <TestResultList
                results={results}
                onUpdateVisibility={handleUpdateVisibility} // 핸들러 추가
                onDelete={handleDelete} // 핸들러 추가
                user={user}
            />
        </div>
    );
};

export default TestResultPage;
