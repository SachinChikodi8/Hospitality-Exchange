const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema and model (replace with your actual schema)
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  number: { type: String, required: true },
});

const Customer = mongoose.model('Customer', CustomerSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint for customer registration
app.post('/registercustomer', async (req, res) => {
  try {
    const { name, email, number } = req.body;

    // Validate the data
    if (!name || !email || !number) {
      return res.status(400).json({ success: false, error: 'Incomplete data provided' });
    }

    // Additional validation (e.g., email format)
    // ...

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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
