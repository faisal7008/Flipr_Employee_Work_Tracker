import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError, registerUser } from '../../features/auth/authSlice';

export default function RegisterModal() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const closeButtonRef = useRef(null);
  const dispatch = useDispatch();

  const validatePassword = () => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    }

    if (!uppercaseRegex.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
    }

    if (!lowercaseRegex.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
    }

    if (!numberRegex.test(password)) {
      setPasswordError('Password must contain at least one number.');
      return false;
    }

    if (!specialCharRegex.test(password)) {
      setPasswordError('Password must contain at least one special character.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const resetState = () => {
    setName('');
    setEmail('');
    setDepartment('');
    setContactNumber('');
    setPassword('');
  };

  const closeModal = async () => {
    // Click the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setErrorMsg('name');
      return;
    }
    if (!email) {
      setErrorMsg('email');
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setErrorMsg('invalidEmail');
      return;
    }
    if (!contactNumber) {
      setErrorMsg('contactNumber');
      return;
    }
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      setErrorMsg('invalidContact');
      return;
    }
    if (!department) {
      setErrorMsg('department');
      return;
    }
    if (!password) {
      setErrorMsg('password');
      return;
    }
    setErrorMsg('');
    // Validate the password
    if (!validatePassword()) {
      return;
    }

    const userData = {
      name,
      email,
      contactNumber,
      department,
      role: 'employee',
      password,
    };

    dispatch(registerUser(userData));
    dispatch(clearError());

    resetState();

    toast.success('Success! New employee added', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    closeModal();
  };

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={()=>window.register_modal.showModal()}>open modal</button> */}
      <dialog id='register_modal' className='modal'>
        <form method='dialog' className='modal-box grid px-7 gap-1'>
          <h2 className=' text-center text-xl font-semibold tracking-wide uppercase text-gray-800'>
            Add Employee
          </h2>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Full name'
              value={name}
              className={`input input-bordered w-full ${
                errorMsg === 'name' ? 'input-error' : 'input-success'
              }`}
              onChange={(e) => setName(e.target.value)}
            />
            {errorMsg === 'name' && (
              <label className='label'>
                <span className='label-text-alt text-error'>Please enter full name</span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Email'
              value={email}
              className={`input input-bordered w-full ${
                errorMsg === 'email' || errorMsg === 'invalidEmail'
                  ? 'input-error'
                  : 'input-success'
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMsg === 'email' && (
              <label className='label'>
                <span className='label-text-alt text-error'>Please enter email address</span>
              </label>
            )}
            {errorMsg === 'invalidEmail' && (
              <label className='label'>
                <span className='label-text-alt text-error'>
                  Please enter a valid email address
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Contact Number</span>
            </label>
            <input
              type='phone'
              placeholder='Contact number'
              value={contactNumber}
              className={`input input-bordered w-full ${
                errorMsg === 'contactNumber' ? 'input-error' : 'input-success'
              }`}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            {errorMsg === 'contactNumber' && (
              <label className='label'>
                <span className='label-text-alt text-error'>Please enter contact number</span>
              </label>
            )}

            {errorMsg === 'invalidContact' && (
              <label className='label'>
                <span className='label-text-alt text-error'>
                  Contact number must be a 10-digit number
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Department</span>
            </label>
            <input
              type='text'
              placeholder='Department'
              value={department}
              className={`input input-bordered w-full ${
                errorMsg === 'department' ? 'input-error' : 'input-success'
              }`}
              onChange={(e) => setDepartment(e.target.value)}
            />
            {errorMsg === 'department' && (
              <label className='label'>
                <span className='label-text-alt text-error'>Please enter the department</span>
              </label>
            )}
          </div>
          <div className='form-control w-full relative'>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              className={`input input-bordered w-full pr-10 ${
                errorMsg === 'password' || passwordError ? 'input-error' : 'input-success'
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className=' absolute top-12 right-2'
            >
              {showPassword ? (
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              ) : (
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
              )}
            </button>
            {errorMsg === 'password' && (
              <label className='label'>
                <span className='label-text-alt text-error'>Please enter password</span>
              </label>
            )}
            {passwordError && (
              <label className='label'>
                <span className='label-text-alt text-error'>{passwordError}</span>
              </label>
            )}
          </div>
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button ref={closeButtonRef} className='btn'>
              Close
            </button>
            <a role='button' type='submit' onClick={handleSubmit} className=' btn btn-success'>
              Save
            </a>
          </div>
        </form>
      </dialog>
    </div>
  );
}
