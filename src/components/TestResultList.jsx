import React from "react";
import TestResultItem from "./TestResultItem";
import useAuthStore from "../authStore";

const TestResultList = ({ results }) => {
    const { user } = useAuthStore(state => ({ user: state.user }));

    const filteredResults = results.filter(result => {
        return result.visibility || (result.visibility === false && user && user.id === result.ownerId);
    });

    return (
        <div>
            {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                    <TestResultItem key={result.id} result={result} />
                ))
            ) : (
                <p>결과가 업습니다.</p>
            )}
        </div>
    )
}

export default TestResultList;