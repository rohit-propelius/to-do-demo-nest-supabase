import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { NormalExceptionFilter } from 'src/filters/normal-exception.filter';
import { ValidationExceptionFilter } from 'src/filters/validator-exception.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NormalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ],
})
export class AppModule {}
