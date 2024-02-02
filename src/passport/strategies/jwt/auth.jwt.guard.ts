import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ROLES_KEY } from "src/shared/decorators/roles.decorator";

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
       
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true;
    
        const { user } = context.switchToHttp().getRequest();
        const userHasRole = requiredRoles
            .some((role) => user.roles.includes(role));

        if (!userHasRole) {
            return false;
        }

        return super.canActivate(context);
    }
}