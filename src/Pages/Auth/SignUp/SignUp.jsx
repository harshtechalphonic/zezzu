import React, { useState } from "react";
import "./SignUp.css";
import Header from "../../../Components/Partials/Header/Header";
import Footer from "../../../Components/Partials/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../Config/config.json";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        terms_conditions: 1,

    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const togglePasswordVisibility = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else if (field === "confirmPassword") {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.terms_conditions) {
            setMessage({ text: "You must agree to the terms and conditions!", type: "error" });
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: "Passwords do not match!", type: "error" });
            return;
        }
    
        try {
            const response = await axios.post(`${config.API_URL}/register`, {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,  
                password: formData.password,
            });
    
            console.log("Response:", response.data);
    
            if (response.status === 200 || response.status === 201) {
                setMessage({ text: "Registration successful!", type: "success" });
                console.log("User registered:", response.data);

                try {
                    await axios.post(`${config.API_URL}/send-otp-in-mail`, {}, 
                        {
                            headers: {
                                "Content-Type": "application/json",
                                email: response.data.email,
                            }
                        });

                    console.log("OTP sent to email:", formData.email);
                    navigate('/verify'); 
                } catch (otpError) {
                    console.error("Error sending OTP:", otpError);
                    setMessage({ text: "Registration successful, but OTP could not be sent.", type: "error" });
                }      
                navigate('/verify');
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (err) {
            console.error("Registration Error:", err);
            setMessage({ 
                text: err.response?.data?.message || err.message || "Error registering", 
                type: "error" 
            });
        }
    };
    
    return (
        <>
            <Header />
            <section className="signup-sec">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-xl-5 col-lg-6 col-md-8 col-12 my-5">
                            <div className="login-box">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="my-4">Sign Up Your Account</h2>
                                    {message.text && (
                                        <p className={message.type === "error" ? "text-danger" : "text-success"}>{message.text}</p>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="Name"
                                            autoComplete="name"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone"
                                            autoComplete="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control password-field"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                className="field-icon toggle-password"
                                                onClick={() => togglePasswordVisibility("password")}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <div className="position-relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="form-control password-field"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                autoComplete="new-password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                            <FontAwesomeIcon
                                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                                className="field-icon toggle-password"
                                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-check d-flex align-items-center gap-3 mb-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="terms_conditions"
                                            id="terms_conditions"
                                            checked={formData.terms_conditions}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="terms_conditions">
                                            I agree to the <Link to="/terms">terms and conditions</Link>
                                        </label>
                                    </div>
                                    
                                    <input className="form-control" type="submit" value="Sign Up" />
                                    <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                                        <p className="mb-0">Allready Have an Account? <Link to="/login" className="ms-3">Login</Link></p>
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