import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttendanceService } from './attendance.service';
import { LogsService } from '../logs/logs.service';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(
    private attendanceService: AttendanceService,
    private logsService: LogsService,
  ) {}

  @Post('check-in')
  async checkIn(@Req() req: any, @Body() body: { location?: string }) {
    const attendance = await this.attendanceService.checkIn(
      req.user.userId,
      body.location,
    );

    await this.logsService.create({
      userId: req.user.userId,
      action: 'ATTENDANCE_CHECKED',
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      details: `Check-in at ${body.location || 'campus'}`,
    });

    return attendance;
  }

  @Get('my-attendance')
  async getMyAttendance(@Req() req: any) {
    return this.attendanceService.getUserAttendance(req.user.userId);
  }

  @Get('all')
  async getAllAttendance(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      return { message: 'Unauthorized' };
    }
    return this.attendanceService.getAllAttendance();
  }
}
