const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { protect, authorize } = require('../middleware/authMiddleware');

// Teachers can mark attendance
router.post('/', protect, authorize('teacher'), async (req, res) => {
  const { studentId, status, date } = req.body;
  const attendance = new Attendance({ studentId, status, date });
  await attendance.save();
  res.status(201).json(attendance);
});

// Get attendance by student (all roles can see own attendance)
router.get('/student/:id', protect, async (req, res) => {
  // Students can only see their own attendance
  if (req.user.role === 'student' && req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const records = await Attendance.find({ studentId: req.params.id });
  res.json(records);
});

// Admin/teacher can filter by date
router.get('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  const { date } = req.query;
  const records = await Attendance.find({ date: new Date(date) });
  res.json(records);
});

module.exports = router;
