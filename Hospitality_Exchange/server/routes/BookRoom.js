

import PaymentForm from './path-to/PaymentForm';
app.post('/bookroom', async (req, res) => {
  try {
    const { roomDetails } = req.body;

    // Validate the data
    if (!roomDetails) {
      return res.status(400).json({ success: false, error: 'Incomplete data provided' });
    }

    const totalAmount = calculateTotalAmount(roomDetails);
    res.redirect(`/payment?roomDetails=${encodeURIComponent(JSON.stringify(roomDetails))}&totalAmount=${totalAmount}`);
  } catch (error) {
    console.error('Error during room booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/makepayment', async (req, res) => {
  try {
    const { amount, currency, paymentMethodId, customerEmail } = req.body;

    // Respond with success
    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ success: false, error: 'Payment failed. Please try again.' });
  }
});

const calculateTotalAmount = (roomDetails) => {
  return totalAmount;
};

