import React, { useEffect, useState } from 'react';
import applogo from '../assets/mainlogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password)
    if (!email) {
      setErrorEmail(true);
      return;
    } else {
      setErrorEmail(false);
    }
    if (!password) {
      setErrorPassword(true);
      return;
    } else {
      setErrorPassword(false);
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='flex flex-col bg-slate-100 gap-6 justify-center items-center h-screen'>
      <h2 className='text-2xl sm:text-3xl font-mono flex items-center gap-4 font-semibold'>
        <img src={applogo} className='w-11 -mt-1' alt='logo' /> WorkTrackr
      </h2>
      <div className='md:w-2/6 sm:w-3/6 w-11/12 px-6 sm:px-10 py-6 card gap-3 bg-base-100  shadow'>
        <h2 className='text-lg font-semibold text-center'>Login to WorkTrackr</h2>
        <div
          className={`${
            error ? 'flex' : 'hidden'
          } translate-y-1 alert alert-error transition-opacity duration-300 ease-in-out`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Error! {error}</span>
        </div>
        <form onSubmit={handleSubmit} className='form-control w-full gap-4'>
          <div>
            <label className='label'>
              <span className='label-text font-medium'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Email'
              className={`input input-bordered ${
                !errorEmail ? 'input-success' : 'input-error'
              } w-full`}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            {errorEmail && (
              <label className='label'>
                <span className='label-text-alt text-rose-600'>Please enter email address</span>
              </label>
            )}
          </div>
          <div>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Password'
              className={`input input-bordered ${
                !errorPassword ? 'input-success' : 'input-error'
              } w-full`}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
            {errorPassword && (
              <label className='label'>
                <span className='label-text-alt text-rose-600'>Please enter password</span>
              </label>
            )}
          </div>
          <div className='flex justify-between mt-2 items-center'>
            <div className='flex gap-2 items-center'>
              <input type='checkbox' className='checkbox checkbox-success' />
              <span className='label-text'>Remember me</span>
            </div>
            <a className='label-text text-primary-focus cursor-pointer hover:underline'>
              Forget password ?
            </a>
          </div>

          <button type='submit' className='btn btn-success mt-4 mb-2'>
            {loading ? <span className='loading loading-spinner loading-md'></span> : 'login'}
          </button>
        </form>
      </div>
    </div>
  );
}
