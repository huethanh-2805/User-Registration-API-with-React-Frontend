import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error during registration';
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { email, password });
        const { accessToken } = response.data;
        if (accessToken) {
            localStorage.setItem('token', accessToken); // Lưu token vào localStorage
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error during login';
    }
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Unauthorized');
        
        const response = await axios.get(`${API_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error fetching profile';
    }
};
