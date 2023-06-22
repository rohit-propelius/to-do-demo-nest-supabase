import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const token = req.headers.authorization.split(' ')[1]
    const {data: user, error} = await this.supabaseService.client.auth.getUser(token)

    if(error)
      throw new UnauthorizedException()

    return user
  }
}
