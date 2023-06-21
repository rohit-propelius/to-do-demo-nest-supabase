import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { NormalExceptionFilter } from 'src/filters/normal-exception.filter';
import { ValidationExceptionFilter } from 'src/filters/validator-exception.filter';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [AuthModule, SupabaseModule],
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
    // {
    //   provide: 'SUPABASE_CLIENT',
    //   useFactory: (): SupabaseClient =>
    //     createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY),
    // },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: errors => {
            return errors
          }
        }),
    },
  ],
})
export class AppModule {}
