import axios from 'axios';

export const getTestResults = async () => {
    const response = await axios.get(
        import.meta.env.VITE_LOCALHOST_API_URL);
    return response.data;
};

export const createTestResult = async (resultData) => {
    const response = await axios.post(
        import.meta.env.VITE_LOCALHOST_API_URL, resultData);
    return response.data;
};

export const deleteTestResult = async (id) => {
    await axios.delete(`${import.meta.env.VITE_LOCALHOST}/${id}`);
};

export const updateTestResultVisibility = async (id, visibility) => {
    const response = await axios.patch(`${import.meta.env.VITE_LOCALHOST_API_URL}/${id}`, {
        visibility
    });
    return response.data;
};