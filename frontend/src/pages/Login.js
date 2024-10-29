import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      });

      setMessage('Login successful!');
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data.message || 'Login failed.');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Login</h2>
          <form onSubmit={handleLogin} className="bg-light p-4 rounded shadow-sm">
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
            <button type="submit" className="btn btn-primary w-100">Login</button>
            {message && <p className="text-center mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;