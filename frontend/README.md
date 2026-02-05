# SecureCampus Frontend - Next.js

Next.js 14 application with App Router and Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Server-side rendering (SSR)
- Secure authentication (Login/Register)
- Student Dashboard
  - Profile view
  - Attendance check-in
  - View announcements
  - Attendance history
- Admin Dashboard
  - User management
  - Security logs monitoring
  - Suspicious activity alerts
  - System overview
- Role-based access control
- Client-side route protection

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Axios for API calls
- Tailwind CSS for styling

## Routes

- `/` - Home (redirects based on auth)
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - Student dashboard (protected)
- `/admin` - Admin dashboard (admin only)
