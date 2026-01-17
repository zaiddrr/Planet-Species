// const mongoose = require('mongoose');
// const Event = require('../models/Event');
// const connectDB = require('../config/db');
// const realEventsData = require('./realEventsData');

// // Connect to the database
// connectDB();

// // Function to insert events
// const insertEvents = async () => {
//   try {
//     // Optional: Remove existing events before inserting
//     await Event.deleteMany({});
    
//     // Insert new events
//     const insertedEvents = await Event.insertMany(realEventsData);
    
//     console.log(`${insertedEvents.length} events successfully inserted!`);
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error inserting events:', error);
//     mongoose.connection.close();
//   }
// };

// // Run the insertion
// insertEvents();