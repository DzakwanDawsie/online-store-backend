import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';

import { ResponseModule } from '../response/response.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Configuration from '../config/configuration';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
    }),
    WinstonModule.forRootAsync({
      inject: [LoggerService],
      imports: [LoggerModule],
      useFactory: (loggerService: LoggerService) =>
        loggerService.createLogger(),
    }),
    TypeOrmModule.forRoot(),
    LoggerModule,
    ResponseModule,

    ProductModule,
    UserModule,
    OrderModule,
    AuthModule
  ],
})
export class AppModule {}
