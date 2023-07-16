import express from "express";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook
);
router.get("/:id", BookController.getSingleBook);
router.get("/", BookController.getAllBooks);
router.patch("/:id", auth(), BookController.updateBook);

router.delete("/:id", auth(), BookController.deleteBook);

export const BookRoutes = { router };
