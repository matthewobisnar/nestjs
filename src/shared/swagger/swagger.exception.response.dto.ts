import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SwaggerExceptionResponseDto {

    @ApiProperty()
    message: string;

    @ApiProperty()
    error : string;

    @ApiProperty()
    statusCode: number;
}