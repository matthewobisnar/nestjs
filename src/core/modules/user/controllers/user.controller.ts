import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { SwaggerExceptionResponseDto } from 'src/shared/configs/swagger/swagger.exception.response.dto';
import { UserService } from '../services/user/user.service';
import { SignupUserRequestDto } from 'src/shared/dtos/signup.user.request.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Profile')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @ApiOkResponse()
    @ApiBearerAuth()
    @Get('profile/:id')
    @Roles(["USER", "ADMIN"])
    // @UseGuards(AuthGuard('jwt'), AuthJwtGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    getUserProfile(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Get('/all')
    @Roles(["USER"])
    // @UseGuards(AuthGuard('jwt'), AuthJwtGuard)   
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    getUsers() {
        return this.userService.getUsers();
    }

    @Post('/signup')
    @ApiCreatedResponse()
    @ApiBadRequestResponse({type: SwaggerExceptionResponseDto})
    signup(@Body() body: SignupUserRequestDto) {
       return this.userService.registerUser({...body});
    }

}
