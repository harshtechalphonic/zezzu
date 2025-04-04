import React, { useState } from 'react';
import './ForgetPassword.css';
import Header from '../../../Components/Partials/Header/Header';
import Footer from '../../../Components/Partials/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../Config/config.json';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${config.API_URL_POST}/check-email`, { email });

      if (response.data.type === 'Success') {
        console.log('Email verified. Sending OTP...');

        try {
          const otpResponse = await axios.post(
            `${config.API_URL_POST}/send-otp-in-mail`,
            { email }
          );

          const { email: otpEmail, otp } = otpResponse.data;
          console.log("OTP sent to email:", otpEmail, "OTP:", otp);

          navigate("/verify", {
            state: { email: otpEmail, otp },
          });
        } catch (otpError) {
          console.error("Error sending OTP:", otpError.response?.data || otpError.message);
          setError('Email verified but failed to send OTP. Please try again later.');
        }

      } else {
        setError(response.data.msg || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to send request. Please check your internet connection and try again.');
    }
  };

  return (
    <>
      <Header />
      <section className="forget_sec">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-5 my-5">
              <div className="login-box">
                <form onSubmit={handleSubmit}>
                  <h2 className="my-4">Forget your password</h2>
                  <p>
                    Enter the email address associated with your account and we
                    will send you a link to reset your password.
                  </p>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 mb-3">{error}</p>}

                  <input
                    className="form-control w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 cursor-pointer"
                    type="submit"
                    value="Continue"
                  />

                  <div className="d-flex align-items-center justify-content-center text-center mt-3 dont-accnt">
                    <p className="mb-0">
                      <Link to="/login" className="ms-3">
                        Back to Sign in
                      </Link>
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
