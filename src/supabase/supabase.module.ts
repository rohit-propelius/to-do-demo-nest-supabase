import { Module } from '@nestjs/common';
import { SupabaseController } from './supabase.controller';
import { SupabaseService } from './supabase.service';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Module({
  controllers: [SupabaseController],
  providers: [SupabaseService],
  exports: [SupabaseService]
})
export class SupabaseModule {}
