import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.log.create({ data });
  }

  async findAll(limit = 100) {
    return this.prisma.log.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
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

  async findSuspicious() {
    return this.prisma.log.findMany({
      where: {
        OR: [
          { action: 'FAILED_LOGIN' },
          { action: 'SUSPICIOUS_ACTIVITY' },
        ],
      },
      orderBy: { timestamp: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.log.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
