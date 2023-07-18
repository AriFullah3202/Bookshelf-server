import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interfaces";
import { User } from "./user.model";
import catchAsync from "../../../shared/catchAsync";

// Create a new User
const createUser = catchAsync(async (req: Request, res: Response) => {
  // Retrieve user data from the request body
  const userData = req.body;
  console.log("thsi si suser data ", userData);
  // Create a new user using the UserModel
  const createdUser = await UserService.createUser(userData);
  // Send a success response

  // Exclude password from the admin object
  const adminDataWithoutPassword = {
    _id: createdUser._id,
    role: createdUser.role,
    name: createdUser.name,
    email: createdUser.email,
  };
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully",
    data: adminDataWithoutPassword,
  });
});
// Get All Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user, "from user controller");
  // Find all users using the UserModel
  const users = await UserService.getAllUsers();

  // Send a success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: users,
  });
});
// Get a Single User
const getUser = catchAsync(async (req: Request, res: Response) => {
  // Retrieve the user ID from the request parameters
  const userId: string = req.params.id;
  console.log("this si single user ", userId);

  // Find the user by ID using the UserModel
  const user = await UserService.getUserById(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: user,
  });
});
// Update a Single User
const updateUser = async (req: Request, res: Response) => {
  // Retrieve the user ID from the request parameters
  const userId: string = req.params.id;

  // Retrieve updated user data from the request body
  const updatedUserData: IUser = req.body;

  // Find the user by ID and update using the UserModel
  const result = await UserService.updateUserById(userId, updatedUserData);

  // Send a success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User update successfully",
    data: result,
  });
};
// Delete a User
const deleteUser = async (req: Request, res: Response) => {
  // Retrieve the user ID from the request parameters
  const userId: string = req.params.id;
  // Find the user by ID and delete using the UserModel
  const deletedUser = await UserService.deleteUserById(userId);
  // Send a success response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: deletedUser,
  });
};

const myProfile = async (req: Request, res: Response) => {
  console.log("this is my profile");
  // Assuming user data is extracted from the access token
  const { _id, role } = req.user as { _id: string; role: string };
  const profile = await UserService.getProfile(_id, role);

  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User's information retrieved successfully",
    data: profile,
  });
};
const updateProfile = async (req: Request, res: Response) => {
  // Assuming user data is extracted from the access token
  const { _id, role } = req.user as { _id: string; role: string };
  const profile = await UserService.updateProfile(_id, role, req.body);

  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User's information update successfully",
    data: profile,
  });
};
export const userController = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  myProfile,
  updateProfile,
};
