# Admin Panel - System Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ AdminDashboard.js (Page Component)                      │  │
│  │ ├─ Statistics Cards (animated)                          │  │
│  │ ├─ Users Table                                          │  │
│  │ └─ User Details Modal                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↑                                     │
│                    axios.get()                                  │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ API Calls                                               │  │
│  │ ├─ /api/admin/stats                                    │  │
│  │ ├─ /api/admin/users                                    │  │
│  │ └─ /api/admin/users/:id                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ PrivateAdminRoute (Protection)                          │  │
│  │ └─ Checks: role === 'admin'                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Layout Navigation                                       │  │
│  │ └─ "Admin Panel" link (visible only to admins)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           ↑
                      HTTP (JWT Token)
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                       BACKEND (Express)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Admin Routes (adminRoutesV2.js)                         │  │
│  ├─ GET /api/admin/users                                  │  │
│  ├─ GET /api/admin/users/:id                              │  │
│  └─ GET /api/admin/stats                                  │  │
│  └─ Middleware: protect + authorize('admin')              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↑                                     │
│                    Express Router                               │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Admin Controller (adminControllerV2.js)                │  │
│  ├─ getAllUsers()                                          │  │
│  ├─ getUserDetails()                                       │  │
│  └─ getDashboardStats()                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↑                                     │
│                  Mongoose Queries                               │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Database Queries                                        │  │
│  ├─ User.find()                                            │  │
│  ├─ Portfolio.countDocuments({ userId })                  │  │
│  └─ Portfolio.find({ userId })                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           ↑
                       MongoDB
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐│
│  │ Users Collection             │  │ Portfolios Collection    ││
│  ├──────────────────────────────┤  ├──────────────────────────┤│
│  │ _id (ObjectId)              │  │ _id (ObjectId)           ││
│  │ firstName (String)          │  │ userId (Ref: Users)      ││
│  │ lastName (String)           │  │ title (String)           ││
│  │ email (String)              │  │ slug (String)            ││
│  │ password (Hash)             │  │ createdAt (Date)         ││
│  │ role (Enum)                 │  │ content (Mixed)          ││
│  │ isActive (Boolean)          │  │ customizations (Object)  ││
│  │ createdAt (Date)            │  │ ...                      ││
│  │ ...                         │  │                          ││
│  └──────────────────────────────┘  └──────────────────────────┘│
│                   ↑                           ↑                 │
│                   └───── One-to-Many ────────┘                 │
│            (One User has Many Portfolios)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request-Response Flow

### Flow 1: Fetch All Users with Portfolio Count

```
┌─ FRONTEND ──────────────────────────────────────────────────────┐
│                                                                 │
│  1. User clicks "Admin Panel" in navigation                    │
│  ↓                                                              │
│  2. PrivateAdminRoute checks: role === 'admin'? ✓              │
│  ↓                                                              │
│  3. AdminDashboard mounts                                       │
│  ↓                                                              │
│  4. axios.get('/api/admin/users') sent with JWT token          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
        ↓ HTTP Request with Authorization Header
┌─ BACKEND ───────────────────────────────────────────────────────┐
│                                                                 │
│  5. Route: GET /api/admin/users                                │
│  ↓                                                              │
│  6. Middleware: protect() - Verifies JWT token ✓               │
│  ↓                                                              │
│  7. Middleware: authorize('admin') - Checks role ✓             │
│  ↓                                                              │
│  8. Controller: getAllUsers()                                  │
│     ├─ Query: User.find() → [user1, user2, ...]               │
│     ├─ For each user:                                          │
│     │  └─ Count portfolios: Portfolio.countDocuments()         │
│     └─ Add portfolioCount to each user                         │
│  ↓                                                              │
│  9. Response sent back to frontend                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
        ↓ HTTP Response with JSON data
┌─ FRONTEND ──────────────────────────────────────────────────────┐
│                                                                 │
│  10. axios resolves with data                                  │
│  ↓                                                              │
│  11. setUsers(response.data.data)                              │
│  ↓                                                              │
│  12. Table renders with all users                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow 2: View Single User Details

```
┌─ FRONTEND ──────────────────────────────────────────────────────┐
│                                                                 │
│  1. User clicks "View" button on table row                     │
│  ↓                                                              │
│  2. handleUserClick(user) called                               │
│  ↓                                                              │
│  3. setSelectedUser(user) - Store user data                   │
│  ↓                                                              │
│  4. setShowUserModal(true) - Show modal                        │
│  ↓                                                              │
│  5. Modal displays user details from local state               │
│  ↓                                                              │
│  6. User clicks "Close" or × button                            │
│  ↓                                                              │
│  7. setShowUserModal(false) - Modal closes                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow 3: Fetch Dashboard Statistics

