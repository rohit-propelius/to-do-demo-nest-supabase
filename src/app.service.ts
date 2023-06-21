import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  constructor(
    // @Inject('SUPABASE_CLIENT')
    // private readonly supabaseClient: SupabaseClient
  ){}
  async getHello() {
    // const user = await this.supabaseClient.from('users').select('*');

    return {
      // user,
      message:'Hello World! Welcome to To Do demo.'
    };
  }
}
