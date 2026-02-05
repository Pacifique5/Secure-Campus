import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string }) {
    return this.prisma.announcement.create({ data });
  }

  async findAll() {
    return this.prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.announcement.findUnique({ where: { id } });
  }

  async update(id: string, data: { title?: string; content?: string }) {
    return this.prisma.announcement.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
