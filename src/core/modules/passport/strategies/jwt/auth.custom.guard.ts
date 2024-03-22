import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthCustomGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
       
        console.log("Custom middleware...");
        
        return true;
        return super.canActivate(context);
    }
}