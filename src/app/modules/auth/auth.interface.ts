export type IlogIn = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  email: string;
  role: string;
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
