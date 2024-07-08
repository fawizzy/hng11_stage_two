import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Organisation } from "../entity/Organisation";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const getUserOrganisation = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];

    if (!userId) {
      throw new Error();
    }

    const user = await AppDataSource.getRepository(User).findOne({
      relations: {
        organisation: true,
      },
      where: {
        userId,
      },
    });

    return res.json({
      status: "success",
      message: "<message>",
      data: {
        organisations: user.organisation,
      },
    });
  } catch (error) {
    res.json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const getOrganisationById = async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params;

    const userId = req["userId"];

    if (!userId) {
      throw new Error();
    }

    const user = await AppDataSource.getRepository(User).findOne({
      relations: {
        organisation: true,
      },
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error();
    }

    const organisation = user.organisation.find((org) => org.orgId === orgId);

    if (organisation) {
      res.statusCode = 200;
      return res
        .json({
          status: "success",
          message: "Organisation info gotten successfully",
          data: organisation,
        })
        .status(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const createOrganisation = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const organisationSchema = z.object({
      name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      }),
      description: z.optional(
        z.string({
          invalid_type_error: "description must be a string",
        })
      ),
    });

    try {
      organisationSchema.parse(req.body);
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

    const userId = req["userId"];
    if (!userId) {
      throw new Error();
    }

    const user = await AppDataSource.getRepository(User).findOne({
      relations: {
        organisation: true,
      },
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error();
    }

    const newOrganisation = new Organisation();
    newOrganisation.orgId = uuidv4();
    newOrganisation.name = name;
    newOrganisation.description = description;

    user.organisation.push(newOrganisation);

    await AppDataSource.manager.save(newOrganisation);
    await AppDataSource.manager.save(user);

    if (newOrganisation) {
      res.statusCode = 201;
      return res
        .json({
          status: "success",
          message: "Organisation created successfully",
          data: newOrganisation,
        })
        .status(201);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const addUserOrganisation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { orgId } = req.params;

    const userIdSchema = z.object({
      userId: z.string({
        required_error: "userId is required",
        invalid_type_error: "userId must be a string",
      }),
    });

    try {
      userIdSchema.parse(req.body);
    } catch (error) {
      console.log(error.issues);
      console.log(
        error.issues.map((issue: { path: any[]; message: any }) => {
          return { field: issue.path[0], message: issue.message };
        })
      );
      const validationErrors = error.issues.map((issue) => {
        return { field: issue.path[0], message: issue.message };
      });
      res.statusCode = 422;
      return res.json({ errors: validationErrors });
    }

    const user = await AppDataSource.getRepository(User).findOne({
      relations: { organisation: true },
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error();
    }

    const organisation = await AppDataSource.getRepository(
      Organisation
    ).findOne({
      where: {
        orgId,
      },
    });

    console.log(user.organisation);

    if (!organisation) {
      throw new Error();
    }

    user.organisation.push(organisation);
    await AppDataSource.manager.save(user);
    console.log(user);
    res.statusCode = 201;
    return res
      .json({
        status: "success",
        message: "User added to organisation successfully",
      })
      .status(201);
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    return res.json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};
