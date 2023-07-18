import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
// import { Admin } from "../admin/admin.model";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IlogIn,
} from "./auth.interface";
import { jwtHelpers } from "../../../helper/jwtHelper";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { User } from "../user/user.model";

// const adminLogin = async (adminData: IlogIn): Promise<ILoginUserResponse> => {
//   const { phoneNumber, password } = adminData;

//   const data = { phoneNumber: adminData.phoneNumber };
//   // access to our static methods
//   const isUserExist = await Admin.isUserExist(data);
//   // check the user exits
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not exit");
//   }
//   if (
//     isUserExist.password &&
//     !(await Admin.isPasswordMatched(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
//   }
//   //create access token & refresh token

//   const { _id, role, needsPasswordChange } = isUserExist;
//   const accessToken = jwtHelpers.createToken(
//     { _id, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   const refreshToken = jwtHelpers.createToken(
//     { _id, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   );
//   // return the accestoken , refreshToken ,
//   // needspasswordChange into the controller
//   return {
//     accessToken,
//     refreshToken,
//     needsPasswordChange,
//   };
// };

const userLogin = async (userData: IlogIn): Promise<ILoginUserResponse> => {
  const { password } = userData;
  const data = { email: userData.email };
  // access to our static methods
  const isUserExist = await User.isUserExist(data);
  // check the user exits
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exit");
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }
  //create access token & refresh token

  const { _id, email, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  // return the accestoken , refreshToken ,
  // needspasswordChange into the controller
  return {
    email,
    role,
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// const AdminRefreshToken = async (
//   token: string
// ): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//     console.log(verifiedToken, "this is the verified token");
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
//   }

//   const { _id } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token
//   const isUserExist = await Admin.isUserExist(_id);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist._id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };
const UserRefreshToken = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token
  const isUserExist = await User.isUserExist({ _id: verifiedToken._id });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  // adminLogin,
  userLogin,
  UserRefreshToken,
};
