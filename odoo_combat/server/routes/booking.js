const express = require('express');
const Booking = require('../models/Booking');
const Furniture = require('../models/Furniture');
const User = require('../models/User');
const router = express.Router();
const auth = require('../routes/auth');
const mongoose = require('mongoose')

router.post('/', auth, async (req, res) => {
  const { userId,furnitureId, startDate, endDate } = req.body;

  try {
    const booking = new Booking({
      user: userId,
      furniture: furnitureId,
      startDate,
      endDate
    });
    await booking.save();

    // Update furniture availability
    const furniture = await Furniture.findById(furnitureId);
    furniture.availability = false;
    await furniture.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/user/:user', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user:req.params.user });
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;