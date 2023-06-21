import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';

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

    async login(body: LoginDto){
        const {data, error} = await this.supabaseService.client.auth.signInWithPassword({
            ...body
        })

        if(error)
            throw new HttpException(error.message, error.status)

        const accessToken = data.session.access_token

        return {
            user: data.user,
            accessToken
        }
    }
}
