import httpStatus from "http-status";
import { IBook } from "./book.interface";
import ApiError from "../../../error/ApiError";
import { Book } from "./bookmodel";
import { User } from "../user/user.model";

const createBook = async (book: IBook): Promise<IBook | null> => {
  const userDetails = await User.findById(book.user);

  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newBook = await Book.create(book);

  return newBook;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate("user");
  return result;
};

export const BookService = {
  createBook,
  getSingleBook,
};
