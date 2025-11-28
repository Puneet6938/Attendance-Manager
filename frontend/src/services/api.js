import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auto add token
API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});


// AUTH
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// STUDENTS
export const getStudents = () => API.get('/students');
export const addStudent = (data) => API.post('/students', data);

// ATTENDANCE
export const markAttendance = (data) => API.post('/attendance', data);
export const getAttendanceByStudent = (id) => API.get(`/attendance/student/${id}`);
export const getAttendanceByDate = (date) => API.get(`/attendance?date=${date}`);
