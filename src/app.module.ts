import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { NormalExceptionFilter } from 'src/filters/normal-exception.filter';
import { ValidationExceptionFilter } from 'src/filters/validator-exception.filter';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

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
    { provide: APP_INTERCEPTOR, 
      useClass: ResponseInterceptor 
    },
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (): SupabaseClient =>
        createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY),
    }
  ],
})
export class AppModule {}
