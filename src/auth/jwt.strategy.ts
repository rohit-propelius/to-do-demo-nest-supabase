import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/types';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private supabaseService: SupabaseService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { email, sub: userUId } = payload
    console.log(payload)
    const user = await this.supabaseService.client
        .auth
        .admin
        .getUserById(userUId)
        // .from('users')
        // .select('*')
        // .eq('id', userUId)
        // .eq('email', email)
        // .single()
        
    console.log('user :: :: :: :: :: :: ')
    console.log(user)

    // if (!user) {}

    return user;
  }
}
