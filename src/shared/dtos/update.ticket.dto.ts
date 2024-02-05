import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTicketDto {
    @IsString()
 
    @IsOptional()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    status: number
    
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    assignee: number

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    description: string
}