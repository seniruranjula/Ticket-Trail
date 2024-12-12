const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // For password hashing
const fs = require("fs");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require("./myticket-7f435-firebase-adminsdk-ny5f3-18995f0fc3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myticket-7f435.firebaseio.com", // Replace with your Firebase URL
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // CORS setup to allow requests from frontend

// API Endpoint for User Registration
app.post("/api/register", async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await admin.firestore().collection("users").add({
      fullName,
      email,
      password: hashedPassword,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// API Endpoint for User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSnapshot = await admin.firestore()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const user = userSnapshot.docs[0].data();
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    return res.status(200).json({
      message: "Login successful",
      role: user.role,
      fullName: user.fullName,
    });
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// API Endpoint to Add Tickets (Admin Only)
app.post("/api/tickets", async (req, res) => {
  const { eventName, ticketQuantity } = req.body;

  if (!eventName || !ticketQuantity || ticketQuantity <= 0) {
    return res.status(400).json({ error: "Invalid event name or ticket quantity!" });
  }

  try {
    const ticketData = {
      eventName,
      ticketQuantity: parseInt(ticketQuantity, 10), // Ensure it's an integer
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection("tickets").doc(eventName).set(ticketData);

    return res.status(200).json({ message: "Tickets added successfully!" });
  } catch (error) {
    console.error("Error adding tickets: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// API Endpoint to Buy Tickets (Customer)
app.post("/api/buy-ticket", async (req, res) => {
  const { eventName, quantity } = req.body;

  if (!eventName || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid event name or quantity!" });
  }

  try {
    const ticketDoc = await admin.firestore().collection("tickets").doc(eventName).get();

    if (!ticketDoc.exists) {
      return res.status(404).json({ error: "Event not found!" });
    }

    const ticketData = ticketDoc.data();

    if (ticketData.ticketQuantity < quantity) {
      return res.status(400).json({ error: "Not enough tickets available. Sold out!" });
    }

    const newQuantity = ticketData.ticketQuantity - quantity;

    await admin.firestore().collection("tickets").doc(eventName).update({
      ticketQuantity: newQuantity,
    });

    return res.status(200).json({
      message: `Successfully purchased ${quantity} tickets for ${eventName}!`,
      remainingTickets: newQuantity,
    });
  } catch (error) {
    console.error("Error buying tickets: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// API Endpoint to Fetch All Events
app.get("/api/events", async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("tickets").get();

    const events = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        eventName: data.eventName,
        ticketQuantity: data.ticketQuantity,
        createdAt: data.createdAt,
      };
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events: ", err);
    res.status(500).json({ error: "Error fetching events." });
  }
});

// API to Generate Report for a Specific Event
app.get("/api/generate-report/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const eventDoc = await admin.firestore().collection("tickets").doc(eventId).get();

    if (!eventDoc.exists) {
      return res.status(404).json({ error: "Event not found!" });
    }

    const eventData = eventDoc.data();
    const sales = eventData.sales || 0; // Assuming sales data is tracked separately

    const doc = new PDFDocument();
    const fileName = `report_${eventId}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    doc.pipe(res);

    doc.fontSize(18).text(`Report for Event: ${eventData.eventName}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Event ID: ${eventId}`);
    doc.text(`Ticket Quantity: ${eventData.ticketQuantity}`);
    doc.text(`Sales: ${sales}`);
    doc.text(`Remaining Tickets: ${eventData.ticketQuantity - sales}`);
    doc.text(`Created At: ${eventData.createdAt.toDate().toLocaleString()}`);

    doc.end();
  } catch (error) {
    console.error("Error generating PDF report: ", error);
    res.status(500).json({ error: "Error generating report." });
  }
});

// API Endpoint for User Registration
app.post("/api/register", async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await admin.firestore().collection("users").add({
      fullName,
      email,
      password: hashedPassword,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
