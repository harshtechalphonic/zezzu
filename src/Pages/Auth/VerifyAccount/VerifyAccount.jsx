import React, { useEffect, useState } from 'react'
import './VerifyAccount.css'
import Header from '../../../Components/Partials/Header/Header';
import Footer from '../../../Components/Partials/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function VerifyAccount() {
    const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [verificationText, setVerificationText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log('Verification Code:', code);
  //   setVerificationText('Verification in progress...');
    
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerificationText('Verification in progress...');
    
    try {
      const response = await axios.post('https://api.loginradius.com/identity/v2/auth/email', {
        otp: code 
    });
  
      const data = await response.json();
  
      if (response.ok) {
        setVerificationText("OTP verified successfully!");

        navigate('/');
      } else {
        setVerificationText(data.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      setVerificationText("An error occurred. Please try again later.");
    }
  };
  
  




  const handleResend = () => {
    setCountdown(60);
    setResendDisabled(true);
    console.log('OTP Resent');
  };
  return (
    <>
    <Header/>
    <section className="login-sec">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-5 my-5">
              <div className="login-box text-center">
                <form onSubmit={handleSubmit} >
                  <h2 className="my-4">Verify Your Email Address</h2>
                  <p>Please enter the verification code sent to your email address to complete the verification process.</p>
                  {verificationText && <p className="text-success">{verificationText}</p>}
                  <div className="mb-3 text-left">
                    <div className="d-flex align-items-center justify-content-between">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Verification Code</label>
                      {resendDisabled ? (
                        <span>Resend Code in {countdown}s</span>
                      ) : (
                        <span className="text-primary" onClick={handleResend} style={{ cursor: 'pointer' }}>Resend Code</span>
                      )}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="******"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                  <input className="form-control" type="submit" value="Continue" />
                  <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                    <p className="mb-0">
                      <a href="/signup" className="ms-3">Back to Sign Up</a>
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