```
┌─ FRONTEND ──────────────────────────────────────────────────────┐
│                                                                 │
│  1. AdminDashboard mounts                                       │
│  ↓                                                              │
│  2. axios.get('/api/admin/stats') called                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
        ↓ HTTP Request
┌─ BACKEND ───────────────────────────────────────────────────────┐
│                                                                 │
│  3. Controller: getDashboardStats()                            │
│     ├─ Count: User.countDocuments()                            │
│     ├─ Count: User.countDocuments({ role: 'admin' })          │
│     ├─ Count: Portfolio.countDocuments()                       │
│     └─ Count: User.countDocuments({ isActive: true })          │
│  ↓                                                              │
│  4. Return stats object                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
        ↓ HTTP Response
┌─ FRONTEND ──────────────────────────────────────────────────────┐
│                                                                 │
│  5. setStats(response.data.data)                               │
│  ↓                                                              │
│  6. Statistics cards render with numbers                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication & Authorization Flow

```
                    LOGIN (admin@gmail.com / Admin123)
                              ↓
                    ┌─────────────────────────┐
                    │ JWT Token Generated     │
                    │ role: 'admin'           │
                    │ id: user._id            │
                    └─────────────────────────┘
                              ↓
                    Stored in localStorage
                              ↓
                    Added to API request headers:
                    Authorization: Bearer <token>
                              ↓
    ┌───────────────────────────────────────────────────────┐
    │ Backend receives request                              │
    ├───────────────────────────────────────────────────────┤
    │                                                       │
    │ Middleware: protect()                                │
    │ ├─ Extract token from header                         │
    │ ├─ Verify token signature ✓                          │
    │ ├─ Decode token → get user ID                        │
    │ ├─ Fetch user from DB                                │
    │ └─ Attach user to request (req.user)                 │
    │                                                       │
    │ Middleware: authorize('admin')                       │
    │ ├─ Check: req.user.role === 'admin'? ✓              │
    │ ├─ If NO → Return 403 Forbidden                      │
    │ └─ If YES → Continue to controller                   │
    │                                                       │
    │ Controller: Process request                          │
    │                                                       │
    │ Response: Send data back to admin                    │
    │                                                       │
    └───────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User (admin@gmail.com)
│
├─ Login with credentials
│  └─→ JWT token received
│
├─ Navigate to "/admin"
│  └─→ PrivateAdminRoute checks role
│
├─ AdminDashboard loads
│  └─→ useEffect triggers 2 API calls
│
├─→ API Call 1: /api/admin/stats
│  ├─ Counts: totalUsers, totalAdmins, totalPortfolios, totalActiveUsers
│  └─ Renders: 4 statistics cards
│
├─→ API Call 2: /api/admin/users
│  ├─ Fetches all users
│  ├─ Counts portfolios per user
│  └─ Renders: Users table with 7 columns
│
├─ User Interactions
│  ├─ Click user count card → Scroll to table
│  ├─ Click "View" button → Show user details modal
│  └─ Click "Close" → Hide modal
│
└─ Modal displays
   ├─ User info (name, email, dates)
   ├─ Portfolio count
   └─ List of portfolios with creation dates
```

---

## Component Hierarchy

```
App.js
│
├─ Route: /admin
│  └─ PrivateAdminRoute
│     └─ AdminDashboard
│        ├─ Layout (wrapper with navigation)
│        │  └─ NavBar (with Admin Panel link)
│        │
│        ├─ Statistics Cards (motion animated)
│        │  ├─ Total Users Card (clickable)
│        │  ├─ Total Admins Card
│        │  ├─ Total Portfolios Card
│        │  └─ Active Users Card
│        │
│        ├─ Users Table
│        │  ├─ Table Header
│        │  └─ Table Body (mapped user rows)
│        │     ├─ Name column
│        │     ├─ Email column
│        │     ├─ Joined Date column
│        │     ├─ Portfolios column (badge)
│        │     ├─ Status column (badge)
│        │     ├─ Role column (badge)
│        │     └─ View button
│        │
│        └─ User Details Modal (conditional)
│           ├─ User Header (name, email)
│           ├─ Stats Grid (dates, counts, status)
│           ├─ Portfolios List
│           │  └─ Portfolio items (mapped)
│           └─ Close button
```

---

## State Management Flow

```
AdminDashboard Component State:

┌─────────────────────────────────┐
│ stats: { ... }                  │  ← Dashboard statistics
│ users: [ ... ]                  │  ← All users array
│ selectedUser: { ... }           │  ← Clicked user object
│ loading: boolean                │  ← Loading state
│ showUserModal: boolean          │  ← Modal visibility
└─────────────────────────────────┘
        ↑       ↑       ↑
        │       │       │
        │       │       └─ handleUserClick(user)
        │       │           setSelectedUser(user)
        │       │           setShowUserModal(true)
        │       │
        │       └─ useEffect() on mount
        │           axios.get('/api/admin/stats')
        │           axios.get('/api/admin/users')
        │           setStats(data)
        │           setUsers(data)
        │           setLoading(false)
        │
        └─ Redux Auth State
            { user: { role: 'admin' } }
```

---

## Security Layers

```
┌─ Layer 1: Frontend Route Protection ─────────────────┐
│ PrivateAdminRoute component                         │
│ ├─ Check: isAuthenticated?                         │
│ ├─ Check: user.role === 'admin'?                   │
│ └─ Redirect to /dashboard if not authorized        │
└────────────────────────────────────────────────────┘
        ↓
┌─ Layer 2: JWT Token Validation ──────────────────────┐
│ Backend: protect() middleware                       │
│ ├─ Extract token from Authorization header          │
│ ├─ Verify token signature with JWT_SECRET           │
│ ├─ Decode token to get user ID                      │
│ └─ Fetch user from database                         │
└────────────────────────────────────────────────────┘
        ↓
┌─ Layer 3: Role-Based Authorization ──────────────────┐
│ Backend: authorize('admin') middleware              │
│ ├─ Check: req.user.role === 'admin'?               │
│ ├─ Return 403 Forbidden if not admin                │
│ └─ Allow request to continue if authorized          │
└────────────────────────────────────────────────────┘
        ↓
┌─ Layer 4: Data Privacy ──────────────────────────────┐
│ Backend: Query.select('-password -refreshToken')    │
│ └─ Never send sensitive data in API responses       │
└────────────────────────────────────────────────────┘
```

---

This architecture ensures secure, efficient, and scalable admin functionality!
