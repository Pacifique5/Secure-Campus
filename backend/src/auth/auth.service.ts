import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LogsService } from '../logs/logs.service';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  private loginAttempts = new Map<string, { count: number; lastAttempt: Date }>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logsService: LogsService,
  ) {}

  async register(dto: RegisterDto, ipAddress: string, userAgent: string) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    await this.logsService.create({
      userId: user.id,
      action: 'USER_CREATED',
      ipAddress,
      userAgent,
      details: `User registered: ${user.email}`,
    });

    const { password, ...result } = user;
    return {
      user: result,
      access_token: this.generateToken(user.id, user.email, user.role),
    };
  }

  async login(dto: LoginDto, ipAddress: string, userAgent: string) {
    if (this.isRateLimited(dto.email)) {
      await this.logsService.create({
        action: 'SUSPICIOUS_ACTIVITY',
        ipAddress,
        userAgent,
        details: `Rate limit exceeded for email: ${dto.email}`,
      });
      throw new UnauthorizedException('Too many login attempts. Try again later.');
    }

    const user = await this.validateUser(dto.email, dto.password);
    
    if (!user) {
      this.recordFailedAttempt(dto.email);
      await this.logsService.create({
        action: 'FAILED_LOGIN',
        ipAddress,
        userAgent,
        details: `Failed login attempt for: ${dto.email}`,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    this.clearFailedAttempts(dto.email);
    
    await this.logsService.create({
      userId: user.id,
      action: 'LOGIN',
      ipAddress,
      userAgent,
      details: `Successful login: ${user.email}`,
    });

    const { password, ...result } = user;
    return {
      user: result,
      access_token: this.generateToken(user.id, user.email, user.role),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  private generateToken(userId: string, email: string, role: string) {
    return this.jwtService.sign({ sub: userId, email, role });
  }

  private isRateLimited(email: string): boolean {
    const attempt = this.loginAttempts.get(email);
    if (!attempt) return false;

    const timeDiff = Date.now() - attempt.lastAttempt.getTime();
    if (timeDiff > 15 * 60 * 1000) {
      this.loginAttempts.delete(email);
      return false;
    }

    return attempt.count >= 5;
  }

  private recordFailedAttempt(email: string) {
    const attempt = this.loginAttempts.get(email);
    if (attempt) {
      attempt.count++;
      attempt.lastAttempt = new Date();
    } else {
      this.loginAttempts.set(email, { count: 1, lastAttempt: new Date() });
    }
  }

  private clearFailedAttempts(email: string) {
    this.loginAttempts.delete(email);
  }
}
