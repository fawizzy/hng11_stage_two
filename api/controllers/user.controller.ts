import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { organisation } from "../entity/Organisation";
import { user } from "../entity/User";
import sha1 from "sha1";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const secretKey = process.env["secretKey"];

export const registerUsers = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    console.log(req.body);
    const userRepository = AppDataSource.getRepository(user);
    const organisationRepository = AppDataSource.getRepository(organisation);
    const userSchema = z.object({
      firstName: z.string({
        required_error: "firstName is required",
        invalid_type_error: "firstName must be a string",
      }),
      lastName: z.string({
        required_error: "lastName is required",
        invalid_type_error: "lastName must be a string",
      }),
      email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      }),
      password: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      }),
      phone: z.optional(
        z.string({ invalid_type_error: "phone must be a number" })
      ),
    });

    try {
      userSchema.parse(req.body);
    } catch (error) {
      const validationErrors = error.issues.map((issue) => {
        return { field: issue.path[0], message: issue.message };
      });
      console.log(validationErrors);
      res.statusCode = 422;
      return res.json({ errors: validationErrors }).status(422);
    }

    const existingUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    // const existingUser = await AppDataSource.createQueryBuilder()
    //   .select("user")
    //   .from(user, "user")
    //   .where("user.email = :email", { email })
    //   .getOne();
    if (existingUser) {
      throw new Error();
    }
    let newUser = new user();
    newUser.userId = uuidv4();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.phone = phone;
    newUser.email = email;
    newUser.password = sha1(password);

    let newOrganisation = new organisation();
    newOrganisation.orgId = uuidv4();
    newOrganisation.name = `${firstName}'s organisation`;
    await AppDataSource.manager.save(newOrganisation);

    newUser.organisation = [newOrganisation];
    await AppDataSource.manager.save(newUser);
    //await userRepository.save(newUser);

    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );
    res.statusCode = 200;
    return res
      .json({
        status: "success",
        message: "Registration successful",
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
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    return res
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
    const userRepository = AppDataSource.getRepository(user);
    const loginSchema = z.object({
      email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      }),
      password: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      }),
    });

    try {
      loginSchema.parse(req.body);
    } catch (error) {
      console.log(error.issues);
      console.log(
        error.issues.map((issue) => {
          return { field: issue.path[0], message: issue.message };
        })
      );
      const validationErrors = error.issues.map((issue) => {
        return { field: issue.path[0], message: issue.message };
      });
      res.statusCode = 422;
      return res.json({ errors: validationErrors }).status(422);
    }
    const findUser = await userRepository.findOne({
      where: {
        email,
        password: sha1(password),
      },
    });

    if (user) {
      const token = jwt.sign(
        { userId: findUser.userId, email: findUser.email },
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
              userId: findUser.userId,
              firstName: findUser.firstName,
              lastName: findUser.lastName,
              email: findUser.email,
              phone: findUser.phone,
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
      message: "Authentication Failed",
      statusCode: 401,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params || req["userid"];
    const userRepository = AppDataSource.getRepository(user);
    const findUser = await userRepository.findOne({
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
            userId: findUser.userId,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            phone: findUser.phone,
          },
        })
        .status(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    return res
      .json({
        status: "failed",
        message: "Error getting user info",
        statusCode: 404,
      })
      .status(404);
  }
};
