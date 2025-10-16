const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');

const updateAdminUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find the admin user
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });

    if (!adminUser) {
      console.log('Admin user not found. Creating new admin account...');
      
      // Create new admin user
      const newAdmin = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: 'Admin123',
        role: 'admin',
        emailVerified: true,
        isActive: true
      });

      await newAdmin.save();
      console.log('✅ Admin account created successfully!');
      console.log('Email: admin@gmail.com');
      console.log('Password: Admin123');
    } else {
      // Update existing user to admin
      adminUser.role = 'admin';
      adminUser.emailVerified = true;
      adminUser.isActive = true;
      
      await adminUser.save();
      console.log('✅ User admin@gmail.com updated to admin role successfully!');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
};

updateAdminUser();
