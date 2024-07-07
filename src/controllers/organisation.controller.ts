import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Organisation } from "../entity/Organisation";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

const secretKey = process.env["secretKey"];

export const getUserOrganisation = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "Token is missing" });
    }

    var decoded: User = jwt.verify(token, secretKey) as User;
    const userId = decoded.userId;

    const user = await AppDataSource.getRepository(User).findOne({
      relations: {
        organisation: true,
      },
      where: {
        userId,
      },
    });

    console.log(user.organisation);

    return res.json({
      status: "success",
      message: "<message>",
      data: {
        organisations: user.organisation,
      },
    });
  } catch (error) {
    res.json({ error: "not authneticated" });
  }
};
