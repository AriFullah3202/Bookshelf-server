export type IlogIn = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
