import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/user/register`, {
                email,
                password,
            });
            setMessage(response.data.message || 'Đăng ký thành công!');
        } catch (error) {
            console.error('Error response:', error.response);
            setMessage(error.response?.data.message || 'Đăng ký thất bại!');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center my-4">Register</h2>
                    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                        <div className="mb-3">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                        {message && <p className="text-center mt-3">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
