import { Router } from "express";
import {
  getUserById,
  login,
  registerUsers,
} from "../controllers/user.controller";
const userRoute = Router();

userRoute.post("/auth/register", registerUsers);
userRoute.post("/auth/login", login);
userRoute.get("/api/users/:id", getUserById);

export default userRoute;
