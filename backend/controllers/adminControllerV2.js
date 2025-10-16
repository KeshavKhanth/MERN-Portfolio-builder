const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

// @desc    Get all users with portfolio count
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken').lean();
    
    // Get portfolio count for each user
    const usersWithPortfolioCount = await Promise.all(
      users.map(async (user) => {
        const portfolioCount = await Portfolio.countDocuments({ userId: user._id });
        return {
          ...user,
          portfolioCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: usersWithPortfolioCount.length,
      data: usersWithPortfolioCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Get single user with portfolio details
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -refreshToken');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const portfolios = await Portfolio.find({ userId: user._id }).select('title slug createdAt');
    const portfolioCount = portfolios.length;

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        portfolioCount,
        portfolios
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details',
      error: error.message
    });
  }
};

// @desc    Get dashboard stats for admin
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalPortfolios = await Portfolio.countDocuments();
    const totalActiveUsers = await User.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalAdmins,
        totalPortfolios,
        totalActiveUsers
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either "user" or "admin"'
      });
    }

    // Find and update user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent removing admin role from current admin user (optional safety measure)
    if (req.user._id.toString() === userId && role === 'user') {
      return res.status(403).json({
        success: false,
        message: 'Cannot remove your own admin role'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};
