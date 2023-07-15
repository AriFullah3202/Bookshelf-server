import { Model } from "mongoose";

export type IRole = "seller" | "buyer";

export interface IUser {
  _id?: string;
  email: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  name: {
    firstName: string;
    lastName: string;
  };
}
export type loginUser = {
  email?: string;
  _id?: string;
};
export type UserModel = {
  isUserExist(
    idtified: loginUser
  ): Promise<Pick<IUser, "_id" | "password" | "role" | "needsPasswordChange">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
