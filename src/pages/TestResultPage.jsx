import React, { useState, useEffect } from "react";
import TestResultList from "../components/TestResultList";
import { getTestResults, updateTestResult, deleteTestResult } from '../api/testResults';
import useAuthStore from "../authStore";

const TestResultPage = () => {
    const { user } = useAuthStore(state => ({ user: state.user }));
    const [results, setResults] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const fetchedResults = await getTestResults();
                setResults(fetchedResults);
            } catch (error) {
                setError('테스트 결과를 불러오는 데 실패 했습니다.');
            } finally {
                setloading(false);
            }
        };

        fetchResults();
    }, []);

    const handleUpdate = async (updatedResult) => {
        try {
            await updateTestResult(updatedResult.id, updatedResult);
            setResults(results.map(result => result.id === updatedResult.id ? updatedResult : result));
        } catch (error) {
            setError('결과를 업데이트하는 데 실패했습니다.')
        }
    }

    const handleDelete = async (resultId) => {
        try {
            await deleteTestResult(resultId);
            setResults(results.filter(result => result.id !== resultId));
        } catch (error) {
            setError('결과를 삭제하는 데 실패했습니다.');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">나의 테스트 결과</h1>
            <TestResultList
                results={results}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                user={user}
            />
        </div>
    )
}

export default TestResultPage;