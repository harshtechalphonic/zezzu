import React, { useState } from 'react';
import './AccountDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AccountDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'password':
        setShowPassword((prev) => !prev);
        break;
      case 'newPassword':
        setShowNewPassword((prev) => !prev);
        break;
      case 'confirmPassword':
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setPasswordError(`Passwords don't match`);
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className='AccountDetails'>
      <div className='row'>
        <div className='col-lg-7'>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>Your Profile</li>
            </ul>
            <div className='card-body px-5'>
              <div className='row'>
                <div className='col-lg-6 mb-3'>
                  <label className='form-label'>First Name</label>
                  <input type='text' className='form-control' placeholder='First Name' />
                </div>
                <div className='col-lg-6 mb-3'>
                  <label className='form-label'>Last Name</label>
                  <input type='text' className='form-control' placeholder='Last Name' />
                </div>
                <div className='col-lg-6 mb-3'>
                  <label className='form-label'>Phone Number</label>
                  <input type='tel' className='form-control' placeholder='+1-202-555-0118' />
                </div>
                <div className='col-lg-6 mb-3'>
                  <label className='form-label'>Email Address</label>
                  <input type='email' className='form-control' placeholder='name@example.com' />
                </div>
                <div className='col-lg-12 mb-3'>
                  <label className='form-label'>Address</label>
                  <input type='text' className='form-control' placeholder='Address Details' />
                </div>
                <div className='col-lg-6 mb-3'>
                  <label className='form-label'>Country/Region</label>
                  <select className='form-select'>
                    <option>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <div className='col-lg-3 mb-3'>
                  <label className='form-label'>State</label>
                  <select className='form-select'>
                    <option>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <div className='col-lg-3 mb-3'>
                  <label className='form-label'>Zip Code</label>
                  <input type='text' className='form-control' placeholder='120712' />
                </div>
              </div>

              <div className='card mt-4'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Change Password</li>
                </ul>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-lg-12 mb-3'>
                      <label className='form-label'>Current Password</label>
                      <div className='input-group'>
                        <input type={showPassword ? 'text' : 'password'} className='form-control' placeholder='Current Password' />
                        <span className='input-group-text' onClick={() => togglePasswordVisibility('password')}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                    </div>
                    <div className='col-lg-12 mb-3'>
                      <label className='form-label'>New Password</label>
                      <div className='input-group'>
                        <input 
                          type={showNewPassword ? 'text' : 'password'} 
                          className='form-control' 
                          placeholder='New Password' 
                          value={newPassword}
                          onChange={handlePasswordChange}
                        />
                        <span className='input-group-text' onClick={() => togglePasswordVisibility('newPassword')}>
                          <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                    </div>
                    <div className='col-lg-12 mb-3'>
                      <label className='form-label'>Confirm Password</label>
                      <div className='input-group'>
                        <input 
                          type={showConfirmPassword ? 'text' : 'password'} 
                          className='form-control' 
                          placeholder='Confirm Password' 
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        <span className='input-group-text' onClick={() => togglePasswordVisibility('confirmPassword')}>
                          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                      {passwordError && <p className='text-danger'>{passwordError}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-4 profile-save_btn'>
                <button type='submit'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
