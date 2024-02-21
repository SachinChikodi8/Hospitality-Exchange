// index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/room', roomRouter);
app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  number: { type: String, required: true },
});

const Customer = mongoose.model('Customer', CustomerSchema);

app.post('/registercustomer', async (req, res) => {
  try {
    const { name, email, number } = req.body;

    // Validate the data
    if (!name || !email || !number) {
      return res.status(400).json({ success: false, error: 'Incomplete data provided' });
    }


    // Create a new customer document
    const newCustomer = new Customer({ name, email, number });

    // Save the customer to the database
    await newCustomer.save();

    // Respond with success
    res.json({ success: true }); 
  } catch (error) {
    console.error('Error during customer registration:', error);
    // Respond with a detailed error message 
    res.status(500).json({ success: false, error: error.message });
  }
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Running on http://localhost:${port}`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  