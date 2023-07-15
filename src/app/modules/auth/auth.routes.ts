import express from "express";
import { AuthController } from "./auth.controller";
import { userController } from "../user/user.controller";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validation";

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", AuthController.userlogIn);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.userRefreshToken
);

export const AuthRoute = { router };
