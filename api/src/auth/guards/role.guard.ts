import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    let allowAccess = false;
    //  Check if user is owner of site
    if (req?.user?.sitesIds.includes(req?.body?.variables?.siteId))
      allowAccess = true;
    //  Check if user is admin
    if (req.user && req.user.role === UserRole.ADMIN) allowAccess = true;

    return Boolean(allowAccess);
  }
}
