import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {
  AccountBuyCourse,
  AccountLogin,
  AccountRegister,
  AccountUserCourses,
  AccountUserInfo,
} from '@monorepo/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { GetInfoDto } from '../dtos/get-info';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('info')
  async getUserInfo(@Body() dto: GetInfoDto) {
    try {
      return await this.rmqService.send<
        AccountUserInfo.Request,
        AccountUserInfo.Response
      >(AccountUserInfo.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('courses-info')
  async getUserCoursesInfo(@Body() dto: GetInfoDto) {
    try {
      return await this.rmqService.send<
        AccountUserCourses.Request,
        AccountUserCourses.Response
      >(AccountUserCourses.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('buy-course')
  async buyCourse() {
    try {
      return await this.rmqService.send<
        AccountBuyCourse.Request,
        AccountBuyCourse.Response
      >(AccountBuyCourse.topic, {
        userId: '671a2e5b353f331048d13dd8',
        courseId: '',
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
