// PaymentForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, CircularProgress } from '@mui/material';

const PaymentForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" variant="contained" color="primary">
        Pay Now
      </Button>
    </form>
  );
};

export default PaymentForm;
