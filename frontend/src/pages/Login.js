import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      // Save user and token in context & localStorage
      login({ ...res.data.user, token: res.data.token });

      // Redirect based on role
      switch (res.data.user.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'student':
          navigate('/dashboard/student');
          break;
        default:
          navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
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

      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="home-container">
          <div className="login-form-container">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Login</button>
            </form>
            <p className="register-link">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>

          <div className="home-description">
            <h2>Welcome to Attendance Manager</h2>
            <p>
              Easily track student attendance, generate reports, and manage classes
              with our intuitive MERN stack application. Teachers and admins can 
              efficiently monitor and maintain attendance for every student.
            </p>
            <p>
              Sign in to access your dashboard, add students, mark attendance, 
              and view detailed history.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Contact Section */}
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

export default Login;
