import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../../utils/charts/StackedBarChart';
import PieCharts from '../../utils/charts/PieCharts';
import { getTasksByEmployee } from '../../features/task/taskSlice';
import moment from 'moment';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  // Calculate total hours
  // const calculateTotalTime = () => {
  let totalTime = 0;
  let workTime = 0;
  let meetingTime = 0;
  let breakTime = 0;
  tasks.forEach((task) => {
    totalTime += task.timeTaken;
    if (task.taskType === 'Work') workTime += task.timeTaken;
    if (task.taskType === 'Meeting') meetingTime += task.timeTaken;
    if (task.taskType === 'Break') breakTime += task.timeTaken;
  });
  // const formattedHours = moment(totalTime).format('HH:mm', { trim: false });
  // return formattedHours;
  // };
  const getFormattedTime = (timeInMinutes) => {
    if(timeInMinutes === 0){
      return "00:00"
    }
    const duration = moment.duration(timeInMinutes, 'minutes');
    // Extract hours and minutes
    const hours = duration.hours();
    const minutes = duration.minutes();
    // Format the time as "hh:mm"
    const formattedTime = moment({ hours, minutes }).format('hh:mm');
    return formattedTime;
  };

  useEffect(() => {
    dispatch(getTasksByEmployee({ employeeId: user._id }));
  }, []);
  return (
    <div className='flex p-2 md:pb-2 flex-col h-full scroll-container overflow-y-auto'>
      <div className='text-sm breadcrumbs overflow-visible'>
        <ul>
          <li>
            <a>Employee</a>
          </li>
          <li>
            <a>Dashboard</a>
          </li>
        </ul>
      </div>
      <h2 className=' text-2xl font-semibold tracking-wide'>Dashboard</h2>
      <div className=' flex flex-col gap-4 h-full w-full'>
        <div className='grid md:grid-cols-4 gap-5 py-3 w-full md:h-32'>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-slate-500'>Total Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  {getFormattedTime(totalTime)} <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-primary-focus'>Work Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  {getFormattedTime(workTime)} <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-accent-focus'>Meeting Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  {getFormattedTime(meetingTime)} <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-yellow-500'>Break Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  {getFormattedTime(breakTime)} <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row pb-2 md:pb-0 gap-5'>
          <div className='w-full md:w-2/3'>
            <StackedBarChart data={tasks} height={400} border={false} />
          </div>
          <div className='grow'>
            <PieCharts data={tasks} height={400} border={false}/>
          </div>
        </div>
      </div>
    </div>
  );
}
