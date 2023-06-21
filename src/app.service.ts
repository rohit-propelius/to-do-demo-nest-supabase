import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  constructor(
  ){}
  async getHello() {
    return {
      message:'Hello World! Welcome to To Do demo.'
    };
  }
}
