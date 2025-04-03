import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Header from '../../../Components/Partials/Header/Header';
import Footer from '../../../Components/Partials/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from "../../../Config/config.json";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
<<<<<<< HEAD
            const response = await axios.post(`${config.API_URL}/login`, {
=======
            const response = await axios.post(`${config.API_URL}/ok` , {
>>>>>>> 42dec0d614d4559383ea43cd256ad1366a0dfa4e
                // const response = await axios.post('https://dummyjson.com/user/login', {
                username,
                password
            });
            
            console.log("Response Data:", response.data);
            localStorage.setItem('token', response.data.accessToken);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="login-sec">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-md-5 my-5">
                            <div className="login-box">
                                <form onSubmit={handleLogin}>
                                    <h2 className="my-4">Login to your account</h2>
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Email / Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="name@example.com"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 position-relative">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            className="form-control password-field"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span 
                                            className="fa field-icon toggle-password position-absolute"
                                            onClick={togglePasswordVisibility}
                                            style={{ top: '38px', right: '10px', cursor: 'pointer' }}
                                        >
                                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                                        </span>
                                        <p className="d-flex justify-content-end mt-2">
                                            <a href="/forget-password">Forget Password?</a>
                                        </p>
                                    </div>
                                    <button className="form-control btn" type="submit" disabled={loading}>
                                        {loading ? 'Logging in...' : 'Login Now'}
                                    </button>
                                    <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                                        <p className="mb-0">Don't have an account? <Link to="/signup" className="ms-3">Sign up</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}