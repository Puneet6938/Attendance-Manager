const Attendance = require('../models/Attendance');

// Mark attendance for a student
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, status, date } = req.body;

    const existing = await Attendance.findOne({ student: studentId, date: date || new Date().toISOString().slice(0,10) });
    if (existing) return res.status(400).json({ message: "Attendance already marked" });

    const attendance = new Attendance({ student: studentId, status, date: date || new Date() });
    await attendance.save();

    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get attendance for a specific student
exports.getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.studentId }).populate('student', 'name rollNumber class');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get attendance for a specific date or class
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const records = await Attendance.find({ date: date || new Date().toISOString().slice(0,10) }).populate('student', 'name rollNumber class');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
