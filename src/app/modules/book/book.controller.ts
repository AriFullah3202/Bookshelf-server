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

export const BookController = {
  createBook,
  getSingleBook,
  getAllBooks,
};
