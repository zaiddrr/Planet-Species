// File: src/routes/events.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Import the Event model. Adjust the path based on your project structure.
const Event = require('../models/Event');

// ------------------------------------------
// Endpoint 1: Get events from MongoDB
// ------------------------------------------
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------------------
// Endpoint 2: Fetch events from Eventbrite API and save to MongoDB
// ------------------------------------------
router.get('/fetch-events', async (req, res) => {
  try {
    // Log the API token to verify it's loaded correctly
    //console.log("Using Eventbrite API Token:", process.env.TOKEN);

    // Use the Eventbrite search endpoint without the trailing slash
    //const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
    //  headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    //  params: { q: 'wildlife conservation',
    //            sort_by: 'date',
    //            expand: 'venue'
    //          }
    //});
    
    const data = response.data;

    // Define the time window: from now to 6 months later.
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    // Map keywords to event categories.
    const categoryMapping = {
      "workshop": "Workshop",
      "awareness": "Awareness Campaign"
    };

    // Filter and map the events from the API response.
    const events = data.events
      .filter(event => {
        const eventDate = new Date(event.start.utc);
        return eventDate >= today && eventDate <= sixMonthsLater;
      })
      .map(event => {
        // Determine location based on country information.
        const location = event.venue?.address?.country === "GB" ? "National" : "International";
        // Map event name to a category if possible.
        const category = Object.keys(categoryMapping).find(key =>
          event.name.text.toLowerCase().includes(key)
        ) || "Other";

        return {
          title: event.name.text,
          date: event.start.utc.split('T')[0],
          location,
          description: event.description && event.description.text ? event.description.text : "No description available.",
          category: categoryMapping[category] || "Other",
          image: event.logo ? event.logo.url : '/placeholder.jpg',
          registrationLink: event.url
        };
      });

    // Save the fetched events into MongoDB.
    await Event.insertMany(events);
    res.json({ message: "Events saved to database!" });
    
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching from Eventbrite:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
