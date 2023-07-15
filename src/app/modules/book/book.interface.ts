import { IUser } from "./../user/user.interfaces";
import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
