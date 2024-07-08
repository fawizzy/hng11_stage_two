import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";

const secretKey = process.env["secretKey"];
export const authMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Token is missing" });
  }
  var decoded: User = jwt.verify(token, secretKey) as User;
  req.userId = decoded.userId;

  next();
  return;
};
