import express from "express";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook
);
router.get("/:id", BookController.getSingleBook);
router.get("/", BookController.getAllBooks);

export const BookRoutes = { router };
