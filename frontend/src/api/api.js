import axios from "axios";

// Tạo instance của axios với base URL lấy từ biến môi trường
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL  
});

export default api;