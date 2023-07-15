import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { Review } from "./review.model";
import { IReview } from "./review.interface";
import { Book } from "../book/bookmodel";

const createReview = async (
  bookId: string,
  reviewData: IReview
): Promise<void> => {
  console.log(bookId, "===================");
  const bookDetails = await Book.findById({ _id: bookId });

  if (!bookDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, "book does not exist");
  }
  const bookReview = await Review.findOne({ book: reviewData.book });

  if (bookReview) {
    console.log(bookReview._id);
    const review = await Review.updateOne(
      { _id: bookReview._id },
      { $push: { review: reviewData.review } }
    );
  } else {
    // create the
    console.log("this is else");
    await Review.create(reviewData);
  }
};

const getReviewsByBookId = async (bookId: string): Promise<IReview[]> => {
  const users = await Review.find({ bookId });
  return users;
};

export const ReviewService = {
  createReview,
  getReviewsByBookId,
};
