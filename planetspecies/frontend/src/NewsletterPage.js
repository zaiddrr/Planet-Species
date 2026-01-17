// NewsletterPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewsletterPage.css";
import Logo from "./assets/logo.png";

const NewsletterPage = () => {
  console.log("NewsletterPage rendered");
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/newsletters")
      .then((response) => {
        setNewsletters(response.data);
      })
      .catch((error) => console.error("Error fetching newsletters:", error));
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <div className="nav-logo">
          <a href="/">
            <img src={Logo} alt="Wildlife Tracker Logo" />
          </a>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/MyWatchlist">My Watchlist</a></li>
          <li><a href="/recommendations">Recommendations</a></li>
          <li><a href="/newsletter" className="active">Newsletter</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="newsletter-page-container">
        <h1 className="section-title">Species News</h1>
        <p className="section-description">
          Latest updates and stories on endangered species.
        </p>
        <div className="news-grid">
          {newsletters.length > 0 ? (
            newsletters.map((news) => (
              <div key={news._id} className="news-card">
                <img src={news.image || "/placeholder.jpg"} alt={news.title} />
                <h3 className="news-title">{news.title}</h3>
                <p className="news-date">{formatDate(news.date)}</p>
                <p className="news-content">{news.content}</p>
                <a href={news.readMoreLink} className="read-more">
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p className="no-news">No news available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
