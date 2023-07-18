import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "./user";

const router = express.Router();
router.get("/my-profile", auth(), userController.myProfile);
// router.patch(
//   "/my-profile",
//   auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
//   userController.updateProfile
// );
// router.get("/", auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
// router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.getUser);
// router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);
// router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.updateUser);

export const userRoute = { router };
