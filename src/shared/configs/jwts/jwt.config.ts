import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConfig implements JwtOptionsFactory {

    constructor(private readonly config: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            global: this.config.get<boolean>('JWT_IS_GLOBAL'),
            secret: this.config.get<string>('JWT_SECRET'),
            signOptions: { 
                expiresIn: this.config.get<string>('JWT_EXPIRATION') 
            },
        };
    }
}