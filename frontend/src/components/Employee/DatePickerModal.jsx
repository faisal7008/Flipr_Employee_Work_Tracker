import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './style.css';


export default function DatePickerModal({date, setDate, errorMsg}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        value={date}
        onChange={(val) => setDate(val)}
        disableFuture
        orientation='portrait'
        slotProps={{
          dialog: {
            disablePortal: true,
            hideBackdrop: 'false',
            sx: { bgcolor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none', backdropFilter: 'none' },
          }
        }}
        className='w-full outline-none border-none'
      />
    </LocalizationProvider>
  );
}
