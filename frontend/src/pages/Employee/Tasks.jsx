import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterModal from '../../components/Admin/RegisterModal';
import TaskModal from '../../components/Employee/TaskModal';
import TaskCard from '../../components/Employee/TaskCard';
import { getTasksByEmployee } from '../../features/task/taskSlice';
import AddTask from '../../components/Employee/AddTask';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import empty_icon from '../../assets/empty.svg';

export default function Tasks() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  console.log(tasks)
  const [taskType, setTaskType] = useState('');
  const [filterDates, setFilterDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleTaskChange = (item) => {
    if (taskType !== item) {
      setTaskType(item);
    } else {
      setTaskType('');
    }
  };

  const handleFilterDatesChange = (newfilterDates) => {
    setFilterDates(newfilterDates);
  };

  const clearFilters = () => {
    setTaskType('');
    setFilterDates({ startDate: null, endDate: null });
    // setFilteredTasks(tasks)
  };

  useEffect(() => {
    dispatch(getTasksByEmployee({ employeeId: user._id }));
  }, []);

  useEffect(() => {
    const startDate = moment(filterDates.startDate);
    const endDate = moment(filterDates.endDate);

    let filteredTasks = tasks
      .filter((task) => moment(task.startTime).isSameOrBefore(moment(), 'day'))
      .sort((a, b) => moment(b.startTime).diff(moment(a.startTime)));

    if (startDate.isValid() && endDate.isValid()) {
      filteredTasks = filteredTasks.filter((task) =>
        moment(task.startTime).isBetween(startDate, endDate, 'day', '[]'),
      );
    }

    if (taskType) {
      filteredTasks = filteredTasks.filter((task) => task.taskType === taskType);
    }

    setFilteredTasks(filteredTasks);
  }, [tasks, filterDates, taskType]);

  return (
    <div className='flex flex-col h-full p-2'>
      <div className='text-sm breadcrumbs overflow-hidden'>
        <ul>
          <li>
            <a>Employee</a>
          </li>
          <li>
            <a>Tasks</a>
          </li>
        </ul>
      </div>
      <div className=' flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center w-full'>
        <div>
          <h2 className=' text-2xl font-semibold tracking-wide'>Tasks</h2>
          <p className='text-xs my-2 text-gray-500'>
            Where does your joy reside: breaks, meetings, or work?
          </p>
        </div>
        <div className=' w-80'>
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
      <div className='flex flex-col mt-4 sm:flex-row gap-4 items-start sm:items-center'>
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
            className='bg-gray-200 border border-gray-200 text-gray-900 text-sm rounded-md block w-full pl-12 p-2.5 focus:ring-success outline-success'
            placeholder='Search breaks, meetings, or work'
            required
          />
        </div>
        <div className=' flex flex-col sm:flex-row gap-3 justify-between items-center w-full'>
          <div className=' flex gap-2 items-center'>
            <button
              className='btn btn-outline btn-success h-10 btn-sm'
              onClick={() => window.task_modal.showModal()}
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
              Add Task
            </button>
            <button type='button' onClick={clearFilters} className=' btn btn-link text-error'>
              clear filters
            </button>
          </div>
          <div className=' flex items-center justify-center sm:justify-end gap-2'>
            <label className=' font-semibold'>Tags :</label>
            <button
              type='button'
              onClick={() => handleTaskChange('Work')}
              className={`btn btn-primary btn-sm ${taskType === 'Work' ? '' : 'btn-outline'}`}
            >
              Work
            </button>
            <button
              type='button'
              onClick={() => handleTaskChange('Meeting')}
              className={`btn btn-accent btn-sm ${taskType === 'Meeting' ? '' : 'btn-outline'}`}
            >
              Meeting
            </button>
            <button
              type='button'
              onClick={() => handleTaskChange('Break')}
              className={`btn btn-warning btn-sm ${taskType === 'Break' ? '' : 'btn-outline'}`}
            >
              Break
            </button>
          </div>
        </div>
        <TaskModal />
      </div>

      <div className='mt-3 h-full flex-grow scroll-container overflow-auto'>
        {filteredTasks.length > 0 ? (
          <table className='table relative w-full p-2 border-separate border-spacing-y-3'>
            <thead>
              <tr className='sticky top-0 bg-transparent'>
                <th className='text-sm'>Description</th>
                <th className='text-sm'>Type</th>
                <th className='text-sm'>Date</th>
                <th className='text-sm'>Clock-In</th>
                <th className='text-sm'>Clock-Out</th>
                <th className='text-sm'>
                  Time Taken
                  {/* <span className=' text-xs'>{'(in minutes)'}</span> */}
                </th>
              </tr>
            </thead>
            <tbody className='relative'>
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <img className=' ' src={empty_icon} />
          </div>
        )}
      </div>

      {/* </div> */}
    </div>
  );
}
