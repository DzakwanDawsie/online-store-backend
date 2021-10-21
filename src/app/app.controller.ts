import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { ResponseService } from '../response/response.service';
import { Response, ResponseStatusCode } from '../response/response.decorator';
import { IResponse } from '../response/response.interface';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('/')
export class AppController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly appService: AppService,
  ) {}

  @Get('/public/uploads/:filename')
  invoke(@Req() req, @Res() res) {
    return res.sendFile(req.path, { root: './' });
  }
}
