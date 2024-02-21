import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema(
  {
    name: { type: String, min: 2, max: 50, required: true },
    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
        },
        name: { type: Number, min: 10, max: 15, required: true },
    
  },
  { timestamps: true }
);

const CustomerSchem = mongoose.model('customers', userSchema);
export default CustomerSchem;