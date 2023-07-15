import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const reviewData = req.body;

  const result = await ReviewService.createReview(bookId, reviewData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Created successfully",
    data: result,
  });
});
// Get All Users
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const reviews = await ReviewService.getReviewsByBookId(bookId);
  // Send a success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "reviews retrieved successfully",
    data: reviews,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
};
