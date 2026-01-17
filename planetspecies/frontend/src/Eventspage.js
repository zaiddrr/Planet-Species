import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventsPage.css";
import Logo from "./assets/logo.png";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [timeWindow, setTimeWindow] = useState("all");
  const [eventType, setEventType] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const today = new Date();
  
  const filterEvents = () => {
    let updatedEvents = [...events];
  

    // Filter by Event Type
    if (eventType !== "all") {
      updatedEvents = updatedEvents.filter(event => 
        event.category.toLowerCase() === eventType.toLowerCase()
      );
    }
  
    // Filter by Time Window
    if (timeWindow !== "all") {
      const futureDate = new Date();
      futureDate.setMonth(today.getMonth() + parseInt(timeWindow.replace("months", "")));
  
      updatedEvents = updatedEvents.filter(event => 
        new Date(event.date) >= today && new Date(event.date) <= futureDate
      );
    }
  
    setFilteredEvents(updatedEvents);
  };

  const availableCategories = [...new Set(events.map(event => event.category))];

  <select onChange={(e) => setEventType(e.target.value)}>
  <option value="all">All Event Types</option>
  {availableCategories.map(cat => (
    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
  ))}
  </select>


  useEffect(() => {
    filterEvents();
  }, [timeWindow, eventType]);

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <div className="nav-logo">
          <a href="/">
            <img src={Logo} alt="Wildlife Tracker Logo" />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/MyWatchlist">My Watchlist</a>
          </li> 
          <li>
            <a href="/recommendations">Recommendations</a>
          </li>
          <li>
            <a href="/newsletter">Newsletter</a>
          </li>
          <li>
            <a href="/events" className="active">
              Events
            </a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="events-page-container">
        <h1 className="section-title">Conservation Events</h1>
        <p className="section-description">
          Join us in protecting endangered species through educational
          workshops and community events.
        </p>


        {/* Filters Section */}
        <div className="filters-container">
          <select onChange={(e) => setTimeWindow(e.target.value)}>
            <option value="all">Anytime</option>
            <option value="1month">Within 1 Month</option>
            <option value="2months">Within 2 Months</option>
            <option value="3months">Within 3 Months</option>
            <option value="4months">Within 4 Months</option>
            <option value="5months">Within 5 Months</option>
            <option value="6months">Within 6 Months</option>
          </select>

          <select onChange={(e) => setEventType(e.target.value)}>
            <option value="all">All Event Types</option>
            <option value="workshop">Workshops</option>
            <option value="awareness">Awareness Campaigns</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="event-card">
                <img src={event.image || "/placeholder.jpg"} alt={event.title} />
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{formatDate(event.date)} - {event.location}</p>
                <p className="event-description">{event.description}</p>
                <a href={event.registrationLink} className="register-button">
                  Register
                </a>
              </div>
            ))
          ) : (
            <p className="no-events">No upcoming events match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
