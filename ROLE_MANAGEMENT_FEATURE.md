# 🔄 Role Management Feature - Admin Panel

## New Feature: Interactive Role Switching

You can now click on any user's role badge in the admin panel to change their role between "User" and "Admin" with a confirmation popup.

---

## How to Use

### Step 1: View Users Table
1. Login as admin
2. Go to Admin Panel
3. Scroll to the "Users List" table

### Step 2: Click on Role Badge
```
┌──────────────────────────────────┐
│ User Role Column                 │
├──────────────────────────────────┤
│                                  │
│  [User] ← Click to change        │
│  or                              │
│  [Admin] ← Click to change       │
│                                  │
└──────────────────────────────────┘
```

### Step 3: Confirm Role Change
A popup will appear:
```
┌──────────────────────────────────────┐
│ Change User Role?                    │
│                                      │
│ Are you sure you want to change      │
│ "John Doe"'s role?                   │
│                                      │
│ Current Role: User                   │
│ New Role: Admin                      │
│                                      │
│ ⚠️ This user will gain full admin    │
│    access to the platform.           │
│                                      │
│ [Cancel]  [Confirm]                 │
└──────────────────────────────────────┘
```

### Step 4: Click Confirm
- Click "Confirm" to change the role
- Click "Cancel" to cancel the change
- The table will update automatically
- Toast notification shows success/error

---

## Features

### ✅ Visual Feedback
- Role button changes color on hover
- Purple for Admin, Gray for User
- Cursor changes to pointer
- Tooltip on hover: "Click to change role"

### ✅ Confirmation Modal
- Shows user name
- Shows current role and new role
- Warning message if promoting to admin
- Cancel and Confirm buttons
- Loading state while updating

### ✅ Real-time Updates
- Table updates immediately after confirmation
- Statistics re-calculated (admin count updated)
- User details modal also updates if open
- Toast notification shows result

### ✅ Safety Features
- Cannot remove your own admin role (prevents lockout)
- Invalid role values rejected
- Error messages shown for failures
- Confirmation required for every change

---

## Backend API

### Endpoint
```
PUT /api/admin/users/:id/role
```

### Request
```json
{
  "role": "admin" | "user"
}
```

### Response - Success
```json
{
  "success": true,
  "message": "User role updated to admin",
  "data": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

### Response - Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Error Cases
1. Invalid role value → 400 Bad Request
2. User not found → 404 Not Found
3. Trying to remove own admin role → 403 Forbidden
4. Authentication failed → 401 Unauthorized
5. Not admin → 403 Forbidden

---

## What Changed

### Frontend Changes
1. **AdminDashboard.js** - Added:
   - New state: `roleChangeModal`, `updatingRole`
   - New function: `handleRoleClick()`, `confirmRoleChange()`
   - Role button instead of role badge
   - Role change confirmation modal
   - Auto-refresh of stats after role change

2. **Imports** - Added:
   - `toast` from 'react-hot-toast'

### Backend Changes
1. **adminControllerV2.js** - Added:
   - New function: `updateUserRole()`
   - Role validation
   - Safety check (can't remove own admin)
   - User update and response

2. **adminRoutesV2.js** - Added:
   - New route: `PUT /api/admin/users/:id/role`
   - Connected to `updateUserRole` controller

---

## Example Workflow

### Scenario 1: Promote User to Admin
```
1. Click on "User" badge for John Doe
2. Modal appears showing:
   - Current Role: User
   - New Role: Admin
   - ⚠️ Warning message
3. Click "Confirm"
4. Toast shows: "John Doe role changed to admin"
5. Table updates: John's role now shows as [Admin]
6. Admin count in stats card increases by 1
```

### Scenario 2: Demote Admin to User
```
1. Click on "Admin" badge for Jane Smith
2. Modal appears showing:
   - Current Role: Admin
   - New Role: User
