import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtRefreshConfig } from "src/shared/configs/jwts/jwt.refresh.config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(private jwtRefreshConfig: JwtRefreshConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConfig.createJwtOptions().secret,
    });
  }

  validate(payload: any) {
    // const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload };
  }
}