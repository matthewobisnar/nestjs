import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory, } from "@nestjs/jwt";

@Injectable()
export class JwtRefreshConfig implements JwtOptionsFactory {

    constructor(private readonly config: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            global: this.config.get<boolean>('JWT_IS_GLOBAL'),
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
            signOptions: { 
                expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRATION') 
            },
        };
    }
}