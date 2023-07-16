import httpStatus from "http-status";
import { IBook, IBookFilter } from "./book.interface";
import ApiError from "../../../error/ApiError";
import { Book } from "./bookmodel";
import { User } from "../user/user.model";
import { bookSearchableFields } from "./book.constraint";
import { SortOrder } from "mongoose";
import { IPaginationOption } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/GenericErrors";
import { paginationHelper } from "../../../helper/paginationHellper";

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
const getAllBooks = async (
  filters: IBookFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log("this si search term ", searchTerm);
  console.log("this is filter data", filtersData);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "publicationDate") {
          let startDate, endDate;

          if (value instanceof Date) {
            // If the value is already a Date object
            startDate = new Date(value.getFullYear(), 0, 1); // January 1st of the specified year
            endDate = new Date(value.getFullYear() + 1, 0, 1); // January 1st of the next year
          } else {
            // If the value is a string
            const year = parseInt(value);
            startDate = new Date(year, 0, 1); // January 1st of the specified year
            endDate = new Date(year + 1, 0, 1); // January 1st of the next year
          }

          return {
            publicationDate: {
              $gte: startDate,
              $lt: endDate,
            },
          };
        } else {
          return {
            [field]: value,
          };
        }
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditons = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereConditons)
    .populate("user")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditons);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getSingleBook,
  getAllBooks,
};
