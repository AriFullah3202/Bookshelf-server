import { IBook } from "../book/book.interface";
import { Model, Types } from "mongoose";

export type IReview = {
  review: string[];
  book: Types.ObjectId | IBook;
};
