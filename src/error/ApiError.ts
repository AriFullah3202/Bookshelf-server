class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = "") {
    console.log("hello from error api");
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
