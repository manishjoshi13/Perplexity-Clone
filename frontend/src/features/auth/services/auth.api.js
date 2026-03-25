import axios from 'axios';



const API_URL = 'http://localhost:3000';

const api=axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies in requests
    headers: {
    "Cache-Control": "no-cache",
  },
});

export const register = async (username, email, password) => {
    const response = await api.post('/api/auth/register', { username, email, password });
    return response.data;
};

export const login = async (cred, password) => {
    const response = await api.post('/api/auth/login', { cred, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/api/auth/get-me');
    return response.data;
};

export const checkVerificationStatus = async (username) => {
    const response = await api.get(`/api/auth/check-verification/${username}`);
    return response.data;
};

