import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PassportService } from "src/passport/services/passport/passport.service";
import { SigninUserRequestDto } from "src/shared/dtos/signin.user.request.dto";

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {

    constructor(private passportService: PassportService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {

        const loginDto: SigninUserRequestDto = { email, password };
        const user = await this.passportService.validateUser(loginDto);

        if (!user) {
          throw new UnauthorizedException('email or/and password is incorrect.');
        }

        return user;

      }
}