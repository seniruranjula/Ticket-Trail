// src/components/ViewAnalytics.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/ViewAnalytics.css";

const ViewAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleGenerateReport = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/generate-report/${eventId}`,
        { responseType: "blob" } // Ensure we receive a file
      );

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${eventId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error generating report: ", err);
      alert("Failed to generate report. Please try again.");
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="view-analytics">
      <h1>View Analytics</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <h2>{event.eventName}</h2>
              <p>Available Tickets: {event.ticketQuantity}</p>
              <button
                className="generate-report-btn"
                onClick={() => handleGenerateReport(event.id)}
              >
                Generate Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAnalytics;