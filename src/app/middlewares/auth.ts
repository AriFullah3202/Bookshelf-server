import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../error/ApiError";
import { jwtHelpers } from "../../helper/jwtHelper";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(requiredRoles, "this is the role form route");
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      // req.user = verifiedUser; // role , userid
      console.log(verifiedUser, "this is from user");
      req.user = verifiedUser;

      // role diye guard korar jonno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        console.log(
          "leangth is ",
          requiredRoles.length,
          "this role si you have taken",
          requiredRoles,
          verifiedUser.role,
          "this role is from token"
        );
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
