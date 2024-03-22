import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtAccessConfig } from "src/shared/configs/jwts/jwt.access.config";

@Injectable()
export class AuthStrategyJwt extends PassportStrategy(Strategy) {

  constructor(private jwtAccessConfig: JwtAccessConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAccessConfig.createJwtOptions().secret,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}