import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(userId: string, location?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckIn = await this.prisma.attendance.findFirst({
      where: {
        userId,
        checkIn: {
          gte: today,
        },
      },
    });

    if (existingCheckIn) {
      throw new BadRequestException('Already checked in today');
    }

    return this.prisma.attendance.create({
      data: {
        userId,
        location,
      },
    });
  }

  async getUserAttendance(userId: string) {
    return this.prisma.attendance.findMany({
      where: { userId },
      orderBy: { checkIn: 'desc' },
    });
  }

  async getAllAttendance() {
    return this.prisma.attendance.findMany({
      orderBy: { checkIn: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
