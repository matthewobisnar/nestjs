import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { SwaggerExceptionResponseDto } from 'src/shared/configs/swagger/swagger.exception.response.dto';
import { IsAuthenticateGuard } from '../../authentication/guards/is.authenticate.guard';
import { IsAuthorizedGuard } from '../../authentication/guards/is.authorized.guard';
import { UserService } from '../services/user/user.service';

@ApiTags('User Profile')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN", "USER"])
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    @Get('profile/:id')
    getUserProfile(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN"])
    @Get('/all')
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    getUsers() {
        return this.userService.getUsers();
    }

}
