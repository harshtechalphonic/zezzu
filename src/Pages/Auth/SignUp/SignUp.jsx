import React, { useState } from 'react'
import "./SignUp.css"
import Header from '../../../Components/Partials/Header/Header'
import Footer from '../../../Components/Partials/Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const togglePasswordVisibility = (field) => {
      if (field === 'password') {
        setShowPassword(!showPassword);
      } else if (field === 'confirmPassword') {
        setShowConfirmPassword(!showConfirmPassword);
      }
    };
  return (
    <>
        <Header/>

            <section className="signup-sec">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-5 my-5">
                        <div className="login-box">
                        <form>
                            <h2 className="my-4">Sign up to your account</h2>

                            <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="name@example.com" 
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="new-password" className="form-label">Password</label>
                            <div className="position-relative">
                                <input 
                                type={showPassword ? 'text' : 'password'} 
                                className="form-control password-field" 
                                id="new-password" 
                                placeholder="Password" 
                                />
                                <FontAwesomeIcon 
                                icon={showPassword ? faEyeSlash : faEye} 
                                className="field-icon toggle-password" 
                                onClick={() => togglePasswordVisibility('password')}
                                />
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <div className="position-relative">
                                <input 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                className="form-control password-field" 
                                id="confirm-password" 
                                placeholder="Confirm Password" 
                                />
                                <FontAwesomeIcon 
                                icon={showConfirmPassword ? faEyeSlash : faEye} 
                                className="field-icon toggle-password" 
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                />
                            </div>
                            </div>

                            <input className="form-control" type="submit" value="Sign Up" />

                            <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                            <p className="d-flex align-items-center justify-content-center text-center mb-0">
                                Already have an account? <Link to="/login" className="ms-3">Login</Link>
                            </p>
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
