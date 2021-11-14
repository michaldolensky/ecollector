import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../../common/decoratos/roles.decorator';
import { GuardRoles } from '../../common/enums/role.enum';
import { UserRole } from '../role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const requiredRoles = this.reflector.getAllAndOverride<GuardRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isAdmin = req.user && req.user.role === UserRole.ADMIN;

    if (requiredRoles.includes(GuardRoles.Admin)) return isAdmin;

    if (requiredRoles.includes(GuardRoles.Owner)) {
      return (
        req?.user?.sitesIds.includes(req?.body?.variables?.siteId) || isAdmin
      );
    }
    return false;
  }
}
