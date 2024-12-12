import React, { useState } from "react";
import axios from "axios";
import "./CSS/ManageUser.css"; // Optional for styling

const ManageUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim passwords to ensure no accidental trailing/leading spaces cause mismatch
    if (password.trim() !== confirmPassword.trim()) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName,
        email,
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        role,
      });

      setMessage({ text: response.data.message, type: "success" });
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || "Something went wrong.",
        type: "error",
      });
    }
  };

  return (
    <div className="manage-user">
      <h1>Manage Users</h1>
      <form onSubmit={handleSubmit} className="manage-user-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Add User</button>
      </form>

      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default ManageUser;
