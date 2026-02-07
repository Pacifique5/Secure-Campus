import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@securecampus.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@securecampus.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create Staff User
  const staff = await prisma.user.upsert({
    where: { email: 'staff@securecampus.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@securecampus.com',
      password: hashedPassword,
      role: 'STAFF',
    },
  })
  console.log('✅ Staff user created:', staff.email)

  // Create Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@securecampus.com' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@securecampus.com',
      password: hashedPassword,
      role: 'STUDENT',
    },
  })
  console.log('✅ Student user created:', student.email)

  // Create some sample announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Welcome to SecureCampus!',
        content: 'We are excited to have you on our platform. Please explore all the features available to you.',
      },
      {
        title: 'System Maintenance Scheduled',
        content: 'The system will undergo maintenance on Sunday from 2 AM to 4 AM. Please plan accordingly.',
      },
      {
        title: 'New Security Features',
        content: 'We have added two-factor authentication and enhanced security monitoring. Please enable 2FA in your profile settings.',
      },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Sample announcements created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
