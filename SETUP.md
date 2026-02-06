# SecureCampus - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL (running on localhost:5432)
- PostgreSQL user: `postgres` (no password)

### Installation & Running

1. **Backend Setup**
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```
Backend runs on: **http://localhost:3001**

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: **http://localhost:3000**

## 🎨 Features

### Landing Page
- ✨ Smooth animations and transitions
- 📊 Live analytics dashboard preview
- 👥 Team section
- 📞 Complete contact information
- 🎯 Responsive design

### Authentication
- 🔐 Secure login/register
- 🔑 JWT token-based authentication
- 👤 Role-based access (Admin, Staff, Student)
- 🔄 Auto-redirect based on user role

### Backend API
- **Auth**: `/auth/login`, `/auth/register`
- **Users**: `/users/me`, `/users`
- **Attendance**: `/attendance/check-in`, `/attendance/my-attendance`, `/attendance/all`
- **Logs**: `/logs`, `/logs/suspicious`, `/logs/my-activity`
- **Announcements**: `/announcements` (CRUD operations)

## 🎨 Design System

### Colors
- Primary: Blue (#2563eb)
- Secondary: Indigo (#4f46e5)
- Accent: Purple (#7c3aed)

### Animations
- Blob animations for backgrounds
- Fade-in-up for content
- Smooth hover transitions
- Loading spinners

## 🔧 Configuration

### Backend (.env)
```
DATABASE_URL="postgresql://postgres@localhost:5432/securecampus"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
```

### Frontend
API URL is automatically set to `http://localhost:3001`

## 📱 User Flow

1. **Landing Page** → View features, analytics, team
2. **Register/Login** → Create account or sign in
3. **Dashboard** → Redirected based on role:
   - Admin → `/admin`
   - Student/Staff → `/dashboard`

## 🎯 Next Steps

- Implement dashboard pages
- Add real-time notifications
- Integrate attendance tracking UI
- Build admin panel features
- Add profile management

## 🐛 Troubleshooting

**Port conflicts?**
- Backend uses port 3001
- Frontend uses port 3000
- Make sure both ports are available

**Database connection issues?**
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Run migrations: `npm run prisma:migrate`

**CORS errors?**
- Backend is configured to allow `localhost:3000`
- Check `backend/src/main.ts` CORS settings

## 📚 Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport.js

---

Built with ❤️ for campus security and management
