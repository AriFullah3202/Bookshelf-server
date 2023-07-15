// User Service

import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IUser } from "./user.interfaces";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../../config";

// Create a new user
const createUser = async (userData: IUser): Promise<IUser> => {
  const phone = await User.findOne(
    { phoneNumber: userData?.email },
    { phoneNumber: 1 }
  );
  if (phone?.email) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "duplicate key phoneNumber"
    );
  }
  const createdUser = await User.create(userData);
  return createdUser;
};

// Get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

// Get a single user by ID
const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId);
  return user;
};

// Update a user by ID
const updateUserById = async (
  userId: string,
  updatedUserData: IUser
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });
  return updatedUser;
};

// Delete a user by ID
const deleteUserById = async (userId: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};
// Get a single user by ID
const getProfile = async (
  userId: string,
  role: string
): Promise<Partial<IUser> | null> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  // Return the profile data in the desired format
  return {
    name: {
      firstName: user.name.firstName,
      lastName: user.name.lastName,
    },
    email: user.email,
  };
};
const updateProfile = async (
  userId: string,
  role: string,
  updateData: IUser
): Promise<Partial<IUser> | null> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  updateData.password = await bcrypt.hash(
    updateData.password,
    Number(config.bycrypt_salt_round)
  );
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  // Return the updated profile data in the desired format
  return {
    name: {
      firstName: user.name.firstName,
      lastName: user.name.lastName,
    },
    email: user.email,
  };
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getProfile,
  updateProfile,
};
