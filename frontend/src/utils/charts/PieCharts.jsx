import moment from 'moment';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieCharts = ({ data, height, border }) => {
  const [taskDay, setTaskDay] = useState('today');

  const getCurrentDayData = () => {
    const currentDay = moment().format('YYYY-MM-DD');
    return data.filter((task) => moment(task.startTime).format('YYYY-MM-DD') === currentDay);
  };

  const getPreviousDayData = () => {
    const previousDay = moment().subtract(1, 'day').format('YYYY-MM-DD');
    return data.filter((task) => moment(task.startTime).format('YYYY-MM-DD') === previousDay);
  };

  const processDataForPieChart = (data) => {
    const pieData = {
      work: 0,
      meeting: 0,
      break: 0,
    };

    data.forEach((task) => {
      switch (task.taskType) {
        case 'Work':
          pieData.work += task.timeTaken / 60;
          break;
        case 'Break':
          pieData.break += task.timeTaken / 60;
          break;
        case 'Meeting':
          pieData.meeting += task.timeTaken / 60;
          break;
        default:
          break;
      }
    });

    return Object.values(pieData);
  };

  const currentDayData = getCurrentDayData();
  const previousDayData = getPreviousDayData();

  const currentDayPieData = processDataForPieChart(currentDayData);
  const previousDayPieData = processDataForPieChart(previousDayData);

  const options = {
    colors: ['#0069E0', '#AB3B98', '#EAB308'],
    plotOptions: {
      pie: {
        // ...
        dataLabels: {
          formatter: (value) => `${value.toFixed(2)} hours`,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)} hours`,
      },
    },
    labels: ['Work (hours)', 'Meeting (hours)', 'Break (hours)'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div
      className={`flex p-5 h-full bg-base-100 card ${
        border ? 'border' : 'shadow-lg'
      } justify-start items-center w-full gap-4 md:gap-12`}
    >
      <div className='flex gap-2'>
        <button
          type='button'
          onClick={() => setTaskDay('today')}
          className={`btn btn-neutral btn-sm ${taskDay === 'today' ? '' : 'btn-outline'}`}
        >
          Today
        </button>
        <button
          type='button'
          onClick={() => setTaskDay('yesterday')}
          className={`btn btn-neutral btn-sm ${taskDay === 'yesterday' ? '' : 'btn-outline'}`}
        >
          Yesterday
        </button>
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={taskDay === 'today' ? currentDayPieData : previousDayPieData}
          type='donut'
          height={height}
        />
      </div>
    </div>
  );
};

export default PieCharts;
