import { SetMetadata } from '@nestjs/common';
import { GuardRoles } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: GuardRoles[]) => SetMetadata(ROLES_KEY, roles);
