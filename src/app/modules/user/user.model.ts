import mongoose, { Schema, model } from "mongoose";
import { Role } from "./user.constant";
import { IUser, UserModel, loginUser } from "./user.interfaces";
import config from "../../../config";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
//schema
const UserSchema = new Schema<IUser, Record<string, never>>(
  {
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  identified: loginUser
): Promise<Pick<
  IUser,
  "_id" | "email" | "password" | "role" | "needsPasswordChange"
> | null> {
  return await User.findOne(
    {
      $or: [identified],
    },
    { _id: 1, email: 1, role: 1, password: 1, needsPasswordChange: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    // Hash the password only if it has been modified
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_round)
    );
  }
  next();
});

// model
export const User = model<IUser, UserModel>("User", UserSchema);
