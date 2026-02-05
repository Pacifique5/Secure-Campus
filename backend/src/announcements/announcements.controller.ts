import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnnouncementsService } from './announcements.service';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementsService: AnnouncementsService) {}

  @Get()
  async getAll() {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: { title: string; content: string }, @Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.announcementsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.announcementsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.announcementsService.delete(id);
  }
}
