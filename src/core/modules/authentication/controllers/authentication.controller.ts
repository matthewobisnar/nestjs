import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SwaggerExceptionResponseDto } from 'src/shared/configs/swagger/swagger.exception.response.dto';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { LocalAuthGuard } from '../strategies/local/LocalAuthGuard';
import { AuthJwtAccessGuard } from '../strategies/AuthJwt/JwtAuthGuard';
import { TokenResponseDto } from 'src/shared/dtos/token.response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
  @ApiCreatedResponse({ type: TokenResponseDto })
  @ApiBody({ type: SigninUserRequestDto })
  authenticate (@Req() req) {
    return this.authenticationService.signIn(req.user).then(data => data as TokenResponseDto);
  }

  @Post('/instrospect')
  @UseGuards(AuthJwtAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
  introspect(@Req() req) {
    return true;
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: SwaggerExceptionResponseDto })
  refresh(@Req() req) {
    return req;
  }

}
