import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { IsAuthenticateGuard } from 'src/shared/guards/is.authenticate.guard';
import { IsAuthorizedGuard } from 'src/shared/guards/is.authorized.guard';
import { SwaggerExceptionResponseDto } from 'src/shared/swagger/swagger.exception.response.dto';
import { UserService } from '../services/user/user.service';

@ApiTags('user')
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
    getUserProfile(@Param('id') id: string) {
        return id;
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
