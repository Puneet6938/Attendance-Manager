import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Attendance Manager</h1>
        </div>
        <div className="nav-right">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="section home-section">
        <div className="home-container">
          <div className="register-form-container">
            <h3>Create an Account</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Dropdown for user role */}
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit">Register</button>
            </form>
            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>

          <div className="home-description">
            <h2>Join Attendance Manager</h2>
            <p>
              Sign up to track student attendance, manage classes, and generate
              detailed reports effortlessly. Our platform is designed for
              teachers and admins to simplify attendance management.
            </p>
            <p>
              Fill in your details and create your account to get started today!
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <h2>Our Services</h2>
        <div className="services-cards">
          <div className="service-card">
            <h3>Attendance Tracking</h3>
            <p>Mark and manage daily attendance easily.</p>
          </div>
          <div className="service-card">
            <h3>Reports & Analytics</h3>
            <p>Generate detailed attendance reports and charts.</p>
          </div>
          <div className="service-card">
            <h3>Student Management</h3>
            <p>Add, update, and track student records efficiently.</p>
          </div>
          <div className="service-card">
            <h3>Teacher Dashboard</h3>
            <p>Monitor multiple classes and teacher activities.</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer-section">
        <h2>Contact Us</h2>
        <p>Email: support@attendancemanager.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123, Tech Street, Bangalore, India</p>
        <p>&copy; 2025 Attendance Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Register;
