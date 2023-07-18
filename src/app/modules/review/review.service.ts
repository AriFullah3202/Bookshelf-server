import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { Review } from "./review.model";
import { IReview } from "./review.interface";
import { Book } from "../book/bookmodel";

const createReview = async (reviewData: any): Promise<void> => {
  console.log("===================", reviewData.id);
  // const bookDetails = await Book.findById({ _id });

  // if (!bookDetails) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "book does not exist");
  // }
  const bookReview = await Review.findOne({ book: reviewData?.book });
  console.log(bookReview, "book revieww");

  if (bookReview) {
    console.log(bookReview._id, "thsi si if else");
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

const getReviewsByBookId = async (bookId: string): Promise<IReview | null> => {
  const users = await Review.findOne({ book: bookId });

  return users;
};

export const ReviewService = {
  createReview,
  getReviewsByBookId,
};
