import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import userRoute from "./routes/user.route";
import organisationRoute from "./routes/organisation.route";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.get("/", async (req: Request, res: Response) => {
  return res.json({ message: "Hello world" });
});
app.use("/", userRoute);
app.use("/", organisationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
