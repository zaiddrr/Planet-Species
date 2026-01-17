const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },
  title: String,
  date: String,
  location: String,
  description: String,
  category: String,
  image: String,
  registrationLink: String
});

module.exports = mongoose.model('Event', eventSchema);