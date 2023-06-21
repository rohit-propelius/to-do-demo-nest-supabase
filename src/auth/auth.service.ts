import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { RegisterDto } from 'src/auth/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly supabaseService: SupabaseService
    ){}

    async register(body: RegisterDto){
        return this.supabaseService.client.auth.signUp({
            email: body.email,
            password: body.password,
            phone: body.contactNumber,
        })
    }
}
