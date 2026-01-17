import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';
import Logo from "./assets/logo.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus({ loading: false, success: response.data.message, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({
        loading: false,
        success: null,
        error: error.response?.data?.error || "Submission failed"
      });
    }
  };

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
          <li><a href="/newsletter">Newsletter</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/contact" className="active">Contact Us</a></li>
        </ul>
      </nav>
      <div className="contact-page-container">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-description">
          Submit your suggestions, feedback, or report any issues.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input 
            type="text"
            name="name"
            placeholder="Your Name (optional)"
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email"
            name="email"
            placeholder="Your Email (optional)"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="text"
            name="subject"
            placeholder="Subject (optional)"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea 
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button" disabled={status.loading}>
            {status.loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {status.success && <p className="success-message">{status.success}</p>}
        {status.error && <p className="error-message">{status.error}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
