export type Role = 'admin' | 'user' | string;

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: Role[];
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/** When a user has 2FA enabled, login returns this challenge instead. */
export interface TwoFactorChallenge {
  twoFactorRequired: true;
  /** short-lived token tying the OTP step to this login attempt */
  challengeId: string;
  /** masked destination shown to the user, e.g. ***34 */
  hint: string;
}

export type LoginResult = AuthResponse | TwoFactorChallenge;

export function isTwoFactor(r: LoginResult): r is TwoFactorChallenge {
  return (r as TwoFactorChallenge).twoFactorRequired === true;
}
