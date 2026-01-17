const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const newMessage = new Contact({
      name,
      email,
      subject,
      message
    });
    await newMessage.save();
    res.status(201).json({ message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
