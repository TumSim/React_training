import * as React from 'react';
import {useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddNewTraining({ data, setNewTraining }) {
  const [open, setOpen] = React.useState(false);

  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: data._links.customer.href
  })

  const handleClickOpen = () => {
    setTraining({
      date: {},
      duration: "",
      activity: "",
      customer: data._links.customer.href
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setNewTraining(training);
    handleClose();
  }



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{ margin: 5 }}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >

        <DialogTitle>New Training</DialogTitle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date"
              name= "date"
              onChange={(date)=> setTraining({...training, date: date.toISOString() })}
              ampm ={false}
              views={['year', 'day', 'hours', 'minutes']}
              sx={{ width: "92%", margin: "0 auto"}}
              />
        </LocalizationProvider>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name="customer"
            value={`${data.firstname} ${data.lastname}`}
            InputProps={{
              readOnly: true,
            }}
            label="Customer"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddNewTraining;