import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/DashboardAdmin';
import TeacherDashboard from './pages/DashboardTeacher';
import StudentDashboard from './pages/DashboardStudent';
import Students from './pages/Students';
import AttendanceHistory from './pages/AttendanceHistory';
import { AuthProvider, useAuth } from './context/AuthContext';

// PrivateRoute with role check
function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Always start at login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route 
            path="/dashboard/admin" 
            element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/dashboard/teacher" 
            element={<PrivateRoute allowedRoles={['teacher']}><TeacherDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/dashboard/student" 
            element={<PrivateRoute allowedRoles={['student']}><StudentDashboard /></PrivateRoute>} 
          />

          {/* Shared routes */}
          <Route 
            path="/students" 
            element={<PrivateRoute allowedRoles={['admin','teacher']}><Students /></PrivateRoute>} 
          />
          <Route 
            path="/attendance-history" 
            element={<PrivateRoute allowedRoles={['admin','teacher']}><AttendanceHistory /></PrivateRoute>} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
