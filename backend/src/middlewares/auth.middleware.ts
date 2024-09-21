import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { db } from "../utils/db";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as DecodedToken;

      const user = await db.user.findUnique({
        where: {
          id: decodedToken?.id,
        },
      });

      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }

      (req as any).user = user;

      next();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid access token";
      throw new ApiError(401, message);
    }
  }
);
