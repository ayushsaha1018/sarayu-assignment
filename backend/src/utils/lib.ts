import { User } from "@prisma/client";

export interface AuthRequest extends Request {
  user?: User; // or any other type
}
