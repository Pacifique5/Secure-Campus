import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LogsService } from './logs.service';

@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Get()
  async getAllLogs(@Req() req: any, @Query('limit') limit?: string) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.logsService.findAll(limit ? parseInt(limit) : 100);
  }

  @Get('suspicious')
  async getSuspiciousLogs(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.logsService.findSuspicious();
  }

  @Get('my-activity')
  async getMyLogs(@Req() req: any) {
    return this.logsService.findByUser(req.user.userId);
  }
}
