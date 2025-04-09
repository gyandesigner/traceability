import axios from 'axios';
import config from '../config/config.js';

const axiosInstance = axios.create({
    baseURL: config.apiURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});
export function setAuthToken(token) {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}
function handleError(error) {
    if (error.response) {
        throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
        throw new Error('No response received from server');
    } else {
        throw new Error('Error setting up the request');
    }
}
export async function get(endpoint, params = {}) {
    try {       
        const response = await axiosInstance.get(endpoint, { params });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
export async function post(endpoint, data = {}) {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
export async function put(endpoint, data = {}) {
    try {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
export async function del(endpoint) {
    try {
        const response = await axiosInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
export default {
    get,
    post,
    put,
    delete: del,
    setAuthToken
};
