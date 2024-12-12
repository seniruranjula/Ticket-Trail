import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import AddTicket from "./components/AddTicket";
import BuyTicket from "./components/BuyTicket";  // Import the BuyTicket component
import ViewAnalytics from "./components/ViewAnalytics"; // Import ViewAnalytics component
import ManageUser from "./components/ManageUsers"; // Import ManageUser component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/buy-ticket" element={<BuyTicket />} /> {/* Add BuyTicket route */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="/admin/add-ticket" element={<AddTicket />} />
        <Route path="/admin/view-analytics" element={<ViewAnalytics />} />
        <Route path="/admin/users" element={<ManageUser />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
