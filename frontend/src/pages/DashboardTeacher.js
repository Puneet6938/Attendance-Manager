import React, { useEffect, useState } from 'react';
import { getStudents, markAttendance } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function DashboardTeacher() {
  const [students, setStudents] = useState([]);
  const { user } = useAuth(); // Get logged-in teacher

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch students');
    }
  };

  const handleMarkAttendance = async (studentId, status) => {
    try {
      await markAttendance({ studentId, status, date: new Date() });
      alert('Attendance marked successfully');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  return (
    <div className="dashboard">
      <h1>Teacher Dashboard</h1>
      <h2>Students</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleMarkAttendance(s._id, 'present')}>Present</button>
                <button onClick={() => handleMarkAttendance(s._id, 'absent')}>Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTeacher;
