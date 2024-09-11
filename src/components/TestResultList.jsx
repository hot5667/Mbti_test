import React from 'react';
import TestResultItem from './TestResultItem'; // ResultItem 컴포넌트 import

const TestResultList = ({ results, onUpdateVisibility, onDelete, user }) => {
    // 비공개 결과는 본인만 볼 수 있도록 필터링
    const filteredResults = results.filter(result => 
        result.visibility || result.userId === user.id
    );

    return (
        <div>
            {filteredResults.length === 0 ? (
                <p className="text-gray-400">결과가 없습니다.</p>
            ) : (
                filteredResults.map(result => (
                    <TestResultItem
                        key={result.id}
                        result={result}
                        onUpdateVisibility={onUpdateVisibility}
                        onDelete={onDelete}
                        user={user}
                    />
                ))
            )}
        </div>
    );
};

export default TestResultList;
