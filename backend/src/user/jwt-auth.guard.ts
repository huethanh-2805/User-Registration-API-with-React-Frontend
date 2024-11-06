import { Inject, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
}