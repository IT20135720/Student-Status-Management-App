import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider} from '@react-oauth/google';
import { useAuth } from '../context/authcontext'; 
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

     // Handle Google login 
     const handleGoogleAuth = () => {
        try {
            window.location.href = 'http://localhost:5000/auth/google/callback'
        } catch (err) {
            setError(err?.data?.message || err.error)

        }
    }
    // Handle standard login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });

            const token = res.data.token;
            localStorage.setItem("authToken", token); // Store token in local storage
            login(token);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GoogleOAuthProvider clientId="353241362750-9jo2nkcmmi2tf76tcnlg9sm61b4o5fj0.apps.googleusercontent.com">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                    <h2 className="text-center mb-4 text-primary">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 rounded-pill" 
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <hr className="my-4" />
                    <div className="text-center mb-2 fs-6">Or</div>
                    <div className="d-flex justify-content-center">
                    <button
                        type='button'
                        className="bg-white text-red-600 px-6 py-2 rounded-md border-2 border-red-600 flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 shadow-md transition duration-200 ease-in-out mt-4 ml-3"
                        onClick={handleGoogleAuth}
                    >
                        <FaGoogle className="text-xl ml-5" />
                        Sign in with Google
                    </button>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
