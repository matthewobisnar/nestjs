import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class TokenResponseDto {

  @ApiProperty({name: "access_token"})
  accessToken: string

  @IsString()
  @ApiProperty({name: "refresh_token"})
  refreshToken: string
}