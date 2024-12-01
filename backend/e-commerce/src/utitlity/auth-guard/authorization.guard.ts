import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


export const AuthorizeGuard = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      
      // Check if currentUser and roles are defined
      if (request?.currentUser?.roles && Array.isArray(request.currentUser.roles)) {
        const result = request.currentUser.roles
          .map((role: string) => allowedRoles.includes(role))
          .find((val: boolean) => val === true);

        if (result) {
          return true;
        }
      }

      // If no role matches or roles are undefined, throw UnauthorizedException
      throw new UnauthorizedException('you are not authorized.');
    }
  }

  return mixin(RolesGuardMixin);
};
