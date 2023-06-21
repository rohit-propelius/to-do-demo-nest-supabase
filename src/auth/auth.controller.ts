import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/auth.dto';

@ApiTags('Auth')
@Controller({
    path:'auth',
    version: '1'  
})
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}


    @Post('/register')
    async register(@Body() body: RegisterDto){
        return this.authService.register(body)
    }
}
