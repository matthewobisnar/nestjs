import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../../services/authentication.service";

@Injectable()
export class StrategyLocal extends PassportStrategy(Strategy) {

  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {

    const user = await this.authenticationService.authenticate(
      username, 
      password
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;

  }
}