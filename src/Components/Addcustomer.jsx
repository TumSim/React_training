import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function NewCustomer({handleCustomerSave}) {
  const [open, setOpen] = React.useState(false);

  const[customer, setCustomer] = React.useState({
    firstname: "", 
    lastname: "", 
    email: "", 
    phone: "", 
    streetaddress: "", 
    postcode: "", 
    city: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) =>{
    setCustomer({...customer, [e.target.name]: e.target.value})
  }

  const handleSave = () =>{
    handleCustomerSave(customer);
    handleClose();
  }



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{margin: 10}}>
        New Customer
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
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInput(e)}
            label="Firstname"
            fullWidth
          />
            <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInput(e)}
            label="Lastname"
            fullWidth
          />
            <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={e => handleInput(e)}
            label="Email"
            fullWidth
          />
            <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={e => handleInput(e)}
            label="Phone"
            fullWidth
          />
            <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => handleInput(e)}
            label="Street address"
            fullWidth
          />
            <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={e => handleInput(e)}
            label="Postcode"
            fullWidth
          />
            <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={e => handleInput(e)}
            label="City"
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

export default NewCustomer;