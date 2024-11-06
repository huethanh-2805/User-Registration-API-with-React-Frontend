import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ localStorage
                console.log("Token:", token);
    
                if (!token) {
                    setError('Unauthorized: No token found');
                    throw new Error('Unauthorized');
                }
    
                // Gọi API với header Authorization
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // Kiểm tra nếu dữ liệu trả về đúng
                if (response.data && response.data.user) {
                    setProfile(response.data.user);
                    console.log("Profile data:", response.data.user); // Kiểm tra dữ liệu trả về từ API
                } else {
                    setError('User data not found.');
                    throw new Error('User data not found');
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError('Failed to fetch profile. Please login again.');
                setTimeout(() => {
                    navigate('/login'); // Chuyển hướng về trang login nếu gặp lỗi
                }, 2000);
            }
        };
    
        fetchProfile();
    }, [navigate]);

    return (
        <div className="container">
            <h2 className="text-center my-4">User Profile</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {profile ? (
                <div className="card p-4 shadow-sm">
                    <h4>Welcome: {profile.email}</h4>
                </div>
            ) : (
                !error && <p>Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
