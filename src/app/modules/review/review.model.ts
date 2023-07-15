import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

export const ReviewSchema = new Schema<IReview>({
  review: {
    type: [String],
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

export const Review = model<IReview>("Review", ReviewSchema);
