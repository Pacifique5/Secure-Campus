# 🔐 SecureCampus - Complete Testing Guide

## 📋 Quick Reference - Login Credentials

### 👑 Admin Account
```
Email: admin@securecampus.com
Password: admin123
Dashboard: http://localhost:3000/admin
```

### 👨‍🏫 Staff Account
```
Email: staff@securecampus.com
Password: admin123
Dashboard: http://localhost:3000/dashboard
```

### 👨‍🎓 Student Account
```
Email: student@securecampus.com
Password: admin123
Dashboard: http://localhost:3000/dashboard
```

---

## 🚀 Setup Instructions

### 1. Start Backend Server
```bash
cd backend
npm run start:dev
```
✅ Backend will run on: **http://localhost:3001**

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```
✅ Frontend will run on: **http://localhost:3000**

### 3. Seed Database (First Time Only)
```bash
cd backend
npm run prisma:seed
```
✅ Creates admin, staff, and student accounts

---

## 🎯 Testing Each Role

### 👑 ADMIN DASHBOARD - Full System Control

**Login:** `admin@securecampus.com` / `admin123`

#### Features to Test:

1. **📊 Dashboard Overview**
   - View total users by role
   - Check active sessions
   - Monitor failed login attempts
   - Review threat level status

2. **🔐 Security Command Center** (`/admin/security`)
   - View live security alerts
   - Configure intrusion detection rules
   - Block suspicious IP addresses
   - Monitor brute-force attempts
   - Set max login attempts
   - Configure session duration

3. **👥 User Management** (`/admin/users`)
   - View all users (Admin, Staff, Students)
   - Create new users with role assignment
   - Disable user accounts
   - Force password reset
   - View user activity timeline
   - Search and filter by role

4. **📜 Audit Logs** (Coming Soon)
   - View all system activities
   - Filter by user, date, action type
   - Export logs

5. **📢 Announcements** (Coming Soon)
   - Create emergency broadcasts
   - Schedule announcements
   - Target by role or department

---

### 👨‍🏫 STAFF DASHBOARD - Student Management

**Login:** `staff@securecampus.com` / `admin123`

#### Features to Test:

1. **📊 Dashboard Overview**
   - View assigned classes
   - Check students present today
   - Review pending approvals
   - Monitor security notifications

2. **✅ Attendance Management** (`/dashboard/attendance`)
   - View class attendance
   - Manual attendance corrections
   - Export attendance reports
   - Flag suspicious check-ins

3. **👥 Student Management** (`/dashboard/students`)
   - View all student profiles
   - Check attendance performance
   - View student details
   - Monitor student activity
   - Send messages to students
   - Generate student reports

4. **📢 Announcements** (`/dashboard/announcements`)
   - Create announcements
   - Schedule announcements
   - Target specific classes
   - Track who read announcements

5. **🔒 Security Activity** (`/dashboard/security`)
   - View login history
   - Monitor security alerts
   - Report suspicious activity

---

### 👨‍🎓 STUDENT DASHBOARD - Personal Portal

**Login:** `student@securecampus.com` / `admin123`

#### Features to Test:

1. **📊 Dashboard Overview**
   - View attendance percentage
   - Check missed sessions
   - See upcoming events
   - View new announcements

2. **✅ Attendance Module** (`/dashboard/attendance`)
   - **Check-in button** - Mark attendance
   - **Attendance calendar** - Visual calendar view
   - **Attendance history** - Table with all records
   - **Download report** - Export as PDF
   - View attendance status (Present/Late/Absent)

3. **📢 Announcements** (`/dashboard/announcements`)
   - View all announcements
   - Search announcements
   - Filter by priority (Urgent/Normal)
   - Mark as read/unread
   - See read status

4. **🔒 Security Activity** (`/dashboard/security`)
   - View login history with:
     - Time and date
     - IP address
     - Device information
   - Security alerts:
     - New device login detected
     - Multiple failed login attempts
   - Report suspicious activity button

5. **👤 Profile & Settings** (`/dashboard/profile`)
   - Update profile information
   - Change password
   - Enable Two-Factor Authentication (2FA)
   - Configure login notifications
   - View account permissions

6. **💬 Support & Feedback** (`/dashboard/support`)
   - Submit issue tickets
   - View ticket status
   - Track ticket history
   - Report system abuse

---

## 🧪 Test Scenarios

### Scenario 1: Student Check-In Flow
1. Login as student
2. Go to Attendance page
3. Click "Check In Now" button
4. Verify success message
5. Check attendance history table
6. View calendar for visual confirmation

### Scenario 2: Staff Managing Students
1. Login as staff
2. Go to Students page
3. Search for a student
4. Click on student card
5. View detailed attendance performance
6. Check recent activity
7. Send message or generate report

### Scenario 3: Admin Security Monitoring
1. Login as admin
2. Go to Security Command Center
3. Review live security alerts
4. Click "Block IP" on suspicious activity
5. Configure intrusion detection rules
6. Set max login attempts to 3
7. Enable auto-lock accounts
8. Save rules

### Scenario 4: Admin User Management
1. Login as admin
2. Go to User Management
3. Click "Create User"
4. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Role: Student
5. Click "Create User"
6. Verify user appears in list
7. Test disable/reset password actions

### Scenario 5: Cross-Role Announcement Flow
1. **Admin creates announcement:**
   - Login as admin
   - Create urgent announcement
2. **Staff views announcement:**
   - Login as staff
   - See announcement in dashboard
3. **Student reads announcement:**
   - Login as student
   - View announcement
   - Mark as read

---

## 🔍 What to Look For

### ✅ UI/UX Testing
- [ ] Sidebar is fixed (doesn't scroll with page)
- [ ] Smooth transitions and animations
- [ ] Responsive design on different screen sizes
- [ ] Loading states display correctly
- [ ] Error messages are clear and helpful
- [ ] Success messages appear and disappear
- [ ] Modal dialogs open and close smoothly

### ✅ Functionality Testing
- [ ] Login redirects to correct dashboard by role
- [ ] Logout clears session and redirects to login
- [ ] Check-in creates attendance record
- [ ] Search and filters work correctly
- [ ] Data loads from backend API
- [ ] Forms validate input properly
- [ ] Buttons trigger correct actions

### ✅ Security Testing
- [ ] Cannot access admin pages as student/staff
- [ ] Cannot access staff pages as student
- [ ] Session expires after logout
- [ ] Failed login attempts are logged
- [ ] Password requirements enforced (min 8 chars)

---

## 🐛 Known Issues / Limitations

1. **Mock Data:** Some features use simulated data (will be replaced with real API calls)
2. **PDF Export:** Currently shows alert (needs implementation)
3. **Email Notifications:** Not yet implemented
4. **2FA:** UI ready, backend integration pending

---

## 📊 API Endpoints Reference

### Authentication
- `POST /auth/register` - Create new user
- `POST /auth/login` - User login

### Users
- `GET /users` - Get all users (Admin only)
- `GET /users/me` - Get current user

### Attendance
- `POST /attendance/check-in` - Check in
- `GET /attendance/my-attendance` - Get my records
- `GET /attendance/all` - Get all records (Admin/Staff)

### Announcements
- `GET /announcements` - Get all announcements
- `POST /announcements` - Create announcement (Admin/Staff)

### Logs
- `GET /logs` - Get all logs (Admin)
- `GET /logs/my-activity` - Get my activity
- `GET /logs/suspicious` - Get suspicious activities

---

## 🔄 Reset Everything

If you want to start fresh:

```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

This will:
1. ✅ Drop the database
2. ✅ Recreate all tables
3. ✅ Run migrations
4. ✅ Seed test accounts

---

## 💡 Tips for Testing

1. **Open Multiple Browser Windows:**
   - Window 1: Admin dashboard
   - Window 2: Staff dashboard
   - Window 3: Student dashboard
   - Test interactions between roles

2. **Use Browser DevTools:**
   - Check Network tab for API calls
   - Monitor Console for errors
   - Test responsive design

3. **Test Edge Cases:**
   - Empty search results
   - Long names/emails
   - Special characters
   - Invalid inputs

4. **Performance Testing:**
   - Check page load times
   - Test with many records
   - Monitor memory usage

---

## 🎉 You're Ready to Test!

**Frontend:** http://localhost:3000
**Backend API:** http://localhost:3001
**Database:** PostgreSQL on localhost:5432

### Quick Test Checklist:
- [ ] Login as Admin
- [ ] Login as Staff
- [ ] Login as Student
- [ ] Test attendance check-in
- [ ] View student management (Staff)
- [ ] Check security center (Admin)
- [ ] Create new user (Admin)
- [ ] View announcements (All roles)
- [ ] Test profile settings
- [ ] Submit support ticket

**Happy Testing! 🚀**
