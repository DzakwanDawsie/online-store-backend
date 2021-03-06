import { Global, Module } from '@nestjs/common';
import { ResponseService } from './response.service';

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
  imports: [],
})
export class ResponseModule {}
