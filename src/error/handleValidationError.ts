import mongoose from "mongoose";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/GenericErrors";

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};

export default handleValidationError;
