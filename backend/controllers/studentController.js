const Student = require('../models/Student'); // Make sure you have a Student model

// Get all students (any logged-in user)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

// Add student (admin only)
exports.addStudent = async (req, res) => {
  const { name, email, className } = req.body;

  if (!name || !email || !className) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = new Student({ name, email, className });
    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add student' });
  }
};
