import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import {
  bookFilterandSearchAbleFields,
  paginationFields,
} from "./book.constraint";
import { IBook } from "./book.interface";
import ApiError from "../../../error/ApiError";
import { Book } from "./bookmodel";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Created successfully",
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterandSearchAbleFields);
  console.log("first", req.query);

  const paginationOption = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOption);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not exist");
  }

  const validUser = await Book.findById(id).populate("user");

  if (validUser?.user?._id?.toString() !== req?.user?._id) {
    throw new ApiError(httpStatus.NOT_FOUND, "This is not your Book");
  }

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not exist");
  }

  const validUser = await Book.findById(id).populate("user");

  if (validUser?.user?._id?.toString() !== req?.user?._id) {
    throw new ApiError(httpStatus.NOT_FOUND, "This is not your book");
  }

  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Deleted Successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getSingleBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
