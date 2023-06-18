import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datepicker from 'react-tailwindcss-datepicker';
import EmployeeCard from '../../components/Admin/EmployeeCard';
import { getAllEmployees } from '../../features/auth/authSlice';
import { getTasksByEmployee } from '../../features/task/taskSlice';
import moment from 'moment';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);
  const handleClick = (employee) => {
    dispatch(getTasksByEmployee({ employeeId: employee._id }));
  };

  const [filterDates, setFilterDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleFilterDatesChange = (newfilterDates) => {
    setFilterDates(newfilterDates);
  };

  useEffect(() => {
    let filteredEmployees = employees
    if (searchQuery) {
      filteredEmployees = filteredEmployees?.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredEmployees(filteredEmployees);
  }, [employees, searchQuery]);

  useEffect(() => {
    const startDate = moment(filterDates.startDate);
    const endDate = moment(filterDates.endDate);

    let filteredTasks = tasks
      ?.filter((task) => moment(task.startTime).isSameOrBefore(moment(), 'day'))
      .sort((a, b) => moment(b.startTime).diff(moment(a.startTime)));

    if (startDate.isValid() && endDate.isValid()) {
      filteredTasks = filteredTasks?.filter((task) =>
        moment(task.startTime).isBetween(startDate, endDate, 'day', '[]'),
      );
    }
    if (searchQuery) {
      filteredTasks = filteredTasks?.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredTasks(filteredTasks);
  }, [tasks, filterDates]);

  return (
    <div className='flex p-2 md:pb-2 flex-col h-full overflow-y-auto md:overflow-hidden scroll-container'>
      <div className='text-sm breadcrumbs overflow-visible'>
        <ul>
          <li>
            <a>Admin</a>
          </li>
          <li>
            <a>Dashboard</a>
          </li>
        </ul>
      </div>
      <h2 className=' text-2xl font-semibold tracking-wide'>Dashboard</h2>
      <div className=' h-full w-full mt-4 flex flex-col-reverse md:flex-row gap-4'>
        <div className='w-full h-full flex flex-col gap-3 justify-between md:w-3/4'>
          <div className=' w-full flex gap-2'>
            <div className='grow'>
              <label htmlFor='simple-search' className='sr-only'>
                Search
              </label>
              <div className='relative w-full lg:w-3/5'>
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
            placeholder='Search breaks, meetings, or work'
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
            </div>
            <div className='w-72'>
              <Datepicker
                popoverDirection='down'
                separator={'-'}
                maxDate={new Date()}
                // containerClassName={' group'}
                placeholder={'filter dates'}
                inputClassName={
                  ' btn btn-wide btn-success border-2 focus:border btn-outline rounded-full tracking-wide w-full'
                }
                toggleClassName={' absolute left-5 mt-[14px]'}
                // containerClassName={'z-[9999]'}
                value={filterDates}
                onChange={handleFilterDatesChange}
              />
            </div>
          </div>
          <div className='employee-cards h-[20rem] overflow-y-auto scroll-container grow flex flex-col gap-2'>
            <div className='grid gap-3'>
              {filteredEmployees?.map((emp) => (
                <div key={emp._id} onClick={() => handleClick(emp)}>
                  <EmployeeCard employee={emp} tasks={filteredTasks} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='grow h-full'>
          <div className='flex h-full flex-col gap-5'>
            <div className='card bg-base-100 shadow-lg'>
              <div className='px-5 py-4 grid gap-2'>
                <div>
                  <h2 className=' font-semibold text-slate-500'>Total Employees</h2>
                  <div className='icon'></div>
                </div>
                <div className=' flex justify-between items-end'>
                  <h2 className=' text-3xl font-semibold'>{employees?.length}</h2>
                  <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
                </div>
              </div>
            </div>
            <div className='card bg-base-100 shadow-lg'>
              <div className='px-5 py-4 grid gap-2'>
                <div>
                  <h2 className=' font-semibold text-primary-focus'>Active Employees</h2>
                  <div className='icon'></div>
                </div>
                <div className=' flex justify-between items-end'>
                  <h2 className=' text-3xl font-semibold'>
                    {employees?.filter((emp) => emp.status === 'active')?.length}
                  </h2>
                  <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
                </div>
              </div>
            </div>
            <div className='card bg-base-100 shadow-lg'>
              <div className='px-5 py-4 grid gap-2'>
                <div>
                  <h2 className=' font-semibold text-accent-focus'>Meetings Conducted</h2>
                  <div className='icon'></div>
                </div>
                <div className=' flex justify-between items-end'>
                  <h2 className=' text-3xl font-semibold'>20</h2>
                  <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
                </div>
              </div>
            </div>
            <div className='card flex-grow bg-base-100 hidden md:block shadow-lg'>
              <div className='px-5 py-4 grid gap-2'>
                <div>
                  <h2 className=' font-semibold text-yellow-500'>Events</h2>
                  <div className='icon'></div>
                </div>

                <ol className='relative border-l border-gray-200'>
                  <li className='mb-5 ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                    <time className='mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500'>
                      February 2022
                    </time>
                    <h3 className='text-sm font-semibold text-gray-900'>
                      Application UI code in Tailwind CSS
                    </h3>
                  </li>
                  <li className='mb-5 ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                    <time className='mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500'>
                      March 2022
                    </time>
                    <h3 className='text-sm font-semibold text-gray-900'>
                      Marketing UI design in Figma
                    </h3>
                  </li>
                  <li className='ml-4'>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                    <time className='mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500'>
                      April 2022
                    </time>
                    <h3 className='text-sm font-semibold text-gray-900'>
                      E-Commerce UI code in Tailwind CSS
                    </h3>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
