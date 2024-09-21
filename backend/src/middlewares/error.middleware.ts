import { Prisma } from "@prisma/client"; // Import Prisma errors
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";

/**
 *
 * @param {Error | ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @description This middleware is responsible for catching errors from any request handler wrapped inside the {@link asyncHandler}
 */
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err as ApiError; // Type assertion to ApiError

  // Check if the error is an instance of ApiError class which extends the native Error class
  if (!(err instanceof ApiError)) {
    // Assign an appropriate status code based on the error type
    let statusCode = 500;
    let message = err.message || "Something went wrong";

    // Handle Prisma Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = 400;
      message = "Database request error";
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400;
      message = "Validation error in database request";
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
      statusCode = 500;
      message = "Failed to connect to the database";
    }

    // Reassign the error to an ApiError instance
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Now the `error` variable is guaranteed to be an instance of the ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  // Log the error in development mode
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
