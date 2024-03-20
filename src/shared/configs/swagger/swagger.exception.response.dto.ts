import { ApiProperty } from "@nestjs/swagger";

export class SwaggerExceptionResponseDto {

    @ApiProperty({type: String})
    message: string;

    @ApiProperty({type: String})
    error : string;

    @ApiProperty({type: String})
    statusCode: number;
}