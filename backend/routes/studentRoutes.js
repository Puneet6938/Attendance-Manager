const express = require('express');
const router = express.Router();
const { getStudents, addStudent } = require('../controllers/studentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getStudents);        // Any logged-in user
router.post('/', protect, adminOnly, addStudent); // Only admin

module.exports = router;
