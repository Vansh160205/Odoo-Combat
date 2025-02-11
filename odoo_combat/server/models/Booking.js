const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  furniture: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Booking = mongoose.model("Booking", BookingSchema)
module.exports = Booking