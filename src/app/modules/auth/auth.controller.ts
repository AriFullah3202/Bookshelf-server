import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

// const logIn = catchAsync(async (req: Request, res: Response) => {
//   const { ...logInData } = req.body;
//   console.log(logInData, "admin login data");

//   const result = await AuthService.adminLogin(logInData);
//   const { refreshToken, ...others } = result;

//   // set refresh token into cookie

//   const cookiesOptions = {
//     secure: config.env === "production",
//     httpOnly: true,
//   };
//   res.cookie("refreshToken", refreshToken, cookiesOptions);

//   sendResponse<ILoginUserResponse>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Admin logged in successfully",
//     data: others,
//   });
// });
const userlogIn = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;

  const result = await AuthService.userLogin(logInData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookiesOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookiesOptions);

  sendResponse<ILoginUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: others,
  });
});

// const AdminRefreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   const result = await AuthService.AdminRefreshToken(refreshToken);

//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: "User logged in successfully !",
//     data: result,
//   });
// });
const userRefreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.UserRefreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});

export const AuthController = {
  // AdminRefreshToken,
  // logIn,
  userlogIn,
  userRefreshToken,
};
