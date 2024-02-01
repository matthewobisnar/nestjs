import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UtilityService } from "src/authentication/services/utility/utility.service";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class IsAuthorizedGuard implements CanActivate {

   constructor(private reflector: Reflector) {}

   async canActivate(context: ExecutionContext):  Promise<boolean> {

        const requiredRoles = await this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
    
        const { authenticated_user_context } = context.switchToHttp().getRequest();

        return requiredRoles.some(
            (role) => authenticated_user_context?.roles
            .includes(role)
        );
    }

}