import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('token', accessToken); // Lưu token vào localStorage

      // Gọi hàm onLoginSuccess để cập nhật trạng thái đăng nhập
      onLoginSuccess();

      setMessage('Login successful!');
      setShowModal(true); // Hiện modal khi đăng nhập thành công
      setTimeout(() => {
        setShowModal(false); // Ẩn modal sau 1 giây
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.error('Error response:', error.response);
      setMessage(error.response?.data.message || 'Login failed.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
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
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
