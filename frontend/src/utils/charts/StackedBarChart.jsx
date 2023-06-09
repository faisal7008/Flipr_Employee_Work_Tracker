import moment from 'moment';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const StackedBarChart = ({ data: weeklyData, height, border }) => {
  const [week, setWeek] = useState('this');
  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  const getWeekDates = () => {
    const dates = [];

    // Adjust the current date to the start of the week
    const startDate = moment(currentDate).startOf('week');

    for (let i = 0; i < 7; i++) {
      const currentDate = moment(startDate).add(i, 'days').format('ll');
      dates.push(currentDate);
    }

    return dates;
  };
  const handleChange = (item) => {
    if (item === 'previous') {
      setWeek('previous');
      setCurrentDate(currentDate.clone().subtract(7, 'days'));
    } else if (item === 'next') {
      setWeek('next');
      setCurrentDate(currentDate.clone().add(7, 'days'));
    } else {
      setWeek('this');
      setCurrentDate(moment());
    }
  };

  const processWeeklyData = () => {
    const weeklyStats = {
      notWorking: new Array(7).fill(0),
      working: new Array(7).fill(0),
      meeting: new Array(7).fill(0),
    };

    const weekStart = currentDate.clone().startOf('week');
    const weekEnd = currentDate.clone().endOf('week');

    weeklyData.forEach((task) => {
      const { taskType, timeTaken, startTime } = task;

      const taskDate = moment(startTime);

      if (taskDate.isBetween(weekStart, weekEnd, null, '[]')) {
        const dayOfWeek = taskDate.day();
        const taskDay = moment.weekdays(dayOfWeek);

        if (!weeklyStats.notWorking[dayOfWeek]) {
          weeklyStats.notWorking[dayOfWeek] = 0;
        }
        if (!weeklyStats.working[dayOfWeek]) {
          weeklyStats.working[dayOfWeek] = 0;
        }
        if (!weeklyStats.meeting[dayOfWeek]) {
          weeklyStats.meeting[dayOfWeek] = 0;
        }

        if (taskType === 'Break') {
          weeklyStats.notWorking[dayOfWeek] += timeTaken;
        } else if (taskType === 'Work') {
          weeklyStats.working[dayOfWeek] += timeTaken;
        } else if (taskType === 'Meeting') {
          weeklyStats.meeting[dayOfWeek] += timeTaken;
        }
      }
    });

    const statsData = [
      {
        name: 'Not Working (Break)',
        data: Object.values(weeklyStats.notWorking),
        color: '#EAB308',
      },
      {
        name: 'Working',
        data: Object.values(weeklyStats.working),
        color: '#0069E0',
      },
      {
        name: 'Meeting',
        data: Object.values(weeklyStats.meeting),
        color: '#AB3B98',
      },
    ];

    return statsData;
  };

  const barChartData = processWeeklyData();
  const xaxisDates = getWeekDates();

  // console.log(xaxisDates);
  // console.log(barChartData);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
        offsetY: -20, // Adjust the toolbar offset if needed
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            // formatter: (value) => `${(value / 60).toFixed(2)} hours`,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: 'category',
      categories: xaxisDates,
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} minutes`, // Convert minutes to hours
      },
    },
    legend: {
      position: 'bottom',
      // offsetY: 10
    },
    tooltip: {
      y: {
        formatter: (value) => `${(value / 60).toFixed(2)} hours`, // Display time in hours
      },
    },
  };

  return (
    <div className={`p-5 bg-base-100 card ${border ? 'border' : 'shadow-lg'}`}>
      <div className='px-3 flex justify-between items-center'>
        <h2 className='font-semibold text-lg text-slate-500'>Weekly Stats</h2>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => handleChange('previous')}
            className={`btn btn-neutral text-sm btn-sm`}
          >
            <svg
              fill='none'
              stroke='currentColor'
              strokeWidth={2.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-4 h-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
            <span className='hidden md:block'>Previous</span>
          </button>
          <button
            type='button'
            onClick={() => handleChange('next')}
            className={`btn btn-neutral text-sm btn-sm ${
              currentDate.isSame(moment(), 'day') && 'btn-disabled'
            }`}
          >
            <span className='hidden md:block'>Next</span>
            <svg
              fill='none'
              stroke='currentColor'
              strokeWidth={2.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-4 h-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
      </div>
      <div className='py-2'>
        <ReactApexChart options={options} series={barChartData} type='bar' height={height} />
      </div>
    </div>
  );
};

export default StackedBarChart;
