import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { IsAuthenticateGuard } from 'src/shared/guards/is.authenticate.guard';
import { IsAuthorizedGuard } from 'src/shared/guards/is.authorized.guard';
import { SwaggerExceptionResponseDto } from 'src/shared/swagger/swagger.exception.response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    
    @Get('profile/:id')
    getUserProfile(@Param('id') id: string) {
        return id;
    }

    @ApiBearerAuth()
    @ApiOkResponse()
    @Roles(["ADMIN", "USER"])
    @Get('/role/profile/:id')
    @UseGuards(IsAuthenticateGuard, IsAuthorizedGuard)
    @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
    @ApiForbiddenResponse({ type: SwaggerExceptionResponseDto })
    getUserRole(@Param('id') id: string) {
        return "Hello world";
    }

}
