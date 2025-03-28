import React, { useState } from 'react'
import './Login.css'
import Header from '../../../Components/Partials/Header/Header'
import Footer from '../../../Components/Partials/Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible((prevState) => !prevState);
    };
  return (
    <>
    <Header/>
        <section className="login-sec">
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-5 my-5">
                        <div className="login-box">
                            <form action="">
                                <h2 className="my-4">Login to your account</h2>
                                <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                />
                                </div>
                                <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="form-control password-field"
                                    id="password"
                                    placeholder="Password"
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
                                <input className="form-control btn " type="submit" value="Login Now" />
                                <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                                <p className="mb-0">Don't have an account? <Link to="/signup" className="ms-3">Sign up</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    <Footer/>
    </>
  )
}
