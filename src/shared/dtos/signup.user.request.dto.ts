import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupUserRequestDto {

    @IsString()
    @ApiProperty()
    firstname: string

    @IsString()
    @ApiProperty()
    lastname: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}