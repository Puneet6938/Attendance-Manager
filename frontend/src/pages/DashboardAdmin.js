import React, { useEffect, useState } from 'react';
import { getStudents, addStudent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function DashboardAdmin() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useAuth(); // get logged-in user

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudents();
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await addStudent({ name, email }); // API call sends token automatically
      alert('Student added successfully');

      // Refresh student list
      const res = await getStudents();
      setStudents(res.data);

      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add student');
    }
  };

  if (user?.role !== 'admin') {
    return <h2>Not authorized</h2>; // Only admins can access this dashboard
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* Add Student Form */}
      <div className="add-student-form">
        <h2>Add New Student</h2>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      </div>

      {/* Students List */}
      <h2>All Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAdmin;
