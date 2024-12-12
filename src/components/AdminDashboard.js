// src/components/AdminDashboard.js

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear authentication data (e.g., tokens) here
    localStorage.removeItem("authToken"); // Adjust according to your auth flow

    // Redirect to login page
    navigate("/login"); // Use navigate to redirect
  };

  const styles = {
    dashboard: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      minHeight: "100vh",
      backgroundImage: "url('/admin_bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
    },
    header: {
      padding: "20px 0",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#ffc107",
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      gap: "25px",
      padding: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    navLink: {
      color: "#ffc107",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
    },
    content: {
      marginTop: "50px",
      padding: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      maxWidth: "800px",
      margin: "50px auto",
      borderRadius: "10px",
    },
    logoutButton: {
      backgroundColor: "#ffc107",
      border: "none",
      color: "#000",
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
      </div>

      <div style={styles.nav}>
        <Link to="/admin/users" style={styles.navLink}>Manage Users</Link>
        <Link to="/admin/view-analytics" style={styles.navLink}>View Analytics</Link>
        <Link to="/admin/add-ticket" style={styles.navLink}>Add Ticket</Link>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.content}>
        <h2>Welcome, Admin!</h2>
        <p>Manage your platform and monitor activities here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;