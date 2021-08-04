export type Roles = 'SUSCRIPTOR_ROLE' | 'VIEW_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE';

export interface User {
  username: string;
  password: string;
}

export interface UserReponse extends User {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}