3. Click "Confirm"
4. Toast shows: "Jane Smith role changed to user"
5. Table updates: Jane's role now shows as [User]
6. Admin count in stats card decreases by 1
```

### Scenario 3: Safety Protection
```
1. You are admin@gmail.com (admin)
2. Click on your own "Admin" badge
3. Modal shows you want to change to "User"
4. Click "Confirm"
5. Error: "Cannot remove your own admin role"
6. Your role stays as Admin (protected!)
```

---

## Visual Indicators

### Role Button States

**Normal (User)**
```
[User] ← Gray background, gray text
```

**Normal (Admin)**
```
[Admin] ← Purple background, purple text
```

**Hover (User)**
```
[User] ← Lighter gray on hover, clickable
```

**Hover (Admin)**
```
[Admin] ← Lighter purple on hover, clickable
```

**Loading**
```
[Confirm] → Changes to "Updating..." with disabled state
```

---

## Security

✅ **Backend Validation**
- Only admins can change roles
- Invalid roles rejected
- User existence verified

✅ **Safety Checks**
- Cannot remove own admin role
- JWT token required
- Role check on every request

✅ **User Protection**
- Confirmation required
- Clear messaging about changes
- Warning when promoting to admin
- Toast notifications for feedback

---

## Files Modified

```
✅ frontend/src/pages/AdminDashboard.js
   - Added: roleChangeModal state
   - Added: updatingRole state  
   - Added: handleRoleClick() function
   - Added: confirmRoleChange() function
   - Modified: Role column to button
   - Added: Role change confirmation modal

✅ backend/controllers/adminControllerV2.js
   - Added: updateUserRole() function

✅ backend/routes/adminRoutesV2.js
   - Added: PUT /api/admin/users/:id/role route
```

---

## Testing the Feature

### Test 1: Basic Role Change
1. Click on any user's role badge
2. Confirm the modal
3. Verify role updates in table

### Test 2: Multiple Changes
1. Change user to admin
2. Immediately change admin back to user
3. Verify both operations work

### Test 3: Stats Update
1. Note the "Total Admins" count
2. Change user to admin
3. Verify count increases by 1

### Test 4: Safety Protection
1. Get your own user ID
2. Try to change your role from admin to user
3. Verify you get error message

### Test 5: Modal Details
1. Open role confirmation modal
2. Verify current role shows correctly
3. Verify new role shows correctly
4. Verify warning appears for admin promotion

---

## Keyboard & Accessibility

- Role buttons are tab-accessible
- Modal buttons can be navigated with Tab
- Escape key could close modal (enhancement)
- Clear visual feedback for all states
- Semantic HTML buttons

---

## Performance

- Single API call per role change
- Stats fetched once after change
- Users list updated in frontend (no full reload)
- Modal animation smooth (300ms)
- Loading state prevents double-click

---

## Error Handling

All errors are caught and displayed:
- Invalid role → "Invalid role" message
- User not found → "User not found" message
- Own admin removal → "Cannot remove your own admin role"
- Network error → Connection error message
- Server error → Generic error message

---

## Enhancement Ideas

Optional future improvements:
- Bulk role changes
- Role history/audit log
- Scheduled role changes
- Role expiration
- Multiple admin levels (super-admin, moderator)
- API to assign other roles programmatically

---

## Quick Reference

### Button States
```
Normal     → Gray (user) or Purple (admin)
Hover      → Lighter shade, clickable
Disabled   → 50% opacity during update
```

### Modal States
```
Open       → Centered, semi-transparent overlay
Confirmed  → Closes, table updates
Cancelled  → Closes without changes
Error      → Shows error message
```

### Stats Update
```
Before: Total Admins = 2
Change user to admin
After: Total Admins = 3 (auto-updated)
```

---

## Support

If role change doesn't work:
1. Check browser console for errors
2. Verify you're logged in as admin
3. Check network tab for API response
4. Verify user ID in database
5. Check backend logs for errors

---

**Your admin panel now has powerful role management!** 🎉
