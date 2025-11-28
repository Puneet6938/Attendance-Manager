import React, { useEffect, useState } from 'react';
import { getAttendanceByStudent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function DashboardStudent() {
  const { user } = useAuth();
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendanceByStudent(user.id);
      setAttendanceHistory(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch attendance');
    }
  };

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      <h2>Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map((record, idx) => (
            <tr key={idx}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardStudent;
