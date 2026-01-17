// // backend/controllers/eventController.js
// const Event = require('../models/Event');

// exports.getAllEvents = async (req, res) => {
//   try {
//     const { category, species, location } = req.query;
    
//     // Create a dynamic query based on provided filters
//     const query = {};
//     if (category) query.category = category;
//     if (species) query.species = { $regex: species, $options: 'i' };
//     if (location) query.location = { $regex: location, $options: 'i' };
    
//     const events = await Event.find(query)
//       .sort({ date: 1 })
//       .select('-organizerContact.email'); // Exclude sensitive contact info
    
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ 
//       message: 'Error fetching events', 
//       error: error.message 
//     });
//   }
// };

// exports.registerForEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;
    
//     const event = await Event.findById(eventId);
    
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
    
//     // Check event capacity
//     if (event.currentParticipants >= event.maxParticipants) {
//       return res.status(400).json({ message: 'Event is full' });
//     }
    
//     // Increment participants
//     event.currentParticipants += 1;
//     await event.save();
    
//     res.status(200).json({ 
//       message: 'Successfully registered', 
//       availableSpots: event.maxParticipants - event.currentParticipants 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       message: 'Registration error', 
//       error: error.message 
//     });
//   }
// };