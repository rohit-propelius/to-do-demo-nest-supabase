import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    client: SupabaseClient;

    constructor(){
        this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    }
}
