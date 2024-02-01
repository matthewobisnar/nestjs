import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

// @Injectable()
// export class AuthJwtStrategy extends PassportStrategy() {

//     constructor(
//         private readonly configService: ConfigService
//     ) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: configService.get<string>('JWT_SECRET'),
//         });
//     }

//     async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//     }
// }