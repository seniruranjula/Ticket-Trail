import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

const CustomerDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear authentication data here, e.g., removing tokens from localStorage
    localStorage.removeItem("authToken");  // Adjust this based on your auth flow

    // Redirect to login page after logout
    navigate("/login");  // Use navigate to redirect
  };

  const styles = {
    dashboard: {
      backgroundImage: "url('/customer_bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#ffc107",
    },
    nav: {
      display: "flex",
      justifyContent: "flex-end", // Align the content to the right
      padding: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    navLink: {
      color: "#ffc107",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
      marginRight: "20px", // Spacing between links
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
    content: {
      textAlign: "center",
      padding: "50px",
    },
    subHeading: {
      fontSize: "28px",
      marginBottom: "10px",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Customer Dashboard</h1>
      </div>

      <div style={styles.nav}>
        <Link to="/customer/buy-ticket" style={styles.navLink}>Buy Ticket</Link>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.subHeading}>Welcome, Customer!</h2>
        <p style={styles.description}>
          Manage your profile and purchase tickets here.
        </p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
