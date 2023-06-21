import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";


export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber("IN")
    contactNumber: string
}