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

  const closeModal = async () => {
    // Click the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  const resetState = async () => {
    setName('');
    setEmail('');
    setDepartment('');
    setContactNumber('');
    setPassword('');
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

    dispatch(
      registerUser({
        name,
        email,
        contactNumber,
        department,
        role: 'employee',
        password,
      }),
    );
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
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Department</span>
            </label>
            <input
              type='text'
              placeholder='Department'
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
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Password'
              className={`input input-bordered w-full ${
                errorMsg === 'password' || passwordError ? 'input-error' : 'input-success'
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />
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
