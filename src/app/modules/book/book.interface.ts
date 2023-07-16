import { IUser } from "./../user/user.interfaces";
import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  user: Types.ObjectId | IUser;
};
export type IBookFilter = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: Date;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
