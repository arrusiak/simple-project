export interface IJwtPayload {
  id: string;
  email: string;
  iat: number;
  notVerified?: boolean;
}
