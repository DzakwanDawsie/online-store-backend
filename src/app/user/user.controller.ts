import { Controller, Get, Post, Request, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { ResponseService } from '../../response/response.service';
import { Response, ResponseStatusCode } from '../../response/response.decorator';
import { IResponse } from '../../response/response.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';

@Controller('/user')
export class UserController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  
  @ResponseStatusCode()
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req): Promise<IResponse> {
    const result = await this.authService.login(req.user);
    return this.responseService.success('OK',result);
  }

  @ResponseStatusCode()
  @UseGuards(AuthGuard('jwt'))
  @Post('/profile')
  async profile(@Request() req): Promise<IResponse> {
    const user = await this.userService.findOneById(req.user.id);
    return this.responseService.success('OK',req.user);
  }
  
}
