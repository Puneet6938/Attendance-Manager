import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, markAttendance } from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [className, setClassName] = useState('');

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      await addStudent({ name, rollNumber, class: className });
      setName(''); setRollNumber(''); setClassName('');
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding student');
    }
  };

  const handleMarkAttendance = async (studentId) => {
    try {
      await markAttendance({ studentId, status: 'present' });
      alert('Attendance marked!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error marking attendance');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Students</h1>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} />
        <input placeholder="Class" value={className} onChange={e => setClassName(e.target.value)} />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.name} - {s.rollNumber} 
            <button onClick={() => handleMarkAttendance(s._id)}>Mark Present</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
