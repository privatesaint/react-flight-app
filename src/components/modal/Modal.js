import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Table from './Table';
import { APP_URL } from '../../config';
import { handleResponse } from '../../helpers';

export default function Modal({ airport, icao }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const [departTime, setDepartTime] = React.useState(2);
  const [arrivalTime, setArrivalTime] = React.useState(2);
  const [departure, setDeparture] = React.useState([]);
  const [arrival, setArrival] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }
  const handleChange = e => {
    if (e.target.name === 'arrivalTime') {
      setArrivalTime(e.target.value);
      handleFetch('arrival', arrivalTime);
    } else {
      setDepartTime(e.target.value);
      handleFetch('departure', departTime);
    }
  };

  function handleFetch(loc, state) {
    fetch(
      `${APP_URL}/flights/${loc}?airport=${icao}&begin=${parseInt(
        Date.now() / 1000
      ) -
        state * 24 * 3600}&end=${parseInt(Date.now() / 1000)}`
    )
      .then(handleResponse)
      .then(resp => {
        if (loc === 'arrival') {
          setArrival(resp.slice(0, 50));
        } else {
          setDeparture(resp.slice(0, 50));
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        onClick={handleClickOpen('paper')}
      >
        More Info
      </Button>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {airport}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div className='form-container'>
            <div className='form-group'>
              <InputLabel htmlFor='departTime'>Depart Time(minutes)</InputLabel>
              <Select
                fullWidth
                native
                name='departTime'
                value={departTime}
                onChange={handleChange}
                input={<Input id='departTime' />}
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={4}>4 days</option>
                <option value={5}>5 days</option>
                <option value={6}>6 days</option>
                <option value={7}>7 days</option>
              </Select>
            </div>
            <div className='form-group'>
              <InputLabel htmlFor='arrivalTime'>
                Arrival Time(minutes)
              </InputLabel>
              <Select
                fullWidth
                native
                name='arrivalTime'
                value={arrivalTime}
                onChange={handleChange}
                input={<Input id='arrivalTime' />}
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={4}>4 days</option>
                <option value={5}>5 days</option>
                <option value={6}>6 days</option>
                <option value={7}>7 days</option>
              </Select>
            </div>
          </div>
        </DialogContent>
        <Table
          arrival={arrival}
          loading={loading}
          error={error}
          departure={departure}
        />
        {/* <Table departure={departure} /> */}
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
