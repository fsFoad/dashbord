export type Role = 'admin' | 'user' | string;

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export interface AuthResponse {
  token: string;
  user: User;
}
