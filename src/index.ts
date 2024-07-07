import { AppDataSource } from "./data-source";
import express from "express";
import userRoute from "./routes/user.route";
import organisationRoute from "./routes/organisation.route";
const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.use("/", userRoute);
app.use(organisationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
