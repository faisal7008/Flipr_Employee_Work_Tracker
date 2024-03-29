import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserById, getAllEmployees, updateUserById } from '../../features/auth/authSlice';
import moment from 'moment';
import RegisterModal from '../../components/Admin/RegisterModal';
import { toast } from 'react-toastify';

const userimage =
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80';

export default function Employees() {
  const dispatch = useDispatch();
  // const [status, setStatus] = useState('');
  const [deleteUsers, setDeleteUsers] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheck = (e, empId) => {
    if (e.target.checked) {
      if (!deleteUsers.includes(empId)) {
        setDeleteUsers((prev) => [...prev, empId]);
      }
    } else {
      setDeleteUsers((prev) => prev.filter((id) => id !== empId));
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      deleteUsers.forEach((empId) => dispatch(deleteUserById(empId)));
      toast.success('Success! Employees deleted', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setDeleteUsers([]);
    }
  };

  const editStatus = (empId, empStatus) => {
    if (empStatus === 'active') {
      dispatch(updateUserById({ userId: empId, userData: { status: 'inactive' } }));
    } else {
      dispatch(updateUserById({ userId: empId, userData: { status: 'active' } }));
    }
    toast.success('Success! Employee status is updated', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  // console.log(deleteUsers)
  const { employees } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    let filteredEmployees = employees;
    if (searchQuery) {
      filteredEmployees = filteredEmployees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredEmployees(filteredEmployees);
  }, [employees, searchQuery]);

  return (
    <div className='p-2 h-full w-full flex flex-col overflow-hidden'>
      <div className='text-sm breadcrumbs grow overflow-visible'>
        <ul>
          <li>
            <a>Admin</a>
          </li>
          <li>
            <a>Employees</a>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-4 h-full'>
        <h2 className='text-2xl font-semibold tracking-wide'>Mangage Employees</h2>
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
          <label htmlFor='simple-search' className='sr-only'>
            Search
          </label>
          <div className='relative w-full sm:w-1/2'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-6 h-6 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='simple-search'
              className='bg-gray-200 border border-gray-200 text-gray-900 text-sm rounded-md block w-full pl-12 pr-8 py-2.5 focus:ring-success outline-success'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                className='absolute top-3 right-2 focus:outline-none'
                onClick={() => setSearchQuery('')}
              >
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>
          <div className=' flex justify-between w-full'>
            <button
              className='btn btn-outline btn-success h-10 btn-sm'
              onClick={() => window.register_modal.showModal()}
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>{' '}
              Add Employee
            </button>
            <button
              className={`btn btn-outline btn-error h-10 btn-sm ${
                deleteUsers.length <= 0 && 'btn-disabled'
              }`}
              onClick={handleDelete}
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>{' '}
              Delete
            </button>
          </div>
          <RegisterModal />
        </div>
        <div className='overflow-x-auto scroll-smooth bg-white rounded-xl shadow-lg'>
          <table className='table table-pin-rows table-pin-cols'>
            <thead>
              <tr>
                <th>
                  <label>
                    <input type='checkbox' className='checkbox' />
                  </label>
                </th>
                <th className='text-sm'>Name</th>
                <th className='text-sm'>Email</th>
                <th className='text-sm'>Contact</th>
                <th className='text-sm'>Department</th>
                <th className='text-sm'>Joined</th>
                <th className='text-sm'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees?.map((emp) => (
                <tr key={emp.id}>
                  <th>
                    <label>
                      <input
                        type='checkbox'
                        onChange={(e) => handleCheck(e, emp._id)}
                        className='checkbox'
                      />
                    </label>
                  </th>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img src={emp?.profilePic || userimage} alt='Avatar Tailwind CSS Component' />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{emp.name}</div>
                        <div className='text-sm opacity-50'>India</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {/* {emp.email} */}
                    <span className='badge badge-ghost badge-md'>{emp.email}</span>
                  </td>
                  <td>{emp.contactNumber}</td>
                  <td>
                    <button className='btn btn-ghost btn-xs'>{emp.department}</button>
                  </td>
                  <td>{moment(emp.joiningDate).format('ll')}</td>
                  <td>
                    <input
                      onChange={() => editStatus(emp._id, emp.status)}
                      type='checkbox'
                      className='toggle toggle-success'
                      checked={emp.status === 'active'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
