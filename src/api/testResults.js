import axios from 'axios';

const API_URL = import.meta.env.VITE_LOCALHOST_API_URL;

export const getTestResults = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTestResult = async (resultData) => {
    const response = await axios.post(
        API_URL, resultData);
    return response.data;
};

export const deleteTestResult = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateTestResult = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
}

export const updateTestResultVisibility = async (id, visibility) => {
    const response = await axios.patch(`${API_URL}/${id}`, {
        visibility
    });
    return response.data;
};