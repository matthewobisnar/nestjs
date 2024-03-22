import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SigninUserRequestDto {

    @IsEmail()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string
}