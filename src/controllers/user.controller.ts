import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Organisation } from "../entity/Organisation";
import { User } from "../entity/User";
import sha1 from "sha1";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const secretKey = process.env["secretKey"];

export const registerUsers = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const existingUser = await AppDataSource.getRepository(User).findOne({
      where: {
        email,
        password: sha1(password),
      },
    });

    if (existingUser) {
      throw new Error();
    }
    const newUser = new User();
    newUser.userId = uuidv4();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.phone = phone;
    newUser.email = email;
    newUser.password = sha1(password);

    const newOrganisation = new Organisation();
    newOrganisation.orgId = uuidv4();
    newOrganisation.name = `${firstName}'s organisation`;
    await AppDataSource.manager.save(newOrganisation);

    newUser.organisation = [newOrganisation];
    await AppDataSource.manager.save(newUser);

    if (newUser) {
      const token = jwt.sign(
        { userId: newUser.userId, email: newUser.email },
        secretKey,
        { expiresIn: "1h" }
      );

      return res
        .json({
          status: "success",
          message: "Login successful",
          data: {
            accessToken: token,
            user: {
              userId: newUser.userId,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              phone: newUser.phone,
            },
          },
        })
        .status(200);
    }
  } catch (error) {
    console.log(error);
    res
      .json({
        status: "Bad request",
        message: "Registration unsuccessful",
        statusCode: 400,
      })
      .status(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email,
        password: sha1(password),
      },
    });

    if (user) {
      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        secretKey,
        { expiresIn: "1h" }
      );

      return res
        .json({
          status: "success",
          message: "Login successful",
          data: {
            accessToken: token,
            user: {
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
            },
          },
        })
        .status(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Bad request",
      message: "Authentiction Failed",
      statusCode: 401,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        userId: id,
      },
    });

    if (user) {
      return res
        .json({
          status: "success",
          message: "user info gotten successfullly",
          user: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
        })
        .status(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    return res
      .json({
        status: "failed",
        message: "Error getting user info",
        statusCode: 404,
      })
      .status(200);
  }
};
