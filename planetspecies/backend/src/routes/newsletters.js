const express = require('express');
const axios = require('axios');
const router = express.Router();

const Newsletter = require('../models/Newsletter');

router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.find({});
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/fetch-newsletters', async (req, res) => {
  try {
    console.log("NEWS_API_KEY:", process.env.NEWS_API_KEY);

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'endangered species OR wildlife conservation',
        sortBy: 'publishedAt'
      },
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY
      }
    });

    const data = response.data;
    const articles = data.articles.map(article => ({
      newsId: article.url, 
      title: article.title,
      date: article.publishedAt.split('T')[0],
      content: article.description || "No description available.",
      image: article.urlToImage || '/placeholder.jpg',
      category: "News",
      readMoreLink: article.url
    }));

    const bulkOps = articles.map(article => ({
      updateOne: {
        filter: { newsId: article.newsId },
        update: { $set: article },
        upsert: true
      }
    }));

    await Newsletter.bulkWrite(bulkOps);
    res.json({ message: "Newsletters updated successfully!" });
  } catch (error) {
    console.error("Error fetching newsletters:", error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
