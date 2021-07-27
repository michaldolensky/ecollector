import { UserRole } from './role.enum';

export interface TokenPayload {
  userId: number;
  role: UserRole;
  ownedSites: number[];
}
