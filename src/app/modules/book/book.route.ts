import express from "express";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook
);
router.get("/:id", BookController.getSingleBook);

export const BookRoutes = { router };
