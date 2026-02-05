# SecureCampus Backend

NestJS API with PostgreSQL and Prisma ORM.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

3. Update DATABASE_URL in `.env` with your PostgreSQL credentials

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run migrations:
```bash
npm run prisma:migrate
```

6. Start development server:
```bash
npm run start:dev
```

API will run on http://localhost:3000

## API Endpoints

### Auth
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user

### Users
- GET `/users/me` - Get current user profile
- GET `/users` - Get all users (Admin only)

### Attendance
- POST `/attendance/check-in` - Check in
- GET `/attendance/my-attendance` - Get my attendance history
- GET `/attendance/all` - Get all attendance (Admin only)

### Logs
- GET `/logs` - Get all logs (Admin only)
- GET `/logs/suspicious` - Get suspicious activity (Admin only)
- GET `/logs/my-activity` - Get my activity logs

### Announcements
- GET `/announcements` - Get all announcements
- POST `/announcements` - Create announcement (Admin only)
- PUT `/announcements/:id` - Update announcement (Admin only)
- DELETE `/announcements/:id` - Delete announcement (Admin only)
