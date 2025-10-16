# Admin Panel Implementation Guide

## Overview
Created a complete admin panel system for your MERN portfolio builder. The admin can view all users, their join dates, and the number of portfolios created by each user.

## What Was Created

### 1. Backend API Endpoints (`/backend/routes/adminRoutesV2.js`)
All endpoints require authentication and admin role:

- **GET `/api/admin/users`** - Get all users with portfolio count
  ```json
  {
    "success": true,
    "count": 5,
    "data": [
      {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-15T...",
        "role": "user",
        "isActive": true,
        "portfolioCount": 3
      }
    ]
  }
  ```

- **GET `/api/admin/users/:id`** - Get single user details with portfolios
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T...",
      "portfolioCount": 3,
      "portfolios": [
        {
          "_id": "...",
          "title": "My Portfolio",
          "slug": "my-portfolio",
          "createdAt": "2024-01-20T..."
        }
      ]
    }
  }
  ```

- **GET `/api/admin/stats`** - Get dashboard statistics
  ```json
  {
    "success": true,
    "data": {
      "totalUsers": 10,
      "totalAdmins": 2,
      "totalPortfolios": 15,
      "totalActiveUsers": 8
    }
  }
  ```

### 2. Backend Controller (`/backend/controllers/adminControllerV2.js`)
- `getAllUsers()` - Fetches all users and counts their portfolios
- `getUserDetails()` - Fetches individual user with full portfolio list
- `getDashboardStats()` - Fetches statistics for dashboard cards

### 3. Frontend Admin Dashboard (`/frontend/src/pages/AdminDashboard.js`)
Features:
- **Statistics Cards**: Total Users, Admins, Portfolios, Active Users
- **Users Table**: Shows all users with columns for:
  - Name
  - Email
  - Joined Date
  - Number of Portfolios
  - Account Status (Active/Inactive)
  - Role (User/Admin)
  - Action button to view details
- **User Details Modal**: Clicking "View" shows detailed information including:
  - Full name and email
  - Joined date
  - Portfolio count
  - Account status
  - List of user's portfolios

### 4. Private Admin Route (`/frontend/src/components/auth/PrivateAdminRoute.js`)
- Protects admin-only routes
- Checks if user is authenticated and has admin role
- Redirects to dashboard if not authorized

### 5. Navigation Integration
- Added "Admin Panel" link to sidebar (visible only to admins)
- Uses FaShieldAlt icon
- Automatically hidden for non-admin users

## Setup Instructions

### Step 1: Update Admin Account
Run the update script to make admin@gmail.com an admin:

```bash
cd backend
node updateAdminRole.js
```

This will either:
- Create a new admin account if admin@gmail.com doesn't exist
- Update existing admin@gmail.com account to admin role

**Credentials:**
- Email: admin@gmail.com
- Password: Admin123

### Step 2: Start Backend Server
```bash
cd backend
npm start
```

### Step 3: Start Frontend
```bash
cd frontend
npm start
```

### Step 4: Access Admin Panel
1. Login with admin@gmail.com / Admin123
2. Click "Admin Panel" in the sidebar navigation
3. View all users and their statistics

## Features Breakdown

### User Click Functionality
- Click the **Total Users** card number to scroll to users table
- Click **View** button on any user row to see detailed information

### User Details Modal
Shows:
- User name and email
- When they joined (formatted date)
- How many portfolios they've created
- Account status
- Role (Admin/User)
- Complete list of their portfolios with creation dates

### Statistics Cards
- **Total Users**: Total count of all users
- **Admins**: Count of admin users
- **Total Portfolios**: Sum of all portfolios
- **Active Users**: Count of active accounts

### Color Coding
- **Blue**: Primary action and user count badges
- **Purple**: Admin role indicators
- **Green**: Active status
- **Red**: Inactive status
- **Orange**: Active user count

## API Authentication
All admin endpoints are protected with:
1. **Authentication Middleware** (`protect`) - Verifies JWT token
2. **Authorization Middleware** (`authorize('admin')`) - Checks if user role is 'admin'

## Database Queries
The implementation uses:
- `User.find()` - Get all users
- `Portfolio.countDocuments({ userId: user._id })` - Count portfolios per user
- `Portfolio.find({ userId: user._id })` - Get user's portfolios
- MongoDB aggregation for statistics

## Files Modified/Created

### Created:
- `/backend/controllers/adminControllerV2.js` - Admin API logic
- `/backend/routes/adminRoutesV2.js` - Admin API routes
- `/frontend/src/pages/AdminDashboard.js` - Admin dashboard UI
- `/frontend/src/components/auth/PrivateAdminRoute.js` - Route protection
- `/backend/updateAdminRole.js` - Admin account setup script

### Modified:
- `/backend/server.js` - Added admin routes mounting
- `/frontend/src/App.js` - Added admin route
- `/frontend/src/components/layout/Layout.js` - Added admin link to navigation

## Error Handling
- API endpoints return proper error messages
- Frontend shows loading states
- Modal automatically closes on button click
- Table displays "No users found" when empty

## Next Steps (Optional Enhancements)
1. Add user search/filter functionality
2. Add pagination for large user lists
3. Add ability to ban/unban users
4. Add user activity history
5. Add portfolio management from admin panel
6. Add role assignment/revocation
7. Add user statistics charts
