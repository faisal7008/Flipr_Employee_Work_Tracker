import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getMe, updateMe, uploadProfilePic } from '../features/auth/authSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';

const userimage =
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80';

export default function Profile() {
  const { profile, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Initialize the states with initial values
  const [name, setName] = useState(profile?.name);
  const [contactNumber, setContactNumber] = useState(profile?.contactNumber);
  const [department, setDepartment] = useState(profile?.department);
  const [profilePic, setProfilePic] = useState(profile?.profilePic);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fileInputRef = useRef(null);
  const [profilePicData, setProfilePicData] = useState(null);

  const resetProfile = () => {
    setName(profile?.name);
    setContactNumber(profile?.contactNumber);
    setDepartment(profile?.department);
    setPassword('');
    setNewPassword('');
    setErrorMsg('');
    setPasswordError('');
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    resetProfile();
  }, [loading]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicData(file);

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validatePassword = () => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (newPassword.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    }

    if (!uppercaseRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      return false;
    }

    if (!lowercaseRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      return false;
    }

    if (!numberRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one number.');
      return false;
    }

    if (!specialCharRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one special character.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg('name');
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
    if (newPassword) {
      // Validate the newPassword
      if (!validatePassword()) {
        return;
      }
    }
    setErrorMsg('');

    const userData = {
      name,
      contactNumber,
      department,
      password,
      newPassword,
    };

    if (profilePicData) {
      const formData = new FormData();
      formData.append('profilePic', profilePicData);
      await dispatch(uploadProfilePic(formData))
        .then((response) => {
          const { message, error } = response.payload;
          console.log('Message:', message);
          console.log('Error:', error);
          if (message) {
            toast.success(message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (error) {
            toast.success(error, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
      setProfilePicData(null);
    } else {
      if (profilePic === '') {
        await dispatch(uploadProfilePic({ deleteProfilePic: true }))
          .then((response) => {
            const { message, error } = response.payload;
            console.log('Message:', message);
            console.log('Error:', error);
            if (message) {
              toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
            if (error) {
              toast.success(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error(error);
          });
      }
    }

    if (
      name !== profile?.name ||
      contactNumber !== profile?.contactNumber ||
      department !== profile?.department ||
      newPassword !== ''
    ) {
      await dispatch(updateMe(userData))
        .then((response) => {
          const { message, passwordMsg, passwordError } = response.payload;
          // Handle the response data here
          // console.log('User:', user);
          console.log('Message:', message);
          console.log('Password Message:', passwordMsg);
          if (message) {
            toast.success(message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (passwordMsg) {
            toast.success(passwordMsg, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (passwordError) {
            toast.error(passwordError, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    }
    dispatch(clearError());
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='text-sm flex-none breadcrumbs'>
        <ul>
          <li>
            <a>Employee</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
        </ul>
      </div>
      <div className='flex'>
        <div className=' w-full sm:w-1/4'>
          <h2 className='text-2xl text-gray-900 font-semibold tracking-wide'>Profile</h2>
          <p className='text-xs my-2 text-gray-500'>Update photo and personal details here</p>
        </div>
        <div className='grow max-w-lg px-1'>
          <div className='flex sm:justify-end gap-2'>
            <svg
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className=' whitespace-nowrap text-sm font-light'>
              Joined{' '}
              <span className=' text-gray-900 font-semibold'>
                {' '}
                {moment(profile.joiningDate).format('ll')}{' '}
              </span>
            </p>
          </div>
          {/* <div className='flex mt-1 sm:justify-end gap-2'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className=' text-sm font-light'>
            Last Edited{' '}
            <span className=' text-gray-900 font-semibold'>
              {' '}
              {moment(profile.updatedAt).format('ll')}{' '}
            </span>
          </p>
          </div> */}
        </div>
      </div>
      <div className='max-h-full mt-2 flex-grow overflow-y-auto'>
        <form className='max-h-full grid'>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className='text-gray-700 w-full text-sm py-2 font-semibold'> Name</h2>
            </div>
            <div className='grow max-w-lg px-1'>
              <input
                type='text'
                placeholder='Name'
                className={`input input-bordered input-md w-full ${
                  errorMsg === 'name' ? 'input-error' : 'input-success'
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errorMsg === 'name' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>Please enter full name</span>
                </label>
              )}
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className=' text-gray-700 w-full text-sm py-2 font-semibold'> Email</h2>
            </div>
            <div className='grow max-w-lg px-1'>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered input-success input-md w-full'
                value={profile.email}
              />
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className=' text-gray-700 w-full text-sm py-2 font-semibold'> Your photo</h2>
              <p className=' text-xs text-gray-500'>This will be displayed on your profile.</p>
            </div>
            <div className='py-2 grow flex justify-between items-end sm:items-start max-w-lg px-1'>
              <div className='avatar'>
                <div className='w-20 rounded-full'>
                  <img src={profilePic || userimage} />
                </div>
              </div>
              <div>
                <div className='mr-1 grid grid-cols-2 gap-2'>
                  <button
                    type='button'
                    onClick={() => setProfilePic('')}
                    className=' text-sm text-error font-medium hover:underline'
                  >
                    Delete
                  </button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/*' // Accept only image files
                    className='hidden'
                    onChange={handleFileUpload}
                  />
                  <button
                    type='button'
                    onClick={() => fileInputRef.current.click()}
                    className=' text-sm text-success font-medium hover:underline'
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className='text-gray-700 w-full text-sm py-2 font-semibold'> Contact Number</h2>
            </div>
            <div className='grow max-w-lg px-1'>
              <input
                type='text'
                className={`input input-bordered input-md w-full ${
                  errorMsg === 'contactNumber' ? 'input-error' : 'input-success'
                }`}
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />

              {errorMsg === 'contactNumber' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>Please enter contact number</span>
                </label>
              )}
              {errorMsg === 'invalidContact' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>
                    Contact number must be a 10-digit number
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className='text-gray-700 w-full text-sm py-2 font-semibold'> Department</h2>
            </div>
            <div className='grow max-w-lg px-1'>
              <input
                type='text'
                placeholder='Department'
                className={`input input-bordered input-md w-full ${
                  errorMsg === 'department' ? 'input-error' : 'input-success'
                }`}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              {errorMsg === 'department' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>Please enter the department</span>
                </label>
              )}
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-t-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className='text-gray-700 w-full text-sm py-2 font-semibold'> Current Password</h2>
            </div>
            <div className=' max-w-lg px-1 grow'>
              <div className='relative'>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  placeholder='Current Password'
                  className={`input input-bordered input-md w-full pr-10 ${
                    errorMsg === 'password' ? 'input-error' : 'input-success'
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword1((prev) => !prev)}
                  className=' absolute bottom-3 right-3'
                >
                  {showPassword1 ? (
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
              </div>
              {errorMsg === 'password' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>Please enter current password</span>
                </label>
              )}
              {/* {passwordError && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>{passwordError}</span>
                </label>
              )} */}
            </div>
          </div>
          <div className='flex flex-col py-3 sm:flex-row border-y-[1px] border-gray-200'>
            <div className='w-full sm:w-1/4'>
              <h2 className='text-gray-700 w-full text-sm py-2 font-semibold'> New Password</h2>
            </div>
            <div className=' grow max-w-lg px-1'>
              <div className='relative'>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  placeholder='New Password'
                  className={`input input-bordered input-md w-full pr-10 ${
                    errorMsg === 'newpassword' ? 'input-error' : 'input-success'
                  }`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword2((prev) => !prev)}
                  className=' absolute bottom-3 right-3'
                >
                  {showPassword2 ? (
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
              </div>
              {errorMsg === 'newpassword' && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>Please enter new password</span>
                </label>
              )}
              {passwordError && (
                <label className='label pt-[1px] pb-0 -mb-2'>
                  <span className='label-text-alt text-error'>{passwordError}</span>
                </label>
              )}
            </div>
          </div>
          <div className='flex border-gray-200'>
            <div className='w-full sm:w-1/4'></div>
            <div className='flex gap-3 justify-end grow max-w-lg px-1 pt-3'>
              <button
                type='button'
                onClick={resetProfile}
                className=' btn btn-ghost btn-sm h-11 px-4 bg-white text-gray-800'
              >
                Cancel
              </button>
              <button
                type='submit'
                onClick={handleSubmit}
                className={`btn btn-success btn-sm h-11 px-4 ${
                  !(
                    name !== profile?.name ||
                    contactNumber !== profile?.contactNumber ||
                    department !== profile?.department ||
                    profilePic !== profile?.profilePic ||
                    newPassword !== ''
                  ) && 'btn-disabled'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
