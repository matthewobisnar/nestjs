import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { SignupUserRequestDto } from 'src/shared/dtos/signup.user.request.dto';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SwaggerExceptionResponseDto } from 'src/shared/swagger/swagger.exception.response.dto';

@ApiTags('Custom Authentication')
@Controller('authentication')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {}

    @Post('/signup')
    @ApiCreatedResponse()
    @ApiBadRequestResponse({type: SwaggerExceptionResponseDto})
    signup(@Body() body: SignupUserRequestDto) {
       return this.authenticationService.registerUser({...body});
    }

    @Post('/signin')
    @ApiOkResponse()
    @ApiUnauthorizedResponse({type: SwaggerExceptionResponseDto})
    signin(@Body() body: SigninUserRequestDto) {
        return this.authenticationService.authenticateUser({...body});
    }
}
