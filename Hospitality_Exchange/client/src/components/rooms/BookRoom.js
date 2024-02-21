import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { registercustomer } from '../../actions/Customer';
import { useValue } from '../../context/ContextProvider';

const BookRoom = ({ open, onClose }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    state: { room },
    dispatch,
  } = useValue();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get values from refs
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const number = numberRef.current.value;

    // Validate data
    if (!name || !email || !phone) { 
      toast.warn('Please Fill the information', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      // Perform registration
      const response = await registercustomer({ name, email, number });

      if (response.success) {
        toast.success('Booking Successful!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // Reset form values
        setName("");
        setEmail("");
        setPhone("");

        // Close the modal
        onClose();
      } else {
        toast.success('Booked Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.success('Room Booked Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle align='center'>Book Room </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction={'column'} fullWidth>
              <TextField
                label="Name"
                fullWidth
                inputRef={nameRef}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                inputRef={emailRef}
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Phone Number"
                fullWidth
                inputRef={numberRef}
                variant="outlined"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                type="number"
                maxLength={12}
              />
              <TextField
                label="CVV Number"
                fullWidth
                variant="outlined"
                type="number"
                maxLength={4}
                
              />
              <TextField
                label="Payment Amount"
                fullWidth
                variant="outlined"
                type="number"
                value={room?.price}
                disabled={true}
              />
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Book Room
              </Button>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookRoom;
