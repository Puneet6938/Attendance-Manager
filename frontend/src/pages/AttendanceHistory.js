import React, { useState, useEffect } from 'react';
import { getStudents, getAttendanceByStudent, getAttendanceByDate } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AttendanceHistory() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getStudents();
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const fetchAttendanceByStudent = async (studentId) => {
    const res = await getAttendanceByStudent(studentId);
    setAttendance(res.data);
  };

  const fetchAttendanceByDate = async (date) => {
    const res = await getAttendanceByDate(date);
    setAttendance(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Attendance History</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Filter by Student: </label>
        <select value={selectedStudent} onChange={e => {
          setSelectedStudent(e.target.value);
          fetchAttendanceByStudent(e.target.value);
        }}>
          <option value="">--Select Student--</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <label style={{ marginLeft: 20 }}>Filter by Date: </label>
        <input type="date" value={dateFilter} onChange={e => {
          setDateFilter(e.target.value);
          fetchAttendanceByDate(e.target.value);
        }} />
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(a => (
            <tr key={a._id}>
              <td>{a.student.name}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>Attendance Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={students.map(s => ({
          name: s.name,
          present: attendance.filter(a => a.student._id === s._id && a.status === 'present').length,
          absent: attendance.filter(a => a.student._id === s._id && a.status === 'absent').length
        }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" fill="#4caf50" />
          <Bar dataKey="absent" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceHistory;
