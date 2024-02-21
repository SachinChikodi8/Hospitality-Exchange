import React from 'react';
import { Dialog, DialogContent, DialogTitle, Stack, TextField, Button } from '@mui/material';
import PaymentForm from './PaymentForm'; // Adjust the path accordingly

const PaymentComponent = ({ open, onClose, room }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle align="center">Payment Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="column" fullWidth>
          {/* Display room details */}
          <TextField label="Room Details" fullWidth variant="outlined" value={room?.details} disabled />

          {/* Display total amount */}
          <TextField label="Total Amount" fullWidth variant="outlined" type="number" value={room?.price} disabled />

          {/* Render the PaymentForm component */}
          <PaymentForm onClose={onClose} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentComponent;
