import React from 'react';
import PropTypes from 'prop-types';

const TestResultItem  = ({ result }) => {
    return (
        <div className='border p-4 rounded-lg shadow-md mb-4'>
            <h2 className='text-xl font-bold'>{result.title}</h2>
            <p className='mt-2'>{result.description}</p>
        </div>
    )
}

TestResultItem.propTypes = {
    result: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
}

export default TestResultItem;