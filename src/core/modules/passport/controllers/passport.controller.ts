import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { SwaggerExceptionResponseDto } from 'src/shared/configs/swagger/swagger.exception.response.dto';
import { PassportService } from '../services/passport/passport.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthJwtGuard } from '../strategies/jwt/auth.jwt.guard';
import { UserService } from '../../user/services/user/user.service';
@ApiTags('Passport Authentication')
@Controller('passport')
export class PassportController {

    constructor(
        private readonly passportService: PassportService,
        private readonly userService: UserService
    ) {}

    @Post('/jwt/signin')
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    jwtAuthenticateUser (@Body() body: SigninUserRequestDto, @Req() req) {
        return this.passportService.authenticatedUserWithJwt(req.user);
    }

    @ApiBearerAuth()
    @Roles(["USER", "ADMIN"])
    @UseGuards(AuthGuard('jwt'), AuthJwtGuard)
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @Get('/protected/user/:id')
    getUserProfile(@Param('id') id: number, @Req() req) {
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @Roles(["ADMIN"])
    @UseGuards(AuthGuard('jwt'), AuthJwtGuard)
    @ApiCreatedResponse()
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @Get('/protected/profile/all')
    getUsersProfile() {
        return this.userService.getUsers();
    }

}
