// /src/models/Newsletter.js
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  newsId: { type: String, unique: true },
  title: String,
  date: String,
  content: String,
  image: String,
  category: String,
  readMoreLink: String
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
