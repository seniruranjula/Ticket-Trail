import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/register" style={styles.navLink}>Register</Link>
      <Link to="/login" style={styles.navLink}>Login</Link>
      <Link to="/about" style={styles.navLink}>About Us</Link>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.mainHeading}>TicketTrail</h1>
          <p style={styles.subHeading}>Your ultimate online ticket booking platform</p>
          <p style={styles.description}>
            Book tickets for your favorite events, concerts, and shows with ease. Explore a seamless experience and enjoy exclusive offers.
          </p>
          <button style={styles.getStartedButton}>Book Now</button>
        </div>
        <div style={styles.imageContainer}>
          <img
            src={process.env.PUBLIC_URL + '/ticket_bg_img.jpg'}
            alt="Event Tickets"
            style={styles.bookImage}
          />
        </div>
      </header>
      <section style={styles.statsSection}>
        <div style={styles.statItem}>
          <h2 style={styles.statNumber}>1M+</h2>
          <p style={styles.statDescription}>Tickets sold to happy customers worldwide.</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={styles.statNumber}>24/7</h2>
          <p style={styles.statDescription}>Customer support to assist you anytime.</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={styles.statNumber}>500+</h2>
          <p style={styles.statDescription}>Events listed monthly for you to explore.</p>
        </div>
        <div style={styles.statItem}>
          <h2 style={styles.statNumber}>99%</h2>
          <p style={styles.statDescription}>Customer satisfaction rate for our service.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p>© 2024 TicketTrail. All rights reserved.</p>
        <div style={styles.socialLinks}>
          <a href="https://facebook.com" style={styles.socialLink}>Facebook</a>
          <a href="https://twitter.com" style={styles.socialLink}>Twitter</a>
          <a href="https://instagram.com" style={styles.socialLink}>Instagram</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    padding: "20px",
    backgroundColor: "#000",
    color: "#fff",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px",
    backgroundColor: "#000",
    color: "#fff",
  },
  headerContent: {
    textAlign: "left",
    maxWidth: "50%",
  },
  mainHeading: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#ffc107",
  },
  subHeading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  getStartedButton: {
    backgroundColor: "#ffc107",
    border: "none",
    color: "#000",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imageContainer: {
    maxWidth: "40%",
  },
  bookImage: {
    width: "100%",
    borderRadius: "10px",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    backgroundColor: "#ffc107",
    color: "#000",
  },
  statItem: {
    textAlign: "center",
    margin: "10px",
  },
  statNumber: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  statDescription: {
    fontSize: "14px",
    lineHeight: "1.5",
  },
  footer: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  socialLinks: {
    marginTop: "10px",
  },
  socialLink: {
    color: "#ffc107",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "14px",
  },
};

export default HomePage;
