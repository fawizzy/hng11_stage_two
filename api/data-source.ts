import "reflect-metadata";
import { DataSource } from "typeorm";
import { user } from "./entity/User";
import { organisation } from "./entity/Organisation";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env["host"],
  port: 5432,
  username: process.env["username"],
  password: process.env["password"],
  database: process.env["database"],
  synchronize: true,
  logging: false,
  entities: [user, organisation],
  migrations: [],
  subscribers: [],
  ssl: true,
});
