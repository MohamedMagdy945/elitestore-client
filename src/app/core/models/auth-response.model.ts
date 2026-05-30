export interface AuthResponse {
  userId: number;
  email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}