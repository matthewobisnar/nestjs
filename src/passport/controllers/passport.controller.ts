import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { SwaggerExceptionResponseDto } from 'src/shared/swagger/swagger.exception.response.dto';
import { SignatureDeclaration } from 'typescript';
import { AuthLocalGuard } from '../strategies/local/auth.local.guard';

@ApiTags('passport authentication')
@Controller('passport')
export class PassportController {


    @Post('/local/signin')
    @UseGuards(AuthGuard('local'))
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    localAuthenticateUser (@Body() body: SigninUserRequestDto) {
        return body;
    }

    @Post('/jwt/signin')
    // @UseGuards(AuthGuard('local'))
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    jwtAuthenticateUser (@Body() body: SigninUserRequestDto) {
        return body;
    }
}
