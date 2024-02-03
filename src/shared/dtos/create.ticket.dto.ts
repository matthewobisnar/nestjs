import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class CreateTicketDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    status: number
    
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    assignee: number

    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    description: string
}