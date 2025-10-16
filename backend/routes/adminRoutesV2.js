const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getAllUsers, getUserDetails, getDashboardStats, updateUserRole } = require('../controllers/adminControllerV2');

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/users
// @desc    Get all users with portfolio count
router.get('/users', getAllUsers);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
router.get('/stats', getDashboardStats);

// @route   GET /api/admin/users/:id
// @desc    Get single user details with portfolios
router.get('/users/:id', getUserDetails);

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
router.put('/users/:id/role', updateUserRole);

module.exports = router;
