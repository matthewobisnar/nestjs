import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class IsAuthenticateGuard implements CanActivate {

    private static AUTHENTICATION_CONTEXT: string = 'authenticated_user_context';

    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {

            const payload = await this.jwtService.verifyAsync(
              token,
              { secret: this.config.get<string>('JWT_SECRET') }
            );
           
            request[IsAuthenticateGuard.AUTHENTICATION_CONTEXT] = payload;

        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers .authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
     }

}