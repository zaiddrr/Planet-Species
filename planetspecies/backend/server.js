// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

const newslettersRoutes = require('./src/routes/newsletters');
const eventsRoutes = require('./src/routes/events'); 
const contactRoutes = require('./src/routes/contact');  // NEW

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/newsletters', newslettersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/contact', contactRoutes); // NEW

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Cron job for events (and you can add one for newsletters if desired)
const updateEvents = async () => {
  try {
    await axios.get('http://localhost:5000/api/events/fetch-events');
    console.log("Events updated successfully at", new Date());
  } catch (error) {
    console.error("Error updating events:", error.message);
  }
};
cron.schedule('0 * * * *', updateEvents);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
