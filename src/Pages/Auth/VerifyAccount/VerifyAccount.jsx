import React, { useEffect, useState, useRef } from 'react';
import './VerifyAccount.css';
import Header from '../../../Components/Partials/Header/Header';
import Footer from '../../../Components/Partials/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../../Config/config.json';

export default function VerifyAccount() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [verificationText, setVerificationText] = useState('');
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const backOtp = location.state?.otp;

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

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    setVerificationText('Verification in progress...');

    if (code !== backOtp) {
      setVerificationText('Incorrect OTP. Please try again.');
      return;
    }

    try {
      const response = await axios.post(`${config.API_URL_POST}/otp-success`, {
        email,
        email_verified: 1,
        code,
      });

      if (response.status === 200) {
        setVerificationText('OTP verified successfully!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setVerificationText('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setVerificationText(error?.response?.data?.message || 'An error occurred. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        setVerificationText('Missing email address for resending OTP.');
        return;
      }

      await axios.post(`${config.API_URL_POST}/send-otp-in-mail`, { email });

      setVerificationText('OTP resent successfully!');
      setCountdown(60);
      setResendDisabled(true);
    } catch (error) {
      console.error(error);
      setVerificationText('Failed to resend OTP. Try again later.');
    }
  };

  return (
    <>
      <Header />
      <section className="login-sec verify_sec">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-xl-5 col-lg-6 col-md-8 col-12 my-5">
              <div className="login-box text-center">
                <form onSubmit={handleSubmit}>
                  <h2 className="my-4">Verify Your Email Address</h2>
                  <p>Please enter the verification code sent to your email address.</p>
                  {verificationText && <p className="text-success">{verificationText}</p>}

                  <div className="mb-3 text-left">
                    <div className="d-flex align-items-center justify-content-between align-items-center mb-2">
                      <label htmlFor="otp" className="form-label mb-0">Verification Code</label>
                      {resendDisabled ? (
                        <span>Resend Code in {countdown}s</span>
                      ) : (
                        <span className="text-primary" onClick={handleResend} style={{ cursor: 'pointer' }}>Resend Code</span>
                      )}
                    </div>

                    <div className="otp-input d-flex justify-content-between">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          className="form-control text-center mx-1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          ref={(el) => (inputsRef.current[index] = el)}
                          required
                        />
                      ))}
                    </div>
                  </div>

                  <input className="form-control mt-4" type="submit" value="Continue" />

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
      <Footer />
    </>
  );
}
