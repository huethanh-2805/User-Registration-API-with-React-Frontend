//Cấu hình Routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <div>
            <Router>
                {/* Bootstrap Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-primary me-2" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-outline-primary" to="/register">Register</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>

                {/* Routing setup */}
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
